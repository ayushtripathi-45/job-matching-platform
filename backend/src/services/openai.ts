import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const endpoint = process.env.AZURE_OPENAI_ENDPOINT || 'https://mock.openai.azure.com/';
const azureApiKey = process.env.AZURE_OPENAI_API_KEY || 'mock_key';
const apiVersion = '2023-05-15';

const client = new OpenAI({
  apiKey: azureApiKey,
  baseURL: `${endpoint}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT_ID || 'gpt-4'}`,
  defaultQuery: { 'api-version': apiVersion },
  defaultHeaders: { 'api-key': azureApiKey },
});

export const calculateMatchScore = async (resumeText: string, jobDescription: string): Promise<number> => {
  try {
    const prompt = `
    You are an expert technical recruiter. Analyze the following resume against the job description.
    Provide a match score between 0 and 100 representing how well the candidate fits the role.
    Only return the number, no extra text.
    
    Resume:
    ${resumeText}
    
    Job Description:
    ${jobDescription}
    `;

    const response = await client.chat.completions.create({
      model: process.env.AZURE_OPENAI_DEPLOYMENT_ID || 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 10,
      temperature: 0,
    });

    const scoreString = response.choices[0].message.content?.trim() || '0';
    const score = parseInt(scoreString, 10);
    
    return isNaN(score) ? 0 : score;
  } catch (error) {
    console.error('Azure OpenAI Match Error:', error);
    return 0;
  }
};
