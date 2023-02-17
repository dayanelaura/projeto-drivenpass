import express from 'express';

const server = express();

server.get('/health', (req, res) => {
    res.send('ok');
});

server.listen(4000, () => {
    console.log('server running on port 4000');
});