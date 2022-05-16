const startsWithList = [
  "@babel/",
  "@emotion/",
  "@parcel/",
  "@prettier/",
  "@testing-library/",
  "@types/",
  "@typescript-eslint/",
  "@unform/",
  "axios-",
  "babel-",
  "css-",
  "eslint-",
  "gulp-",
  "jest-",
  "mobx-",
  "next-",
  "node-",
  "parcel-",
  "postcss-",
  "react-",
  "sass-",
  "semantic-ui-",
  "ts-",
  "webpack-",
];
const includesList = ["webpack-plugin"];
const allowedList = [
  "@babel/core",
  "@emotion/styled",
  "@testing-library/dom",
  "@unform/core",
  "semantic-ui-react",
];

module.exports = {
  startsWithList,
  includesList,
  allowedList,
};
