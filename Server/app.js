const express = require('express'); //Imports Express 
const app = express();  //Initialised instance of express applciation
const port = 3000;
const cors = require("cors");
app.use(cors());

app.use(express.json());

//Store the polls using in-memory storage
let polls = [
    {
        pollId:1,
        pollName: "Example Poll",
        question: "Example Poll",
        options: [
            {optionId: 1, optionText: "Yes"},
            {optionId: 2, optionText: "No"},
            {optionId: 3, optionText: "Maybe"},
            {optionId: 4, optionText: "Example Longer answer to test if the text wraps properly or if it breaches the box :) Apparently this should now show an ellipsis"},

        ],
    },
];

//Store the polls using in-memory storage
let votes = {}

//Gets all polls
app.get("/polls", (req, res) => {
    res.json(polls);
});

app.get("/polls/:pollId", (req, res) => {
    //const pollId = req.params.pollId;
    const pollId = 1;
    const poll = polls.find((p) => p.pollId == pollId);
    if(!poll) return res.status(404).json({error: "poll not found"});

    res.json({poll});
})

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

