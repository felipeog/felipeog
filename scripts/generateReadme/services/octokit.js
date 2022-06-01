const { Octokit } = require("octokit");

if (!process.env.GITHUB_TOKEN) {
  throw new Error("No GITHUB_TOKEN env var set.");
}

module.exports = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});
