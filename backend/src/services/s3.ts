import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'mock_access_key',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'mock_secret_key',
  },
});

export const uploadResumeToS3 = async (fileBuffer: Buffer, mimetype: string, originalName: string): Promise<string> => {
  const bucketName = process.env.AWS_S3_BUCKET_NAME || 'job-matching-resumes';
  const fileKey = `${uuidv4()}-${originalName}`;

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileKey,
    Body: fileBuffer,
    ContentType: mimetype,
  });

  await s3Client.send(command);

  // Return the public URL
  return `https://${bucketName}.s3.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com/${fileKey}`;
};
