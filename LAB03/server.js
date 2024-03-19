const connect = require('connect');
const url = require('url');

const app = connect();

app.use((req, res) => {
    const query = url.parse(req.url, true).query;
    const method = query.method;
    const x = parseFloat(query.x);
    const y = parseFloat(query.y);

    let result;
    switch (method) {
        case 'add':
            result = x + y;
            break;
        case 'subtract':
            result = x - y;
            break;
        case 'multiply':
            result = x * y;
            break;
        case 'divide':
            result = x / y;
            break;
        default:
            res.end('Error: Invalid method');
            return;
    }

    res.end(`${x} ${method} ${y} = ${result}`);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
