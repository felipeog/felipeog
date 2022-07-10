import { Octokit } from "octokit";

export const octokit = new Octokit({
  auth: process.env.PERSONAL_ACCESS_TOKEN,
});
