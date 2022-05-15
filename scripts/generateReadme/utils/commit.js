const { execSync } = require("child_process");

function commit() {
  execSync(
    'git config --global user.email "17603069+felipeog@users.noreply.github.com"'
  );
  execSync('git config --global user.name "felipeog"');
  execSync("git add README.md");
  execSync('git commit -m "update readme"');
  execSync("git push -u origin HEAD");
}

module.exports = commit;
