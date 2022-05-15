const sections = require("../consts/readmeSections");

function getReadmeContent(dependenciesNames) {
  const techList = dependenciesNames
    .map((dependencyName) => {
      const badgeName = encodeURI(dependencyName).replaceAll("-", "--");

      return `![](https://img.shields.io/badge/-${badgeName}-333)`;
    })
    .join("\n");
  const otherTech =
    `\n` + `### Other tech I like to use\n` + `\n` + techList + `\n`;

  return `${sections.header}${sections.about}${sections.stack}${otherTech}${sections.connect}`;
}

module.exports = getReadmeContent;
