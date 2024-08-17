import type {Job} from './type';

export async function fetchJobs(): Promise<Job[]> {
    // Mock data or database call
    return [{ id: 1, title: 'Job 1' }, { id: 2, title: 'Job 2' }];
}