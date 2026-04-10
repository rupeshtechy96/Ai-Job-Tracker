import type { JobApplication, User } from "../types";
import { normalizeEmail } from "../utils/helpers";

const users: User[] = [];
const jobs: JobApplication[] = [];

export const memoryDb = {
  users,
  jobs,

  findUserByEmail(email: string): User | undefined {
    return users.find((user) => user.email === normalizeEmail(email));
  },

  findUserById(id: string): User | undefined {
    return users.find((user) => user.id === id);
  },

  createUser(user: User): User {
    users.push(user);
    return user;
  },

  getJobsByUserId(userId: string): JobApplication[] {
    return jobs
      .filter((job) => job.userId === userId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },

  createJob(job: JobApplication): JobApplication {
    jobs.push(job);
    return job;
  },

  findJobById(jobId: string): JobApplication | undefined {
    return jobs.find((job) => job.id === jobId);
  },

  updateJob(jobId: string, updatedFields: Partial<JobApplication>): JobApplication | null {
    const index = jobs.findIndex((job) => job.id === jobId);

    if (index === -1) return null;

    jobs[index] = {
      ...jobs[index],
      ...updatedFields,
      id: jobs[index].id,
      userId: jobs[index].userId,
    };

    return jobs[index];
  },

  deleteJob(jobId: string): boolean {
    const index = jobs.findIndex((job) => job.id === jobId);

    if (index === -1) return false;

    jobs.splice(index, 1);
    return true;
  },
};