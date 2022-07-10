import "dotenv/config";

if (!process.env.PERSONAL_ACCESS_TOKEN) {
  throw new Error("Missing PERSONAL_ACCESS_TOKEN environment variable.");
}

import { generateReadme } from "./scripts/generateReadme/index.js";

generateReadme();
