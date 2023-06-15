const http = require ('http');
const util = require("./../util.js");

http.get({
    hostname: '127.0.0.1',
    port: 8000,
    path: '/files/name.txt',
    agent: false,
    headers:{},
    }, (res) => {
        let correct = true;
        correct = correct & util.compareStatus(res, 200, "OK");
        correct = correct & util.compareHeaders({"connection": "close", "content-type":"text/plain; charset=utf-8"}, res.headers);
        res.on ('data', (data) => {
            correct = correct & util.compareFile (util.filename("/files/name.txt"), data);
        });
        res.on("end", () => {
            if (!correct) {
                process.exit(1);
            }
        });
});