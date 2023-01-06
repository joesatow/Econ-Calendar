import requests

def callCalendarAPI(startDate, endDate):
    url = "https://financialmodelingprep.com/api/v3/economic_calendar?from=2023-01-05&to=2023-02-05&apikey=0fc22e02ecc68a84494f68c046d17097"

    payload={}
    headers = {}

    response = requests.request("GET", url, headers=headers, data=payload)
    response = response.json()

    for result in response:
        if result['country'] != 'US':
            continue
        
        if result['impact'] != 'High':
            continue

        print(f"Event: {result['event']}")
        print(f"Date: {result['date']}")