// console.log("Hello world", __dirname);
// console.log(__filename);

// const userObj = require("./user");

// console.log(userObj);

const http = require("http");
const fs = require("fs");
const path = require("path");
const PORT = 4000;

const server = http.createServer((req, res) => {
    if (req.method === "GET") {
        res.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8",
        });

        if (req.url === "/") {
            fs.readFile(
                path.join(__dirname, "views", "index.html"),
                "utf-8",
                (err, content) => {
                    if (err) {
                        throw err;
                    }

                    res.end(content);
                }
            );
        } else if (req.url === "/about") {
            fs.readFile(
                path.join(__dirname, "views", "about.html"),
                "utf-8",
                (err, content) => {
                    if (err) {
                        throw err;
                    }

                    res.end(content);
                }
            );
        } else if (req.url === "/api/users") {
            res.writeHead(200, {
                "Content-Type": "text/json",
            });

            const user = [
                {name: 'Sergii', age: 19},
                {name: 'Karina', age: 16}
            ]

            res.end(JSON.stringify(user))
        }
    } else if (req.method === "POST") {
        let body = "";

        req.on("data", (data) => {
            body += data;
        });

        req.on("end", () => {
            const message = decodeURIComponent(body).split("=")[1];
            res.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8",
            });
            res.end(`
            <h1>Ваше сообщение: ${message}</h1>
            `);
        });
    }
});

server.listen(PORT, () => {
    console.log("Server is running...");
});
