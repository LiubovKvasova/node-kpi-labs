const http = require("http");
const fs = require("fs");
const path = require("path");
const {retrieveAndSaveInformation} = require('./webScrapper.js');

const PORT = 8000;
const pageTemplate = fs.readFileSync('template.html').toString('utf8');

setInterval(retrieveAndSaveInformation, 60_000);

http.createServer((req, res) => {
  const {method, url} = req;

  const notFoundResponse = () => {
    res.writeHead(404);
    res.end('No such resource was found');
  };

  if (method !== 'GET') {
    notFoundResponse();
    return;
  }

  if (url === '/') {
    const folderPath = path.resolve(__dirname, 'news');

    fs.readdir(folderPath, (err, files) => {
      if (err) {
        console.error(err);
        return;
      }

      const fileList = files.map(file => `<li><a href="/news/${file}">${file}</a></li>`).join('\n');
      const preparedPage = pageTemplate.replace('{news_list}', fileList);

      res.setHeader('Content-type', 'text/html');
      res.end(preparedPage);
    });
  } else if (url !== '/favicon.ico') {
    const filePath = path.resolve('.' + url);

    fs.readFile(filePath, {encoding: 'utf8'}, (err, data) => {
      if (err) {
        notFoundResponse();
        return;
      }

      res.setHeader('Content-type', 'text/plain; charset=utf-8');
      res.end(data);
    });
  }
}).listen(PORT);
