var http = require('http');

const listenPort = 3000,
    //proxyHttpHost = 'vf-os2.univ-lyon2.fr',
    //proxyHttpHost = '159.84.143.247'
    proxyHttpHost = 'localhost'
    proxyHttpPort = 8003,
    //proxySocketUrl = 'http://vf-os2.univ-lyon2.fr:8003/cps';
    //proxySocketUrl = 'http://159.84.143.247:8003/cps';
    proxySocketUrl = 'http://vapp4back-host:8003/cps';

const additionalResponseHeaders = [
    //{ name: 'access-control-allow-origin', value: 'http://localhost:4200' },
    { name: 'access-control-allow-origin', value: '*' },
    { name: 'access-control-allow-credentials', value: 'true' }
]; 

// http proxy server
const proxyServer = http.createServer(function(request, response) {

    const proxy_request = http.request({
        hostname: proxyHttpHost,
        port: proxyHttpPort,
        method: request.method,
        path: request.url,
        headers: request.headers
    });

    console.log({
        hostname: proxyHttpHost,
        port: proxyHttpPort,
        method: request.method,
        path: request.url,
        headers: request.headers
    })

    proxy_request.addListener('response', function (proxy_response) {
        proxy_response.addListener('data', function(chunk) {
            response.write(chunk, 'binary');
        });
        proxy_response.addListener('end', function() {
            response.end();
        });

        for (let i = 0; i < additionalResponseHeaders.length; i++) {
            let header = additionalResponseHeaders[i];
            proxy_response.headers[header.name] = header.value;
        }

        response.writeHead(proxy_response.statusCode, proxy_response.headers);
    });

    request.addListener('data', function(chunk) {
        proxy_request.write(chunk, 'binary');
    });
    request.addListener('end', function() {
        console.log('end')
        proxy_request.end();
    });

});

// socket proxy server
proxyServer.on('upgrade', function (req, socket, head) {
    proxy.ws(req, socket, head);
});

// start server
proxyServer.listen(listenPort);

console.info('Started proxy server on port ' + listenPort + '.');
console.info('Requests will be proxied to ' + proxyHttpHost + ':' + proxyHttpPort + '.');
console.info('');
console.info('Proxying web sockets is enabled.');
console.info('');
console.info('The following headers will be added to the responses:');
for (let i = 0; i < additionalResponseHeaders.length; i++) {
    let header = additionalResponseHeaders[i];
    console.info(header.name + ' ' + header.value)
}
console.info('');
