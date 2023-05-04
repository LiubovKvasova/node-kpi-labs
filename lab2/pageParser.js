'use strict';

const cheerio = require("cheerio");

const parseNewsPage = (data) => {
  const news = [];

  const $ = cheerio.load(data);
  const content = $(".view-content > .item-list > ul");
  const elements = content.find('li .views-field-title a');

  for (const element of elements) {
    const {attribs, children} = element;
    const child = children[0];

    if (child.type === 'text') {
      const title = child.data;
      const link = attribs.href;

      if (/^\/node/.test(link)) {
        news.push({title, link});
      }
    }
  }

  return news;
};

const parseSingleNewsPage = (data) => {
  let text = '';

  const $ = cheerio.load(data);
  const content = $("#block-bartik-system-main .clearfix.field--type-text-with-summary");
  const elements = content.find("p");

  for (const element of elements) {
    const child = element.children[0];

    if (child && child.type === 'text') {
      const paragraph = child.data;
      text += paragraph + '\n';
    }
  }

  return text;
};

module.exports = {
  parseNewsPage,
  parseSingleNewsPage
};
