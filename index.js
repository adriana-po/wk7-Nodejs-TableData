//import http

import http from "http";
import fetch from "node-fetch";

//create a server

const server = http
  .createServer((req, res) => {
    const url = req.url;
    let tableData =
      "<table border='1'><tr><th>NAME</th><th>HEIGHT</th><th>BIRTH_YEAR</th><th>GENDER</th><th>URL</th></tr>";
    if (url === "/") {
      res.write("<h1>Welcome to My Page</h1>"); //write response to client
      res.write('<img src="https://dummyimage.com/600x400/000/fff">');
      res.end(); //end the response
    }
    else if (url === "/list") {
      fetch("https://swapi.dev/api/people")
        .then((res) => res.json())
        .then((data) => {
          createData(data);
          res.write(tableData);
          res.end();
        });
    } else {
      res.statusCode = 404;
      res.end("Sorry, Page Not Found!");
    }
    function createData(data) {
      data.results.forEach((element) => {
        tableData += `<tr><td>${element.name}</td><td>${element.height}</td><td>${element.birth_year}</td><td>${element.gender}</td><td>${element.url}</td></tr>`;
      });
      tableData += `</table>`;
    }
  })
  .listen(8090, console.log(`server listening on port 8090`));
