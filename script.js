function callAPI () {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("https://financialmodelingprep.com/api/v3/economic_calendar?from=2023-01-05&to=2023-02-05&apikey=0fc22e02ecc68a84494f68c046d17097", requestOptions)
        .then(response => response.text())
        .then(result => readResult(result))
        .catch(error => console.log('error', error));
}

function readResult(response) {
    const jsonObj = JSON.parse(response)
    jsonObj.forEach(function showResults(item) {
        if (item['country'] != 'US'){
            return;
        }
        
        if (item['impact'] != 'High'){
            return;
        }
        
        //console.log(item);
        var date = new Date(item['date'])
        console.log(item['date'])
        console.log(date)
        // 2023-01-05 13:30:00
    })
}