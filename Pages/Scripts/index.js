let addVoteUrl = "http://localhost:3000/vote";
let getPollUrl = "http://localhost:3000/polls/"
let pollChoice = "1"; //NEED TO ADD A PAGE WHERE USER CAN SELECT WHICH POLL TO PARTAKE IN

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

        pollQuestion = data.poll.question;
        document.getElementById("pollQuestion").innerHTML = pollQuestion;

        data.poll.options.forEach((option, index) => {

            let label = document.createElement("label");

            let input = document.createElement("input");
            input.type = "radio";
            input.name = "radioVote";
            input.value = index+1;
            input.id = 'option${index}';

            let boxDiv = document.createElement("div");
            boxDiv.classList.add("box");

            let span = document.createElement("span");
            span.id = 'option${index}Label';
            span.innerText = option.optionText;

            boxDiv.appendChild(span);
            label.appendChild(input);
            label.appendChild(boxDiv);

            document.getElementById("pollOptions").appendChild(label);
        });
        

    } catch(error){
        console.error("Error fetching results", error);
    }
}