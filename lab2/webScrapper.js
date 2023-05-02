'use strict';

const https = require("https");
const fs = require("fs");
const path = require("path");
const {parseNewsPage, parseSingleNewsPage} = require('./pageParser.js');

const HOSTNAME = "https://kpi.ua";

const makeGetRequest = (url, callback) => {
  https.get(url, (response) => {
    let result = '';

    response.on('data', (chunk) => {
      result += chunk;
    });

    response.on('end', () => {
      callback(result);
    });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
};

const retrieveAndSaveInformation = () => {
  makeGetRequest(`${HOSTNAME}/news`, (data) => {
    const news = parseNewsPage(data);

    for (const element of news) {
      const {title, link} = element;

      makeGetRequest(`${HOSTNAME}${link}`, (newsData) => {
        const newsContent = parseSingleNewsPage(newsData);

        const filename = link.split('/').pop() + '.txt';
        const filePath = path.resolve(__dirname, 'news', filename);

        const fileContent = `Title: ${title}\n\n${newsContent}`;

        fs.writeFile(filePath, fileContent, {encoding: 'utf8'}, (error) => {
          if (error) {
            console.error(`An error happened to news "${title}", ${link}`);
            console.error(error);
          }
        });
      });
    }
  });
};

module.exports = {
  retrieveAndSaveInformation
};
