let getResultsUrl = "http://localhost:3000/vote/"
let pollChoice = "1";

window.onload = async (e) => {
    await getResults(getResultsUrl+pollChoice);
    e.preventDefault();
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
        //const pollResults = [];
        let votesTotal = null;

        for(i in data.results){
            votesTotal = votesTotal + data.results[i].votes;
        }

        data.results.forEach((option, index) => {
            let label = document.createElement("label");

            let boxDiv = document.createElement("div")
            boxDiv.classList.add("box");

            let leftDiv = document.createElement("div")
            leftDiv.classList.add("boxLeft")

            let iPos = document.createElement("p")
            iPos.id = index+"Position";
            iPos.innerText = option.optionText;

            let spanLeft = document.createElement("span")
            spanLeft.id = "spanLeft";

            let rightDiv = document.createElement("div")
            rightDiv.classList.add("boxRight")

            let iPercent = document.createElement("p")
            iPercent.id = index+"Percentage"
            iPercent.innerText = Math.trunc((option.votes/votesTotal)*100) + "%";

            let spanRight = document.createElement("span")
            spanRight.id = "spanRight";

            spanLeft.appendChild(iPos);
            leftDiv.appendChild(spanLeft);

            spanRight.appendChild(iPercent);
            rightDiv.appendChild(spanRight);

            boxDiv.appendChild(leftDiv);
            boxDiv.appendChild(rightDiv);

            label.appendChild(boxDiv);

            document.getElementById("pollResults").appendChild(label);

        });
        
    } catch(error){
        console.error("Error fetching results", error);
    }
};
