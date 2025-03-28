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

        pollResults.push([data.results[0].optionText, data.results[0].votes]);
        pollResults.push([data.results[1].optionText, data.results[1].votes]);
        pollResults.push([data.results[2].optionText, data.results[2].votes]);

        votesTotal = pollResults[0][1] + pollResults[1][1] + pollResults[2][1];
        //console.log(pollResults[0][1]);

        pollResults[0][1] = ((pollResults[0][1] / votesTotal) *100).toFixed(2);
        pollResults[1][1] = ((pollResults[1][1] / votesTotal) *100).toFixed(2);
        pollResults[2][1] = ((pollResults[2][1] / votesTotal) *100).toFixed(2);

        //console.log(pollResults);

        document.getElementById("first").innerHTML = pollResults[0][0] + "  " + pollResults[0][1] +"%";
        document.getElementById("second").innerHTML = pollResults[1][0] + "  " + pollResults[1][1] +"%";
        document.getElementById("third").innerHTML = pollResults[2][0] + "  " + pollResults[2][1] +"%";
        
    } catch(error){
        console.error("Error fetching results", error);
    }
};
