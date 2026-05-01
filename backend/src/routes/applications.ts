import { Router } from 'express';
import multer from 'multer';
import { prisma } from '../db.js';
import { authenticateToken, AuthRequest } from '../middleware/auth.js';
import { uploadResumeToS3 } from '../services/s3.js';
import { calculateMatchScore } from '../services/openai.js';

const router = Router();

// Configure Multer for in-memory uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
});

router.post('/', authenticateToken, upload.single('resume'), async (req: AuthRequest, res: any) => {
  try {
    if (req.user?.role !== 'CANDIDATE') {
      return res.status(403).json({ error: 'Only candidates can apply to jobs' });
    }

    const { jobId } = req.body;
    const file = req.file;

    if (!jobId || !file) {
      return res.status(400).json({ error: 'Job ID and resume file are required' });
    }

    // 1. Fetch Job Description
    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // 2. Upload Resume to S3
    const resumeUrl = await uploadResumeToS3(file.buffer, file.mimetype, file.originalname);

    // 3. Extract Text from Resume (For MVP, we'll assume PDF/text parsing logic is here or we pass raw text)
    // In a real scenario, you'd use a PDF parser (e.g., pdf-parse). For this assignment, we mock the text.
    const mockResumeText = `Candidate has experience in Node.js, React, and AWS. Uploaded file: ${file.originalname}`;

    // 4. Calculate Match Score using Azure OpenAI
    const matchScore = await calculateMatchScore(mockResumeText, job.description);

    // 5. Save Application to DB
    const application = await prisma.application.create({
      data: {
        jobId,
        candidateId: req.user.id,
        resumeUrl,
        aiMatchScore: matchScore,
        status: 'PENDING',
      },
    });

    // 6. Notify the Employer via WebSocket
    const io = req.app.get('io');
    if (io) {
      io.emit(`notification:${job.employerId}`, {
        type: 'NEW_APPLICATION',
        message: `A new candidate applied to ${job.title} with a match score of ${matchScore}%`,
        applicationId: application.id,
      });
    }

    res.status(201).json(application);
  } catch (error) {
    console.error('Application Error:', error);
    res.status(500).json({ error: 'Internal server error processing application' });
  }
});

// Fetch applications for a specific job (Employer only)
router.get('/job/:jobId', authenticateToken, async (req: AuthRequest, res: any) => {
  try {
    const { jobId } = req.params;

    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job || job.employerId !== req.user?.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const applications = await prisma.application.findMany({
      where: { jobId },
      include: {
        candidate: { select: { name: true, email: true } },
      },
      orderBy: { aiMatchScore: 'desc' }, // Sort by best AI match
    });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Fetch applications for the logged-in candidate
router.get('/user', authenticateToken, async (req: AuthRequest, res: any) => {
  try {
    const applications = await prisma.application.findMany({
      where: { candidateId: req.user?.id },
      include: {
        job: { select: { title: true, employer: { select: { name: true } } } },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
