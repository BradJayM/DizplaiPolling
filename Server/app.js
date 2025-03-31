const express = require('express'); //Imports Express 
const app = express();  //Initialised instance of express applciation
const port = 3000;
const cors = require("cors");
app.use(cors()); //Allows requests to come from other directories.

app.use(express.json());

//Store the polls using in-memory storage this is not persistent between server uptime.
let polls = [
    {
        pollId:1,
        pollName: "Example Poll",
        question: "What is the best music genre for the office?",
        options: [
            {optionId: 1, optionText: "Pop"},
            {optionId: 2, optionText: "Alternative Rock"},
            {optionId: 3, optionText: "Classical"},
            {optionId: 4, optionText: "Country"},
            {optionId: 5, optionText: "Just the radio"},
            {optionId: 6, optionText: "A random assortment thanks to Spotify 'smart' shuffle"},

        ],
    },
];

let votes = {}

//Gets all polls
app.get("/polls", (req, res) => {
    res.json(polls);
});

//Gets a poll based on pollID
app.get("/polls/:pollId", (req, res) => {
    const pollId = req.params.pollId;
    const poll = polls.find((p) => p.pollId == pollId); //find the poll[p] where pollID is equal to the pollID within the request
    if(!poll) return res.status(404).json({error: "poll not found"}); //pollID doesnt exist :/

    res.json({poll});
})

//Posts a vote
app.post("/vote", (req, res) => {
    const { pollId, optionId } = req.body;
    const poll = polls.find((p) => p.pollId == pollId);
    if(!poll) return res.status(404).json({error: "poll not found"});

    const option = poll.options.find((o) => o.optionId == optionId);
    if (!option) return res.status(400).json({error: "invalid option"});

    if(!votes[pollId]) votes[pollId] = {}; //If the votes array doesnt contain any results for this poll, add the data for it.
    votes[pollId][optionId] = (votes[pollId][optionId] || 0) + 1; //Add the vote in.

    res.json({message: "Vote submitted succsessfully"});
});

//Gets a polls votes
app.get("/vote/:pollId", (req, res) => {
    const pollId = req.params.pollId;
    if (!votes[pollId]) return res.json({pollId, results: []});

    const poll = polls.find((p) => p.pollId == pollId);
    const results = poll.options.map((option) => ({ //maps the response to variables within the votes array.
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
    console.log(`Server listening on port ${port}`);
});

