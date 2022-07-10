import "dotenv/config";

// import dotenv from "dotenv";

// if (process.env.NODE_ENV === "development") {
//   dotenv.config();
// }

import { generateReadme } from "./scripts/generateReadme/index.js";

generateReadme();
