const { execSync } = require("child_process");

const email = "17603069+felipeog@users.noreply.github.com";
const name = "felipeog";

function commit() {
  console.log("Commiting");

  execSync(`git config user.email "${email}"`);
  execSync(`git config user.name "${name}"`);

  try {
    execSync("git add README.md");
    execSync('git commit -m "Update README.md"');
    execSync("git push -u origin HEAD");
  } catch (error) {
    console.log(error);
  }
}

module.exports = commit;
