import { readmeSections } from "../consts/index.js";

const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

function getTechContent(dependenciesNames) {
  const content = alphabet.reduce((acc, cur) => {
    const dependencies = [...dependenciesNames]
      .filter((dependencyName) => {
        const formattedDependencyName = dependencyName.replace(/\W/g, "");

        return formattedDependencyName.charAt(0).toLowerCase() === cur;
      })
      .sort((a, b) => {
        return a.localeCompare(b);
      });

    if (!dependencies.length) {
      return acc;
    }

    const title = `#### ${cur}\n`;
    const text = dependencies
      .map((dependencyName) => {
        const badgeName = encodeURI(dependencyName).replaceAll("-", "--");
        const npmLink = `https://www.npmjs.com/package/${dependencyName}`;

        return `[![](https://img.shields.io/badge/-${badgeName}-333)](${npmLink})`;
      })
      .join("\n");

    return `${acc}\n${title}\n${text}\n`;
  }, "");

  return content;
}

export function getReadmeContent(dependenciesNames) {
  console.log("Getting readme content...");

  const techContent = getTechContent(dependenciesNames);
  const otherTechSection = `### Other tech I like to use\n${techContent}`;
  const orderedSections = [
    readmeSections.header,
    readmeSections.about,
    readmeSections.stack,
    otherTechSection,
  ];
  const content = orderedSections.join("\n");

  console.log("Done");

  return content;
}
