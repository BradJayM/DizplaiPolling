let addVoteUrl = "http://localhost:3000/vote";


window.onload = () => {
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