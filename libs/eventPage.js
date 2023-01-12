const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString)
mktEvent = urlParams.get("event")
mktEventToString = mktEvent.replace(/_/g, " ")
console.log(mktEvent)

var today = new Date();
var monday = getMonday(today)
var friday = new Date();
var dayAfterFriday = new Date();
friday.setDate(monday.getDate() + 4)
dayAfterFriday.setDate(friday.getDate() + 1)
window.onload = function() {
    document.getElementById("pageHeader").innerHTML = mktEventToString
}

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

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};
    
var tomorrow = new Date(today)
var dayAfterTomorrow = new Date(tomorrow)
tomorrow.setDate(tomorrow.getDate() + 1) // start date for API call, tomorrow
dayAfterTomorrow.setDate(tomorrow.getDate() + 2) // end date for API call

tomorrowToString = dateToYMD(tomorrow)
dayAfterTomorrowToString = dateToYMD(dayAfterTomorrow)

fetch(`https://financialmodelingprep.com/api/v3/economic_calendar?from=${dateToYMD(monday)}&to=${dateToYMD(dayAfterFriday)}&apikey=0fc22e02ecc68a84494f68c046d17097`, requestOptions)
.then(response => response.text())
.then(result => readResult(result))
.catch(error => console.log('error', error));


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
        
        // if (date.getHours() != 13 || date.getMinutes() != 30){
        //     return;
        // }
       
    })
}