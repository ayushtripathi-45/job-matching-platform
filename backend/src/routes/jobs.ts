import { Router } from 'express';
import { prisma } from '../db.js';
import { authenticateToken, AuthRequest } from '../middleware/auth.js';
import { redis } from '../redis.js';

const router = Router();

// Create a job (Employer only)
router.post('/', authenticateToken, async (req: any, res: any) => {
  try {
    if (req.user?.role !== 'EMPLOYER') {
      return res.status(403).json({ error: 'Only employers can post jobs' });
    }

    const { title, description } = req.body;
    const job = await prisma.job.create({
      data: {
        title,
        description,
        employerId: req.user.id,
      },
    });

    // Invalidate jobs cache when a new job is created
    await redis.del('jobs:all');

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Fetch all jobs (with Redis caching)
router.get('/', async (req, res) => {
  try {
    const cachedJobs = await redis.get('jobs:all');
    if (cachedJobs) {
      return res.json(JSON.parse(cachedJobs));
    }

    const jobs = await prisma.job.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        employer: {
          select: { name: true, email: true },
        },
      },
    });

    await redis.setex('jobs:all', 3600, JSON.stringify(jobs)); // Cache for 1 hour

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
