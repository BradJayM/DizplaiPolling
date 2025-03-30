let addVoteUrl = "http://localhost:3000/vote";
let getPollUrl = "http://localhost:3000/polls/"
let pollChoice = "1";

window.onload = async () => {
    await getPoll(getPollUrl+pollChoice)


    document.getElementById("submitVote").addEventListener("click", async (e) => {
        e.preventDefault()
        
        const selectedOption = document.querySelector('input[name="radioVote"]:checked');
        if (!selectedOption) {
            alert("Please select an option before submitting.");
            return;
        }

        const data = {
            "pollId" : "1",
            "optionId" : selectedOption.value
        };
        await sendVote(addVoteUrl, data);
        window.location.href = "results.html";
    });
};

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
    } catch (error) {
        console.error("Error: ", error);
        alert("Error submitting vote.");
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
        document.getElementById("pollQuestion").innerHTML = pollQuestion;

        for(i in data.poll.options){
            pollOptions.push(data.poll.options[i].optionText);
            document.getElementById("option"+i+"Label").innerHTML = pollOptions[i];
        }
    
    } catch(error){
        console.error("Error fetching results", error);
    }
}