import { execSync } from "child_process";

function quietExecSync(command) {
  execSync(command, { stdio: "pipe" });
}

export function commitReadme(user) {
  console.log("Commiting...");

  try {
    quietExecSync(`git config user.email "${user.email}"`);
    quietExecSync(`git config user.name "${user.name}"`);
    quietExecSync("git add README.md");
    quietExecSync(
      'git diff-index --quiet HEAD || git commit -m "Update README.md"'
    );
    quietExecSync("git push -u origin HEAD");

    console.log("Done");
  } catch (error) {
    console.log(`Error commiting: ${error}`);
  }
}
