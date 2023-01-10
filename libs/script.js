var today = new Date();
var monday = getMonday(today)
var friday = new Date();
friday.setDate(monday.getDate() + 4)
document.getElementById("forTheWeekHeader").innerHTML += dateToYMD(monday) + " to " + dateToYMD(friday);

function getMonday(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    return new Date(d.setDate(diff));
}
  
function dateToYMD(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}


function callAPI () {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
    const today = new Date()
    var tomorrow = new Date(today)
    var dayAfterTomorrow = new Date(tomorrow)
    tomorrow.setDate(tomorrow.getDate() + 1) // start date for API call, tomorrow
    dayAfterTomorrow.setDate(tomorrow.getDate() + 2) // end date for API call
    
    tomorrowToString = dateToYMD(tomorrow)
    dayAfterTomorrowToString = dateToYMD(dayAfterTomorrow)
    console.log(tomorrowToString)
    console.log(dayAfterTomorrowToString)
    console.log(`https://financialmodelingprep.com/api/v3/economic_calendar?from=${tomorrowToString}&to=${dayAfterTomorrowToString}&apikey=0fc22e02ecc68a84494f68c046d17097`)

    fetch(`https://financialmodelingprep.com/api/v3/economic_calendar?from=${tomorrowToString}&to=${dayAfterTomorrowToString}&apikey=0fc22e02ecc68a84494f68c046d17097`, requestOptions)
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
        
        var date = new Date(item['date'])
        var tues = []
        
        if (date.getHours() != 13 || date.getMinutes() != 30){
            return;
        }

        console.log(item)
    })
}