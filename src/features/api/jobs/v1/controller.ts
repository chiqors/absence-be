import type { Request, Response } from 'express';
import { fetchJobs } from './service';
import type { Job } from './type';

export async function getJobs(req: Request, res: Response): Promise<void> {
    const jobs: Job[] = await fetchJobs();
    res.json(jobs);
}