const express = require('express'); //Imports Express 
const app = express();  //Initialised instance of express applciation
const port = 3000;

app.use(express.json());

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

//Gets all polls
app.get("/polls", (req, res) => {
    res.json(polls);
});

//Posts a vote
app.post("/vote", (req, res) => {
    const { pollId, optionId } = req.body;
    const poll = polls.find((p) => p.pollId == pollId);
    if(!poll) return res.status(404).json({error: "poll not found"});

    const option = poll.options.find((o) => o.optionId == optionId);
    if (!option) return res.status(400).json({error: "invalid option"});

    if(!votes[pollId]) votes[pollId] = {};
    votes[pollId][optionId] = (votes[pollId][optionId] || 0) + 1;

    res.json({message: "Vote submitted succsessfully"});
});

//Gets a polls votes
app.get("/vote/:pollId", (req, res) => {
    const pollId = req.params.pollId;
    if (!votes[pollId]) return res.json({pollId, results: []});

    const poll = polls.find((p) => p.pollId == pollId);
    const results = poll.options.map((option) => ({
        optionId: option.optionId,
        optionText: option.optionText,
        votes: votes[pollId][option.optionId] || 0,
    })).sort((a,b) => b.votes - a.votes);

    res.json({pollId, results});
});

app.get("/", (req, res) => {
    res.send("Server Running");
});

app.listen(port, () => {
    console.log('Example app listening on port ${port}');
});

