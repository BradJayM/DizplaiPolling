let getResultsUrl = "http://localhost:3000/vote/"
let pollChoice = "1";

window.onload = async () => {
    await getResults(getResultsUrl+pollChoice);
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
        const pollResults = [];
        let votesTotal = null;

        for(i in data.results){
            votesTotal = votesTotal + data.results[i].votes;
        }

        for(i in data.results){
            pollResults.push([data.results[i].optionText, data.results[i].votes]);
            pollResults[i][1] = ((pollResults[i][1] / votesTotal) *100).toFixed(0);

            document.getElementById(i+"Position").innerHTML = pollResults[i][0];
            document.getElementById(i+"Percentage").innerHTML = pollResults[i][1] + "%";
        }
        
    } catch(error){
        console.error("Error fetching results", error);
    }
};
