const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString)
mktEvent = urlParams.get("event")
mktEventToString = mktEvent.replace(/_/g, " ")
console.log(mktEvent)

var today = new Date()
var currentRangeStart = new Date()
var currentRangeEnd = new Date()
currentRangeStart.setDate(today.getDate() - 31)
currentRangeEnd.setDate(today.getDate() - 1)
var twoYearsAgo = new Date()
twoYearsAgo.setDate(today.getDate() - 730)
console.log(today)
console.log(twoYearsAgo)

while (currentRangeEnd > today) {
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
    
    fetch(`https://financialmodelingprep.com/api/v3/economic_calendar?from=${dateToYMD(currentRangeStart)}&to=${dateToYMD(currentRangeEnd)}&apikey=0fc22e02ecc68a84494f68c046d17097`, requestOptions)
    .then(response => response.text())
    .then(result => readResult(result))
    .catch(error => console.log('error', error));

    currentRangeStart.setDate(currentRangeStart.getDate() - 30)
    currentRangeEnd.setDate(currentRangeEnd.getDate() - 30)
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
        
        if (date.getHours() != 13 || date.getMinutes() != 30){
            return;
        }
        
    })
}