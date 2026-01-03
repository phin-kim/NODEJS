import http from 'node:http';

const port = Number(process.env.PORT || 3000);

const server = http.createServer((_, res) => {
  res.end('OK');
});

server.listen(port, () => {
  console.log('Server running on port', port);
});
