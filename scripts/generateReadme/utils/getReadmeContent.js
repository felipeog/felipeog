const sections = require("../consts/readmeSections");

function getReadmeContent(dependenciesNames) {
  const otherTech = dependenciesNames
    .map((dependencyName) => {
      const badgeName = encodeURI(dependencyName).replaceAll("-", "--");

      return `![](https://img.shields.io/badge/-${badgeName}-333)`;
    })
    .join("\n");

  return `${sections.header}${sections.about}${sections.stack}${otherTech}${sections.connect}`;
}

module.exports = getReadmeContent;
