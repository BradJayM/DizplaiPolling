let addVoteUrl = "http://localhost:3000/vote";
let getPollUrl = "http://localhost:3000/polls/"
let pollChoice = "1";

window.onload = () => {
    getPoll(getPollUrl+pollChoice)

    document.getElementById("submitVote").addEventListener("click", (e) => {
        e.preventDefault();
        var form = document.getElementById("castVote");
        const data = {
            "pollId" : "1",
            "optionId" : form.elements["castVote"].value
        };
        sendVote(addVoteUrl, data);
    });
};

function sendVote(url, data){
    fetch(url, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log("Success: ", result);
        alert("Vote good");
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Error submitting vote.");
    });

};


//NEED TO ADD MORE FAILIURE OPTIONS TO THIS GETPOLL()   
function getPoll(url){
    fetch(url, {
        method: "get",
        headers: {
            "accept" : "application/json",
        },
    })
    .then (response => response.json())
    .then (data => {
        
        let pollQuestion = null;
        let pollOptions = [];

        
        pollQuestion = data.poll.question;
        pollOptions.push(data.poll.options[0].optionText);
        pollOptions.push(data.poll.options[1].optionText);
        pollOptions.push(data.poll.options[2].optionText);
        //console.log(pollQuestion);
        //console.log(pollOptions);

        document.getElementById("pollQuestion").innerHTML = pollQuestion;
        document.getElementById("label1").innerHTML = pollOptions[0];
        document.getElementById("label2").innerHTML = pollOptions[1];
        document.getElementById("label3").innerHTML = pollOptions[2];
    })
    .catch (error => console.error(error));
};