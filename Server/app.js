const express = require('express'); //Imports Express 
const app = express();  //Initialised instance of express applciation
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log('Example app listening on port ${port}')
})
