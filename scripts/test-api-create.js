const http = require('http');

const data = JSON.stringify({
    title: 'Test Note From Script ' + Date.now(),
    content: 'This note is created to test if the API auto-generates slugs.',
    category: 'Programming',
    tags: ['test', 'script'],
});

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/notes',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
    },
};

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);

    let responseData = '';

    res.on('data', (chunk) => {
        responseData += chunk;
    });

    res.on('end', () => {
        console.log('Response Body:', responseData);
        if (res.statusCode === 201) {
            console.log('✅ API successfully created note without checking slug/auth?');
        } else {
            console.log('❌ API failed.');
        }
    });
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
    console.log('⚠️ Make sure the Next.js server is running on port 3000!');
});

req.write(data);
req.end();
