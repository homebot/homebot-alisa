const http = require('http');

module.exports = function (params) {
    return new Promise(function (resolve, reject) {
        let req = http.request(params, function (res) {
            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }

            let body = [];
            res.on('data', function (chunk) {
                body.push(chunk);
            });
            res.on('end', function () {
                try {
                    body = JSON.parse(Buffer.concat(body).toString());
                } catch (e) {
                    reject(e);
                }
                resolve(body);
            });
        });

        req.on('error', function (err) {
            reject(err);
        });
        req.end();
    });
}