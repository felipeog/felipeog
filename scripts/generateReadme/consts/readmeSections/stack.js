const stackList = [
  "CSS3",
  "Git",
  "GitHub",
  "HTML5",
  "JavaScript",
  "Json",
  "Markdown",
  "Node.js",
  "Visual Studio Code",
];
const stackContent = stackList
  .map((tech) => {
    const badgeName = encodeURI(tech).replaceAll("-", "--");
    const logoName = tech.replaceAll(" ", "-").toLowerCase();
    const googleLink = `https://www.google.com/search?q=${encodeURI(tech)}`;

    return `[![](https://img.shields.io/badge/-${badgeName}-333?style=flat&logo=${logoName}&logoColor=fff)](${googleLink})`;
  })
  .join("\n");

export const stack = `## 🛠 Tech stack\n` + `\n` + `${stackContent}\n`;
