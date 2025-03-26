const express = require('express'); //Imports Express 
const app = express();  //Initialised instance of express applciation
const port = 3000;

//Store the polls using in-memory storage
let polls = [
    {
        pollId:1,
        pollName: "Best Coding Language",
        question: "What is the best coding language?",
        options: [
            {optionId: 1, optionText: "Java"},
            {optionId: 2, optionText: "C++"},
            {optionId: 3, optionText: "MIPS"},
        ],
    },
];

//Store the polls using in-memory storage
let votes = {}

app.listen(port, () => {
    console.log('Example app listening on port ${port}');
});

