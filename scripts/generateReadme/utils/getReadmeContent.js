import { readmeSections } from "../consts/index.js";

export function getReadmeContent(dependenciesNames) {
  console.log("Getting readme content...");

  const techContent = dependenciesNames
    .map((dependencyName) => {
      const badgeName = encodeURI(dependencyName).replaceAll("-", "--");
      const npmLink = `https://www.npmjs.com/package/${dependencyName}`;

      return `[![](https://img.shields.io/badge/-${badgeName}-333)](${npmLink})`;
    })
    .join("\n");
  const otherTechSection =
    `### Other tech I like to use\n` + `\n` + `${techContent}\n`;
  const orderedSections = [
    readmeSections.header,
    readmeSections.about,
    readmeSections.stack,
    otherTechSection,
    readmeSections.connect,
  ];
  const content = orderedSections.join("\n");

  console.log("Done");

  return content;
}
