const { execSync } = require("child_process");

function commit() {
  execSync(
    'git config user.email "17603069+felipeog@users.noreply.github.com"'
  );
  execSync('git config user.name "felipeog"');

  try {
    execSync("git add README.md");
    execSync('git commit -m "Update readme"');
    execSync("git push -u origin HEAD");
  } catch (error) {
    console.log(`commit: ${error}`);
  }
}

module.exports = commit;
