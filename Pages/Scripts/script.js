let addVoteUrl = "http://localhost:3000/vote";
let getPollUrl = "http://localhost:3000/polls/"
let getResultsUrl = "http://localhost:3000/vote/"
let pollChoice = "1";

window.onload = async () => {
    await getPoll(getPollUrl+pollChoice)

    document.getElementById("submitVote").addEventListener("click", async (e) => {
        e.preventDefault()
        var form = document.getElementById("castVote");
        const data = {
            "pollId" : "1",
            "optionId" : form.elements["castVote"].value
        };
        await sendVote(addVoteUrl, data);
        await getResults(getResultsUrl+pollChoice);
    });
};



async function getResults(url){
    try{
        const response = await fetch(url, {
            method : "get",
            headers: {
                "accept" : "application/json",
            },
        });
        const data = await response.json();
        alert("response got");
    } catch(error){
        console.error("Error fetching results", error);
    }
}


async function sendVote(url, data){
    try{
        const response = await fetch(url, {
            method: "post",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log("success: ", result);
        alert("Vote Good");
        return true;
    } catch (error) {
        console.error("Error: ", error);
        alert("Error submitting vote.");
        return false;
    }
}


async function getPoll(url){
    try{
        const response = await fetch(url,{
            method : "GET",
            headers : {
                "accept" : "application/json",
            },
        })
        const data = await response.json();
        let pollQuestions = null;
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

    } catch(error){
        console.error("Error fetching results", error);
    }
}