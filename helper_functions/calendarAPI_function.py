import requests
import pytz
from datetime import datetime

est = pytz.timezone('US/Eastern')
utc = pytz.utc
fmt = '%Y-%m-%d %H:%M'

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

        # 2023-01-05 13:30:00
        reportDateTime = result['date']
        reportDate = reportDateTime.split(' ')[0].split('-') # ['2023','01','05]
        reportTime = reportDateTime.split(' ')[1].split(':') # ['13','30','00']
        reportYear = int(reportDate[0])
        reportMonth = int(reportDate[1])
        reportDay = int(reportDate[2])
        reportHour = int(reportTime[0])
        reportMinute = int(reportTime[1])

        reportDatetimeObject = datetime(reportYear, reportMonth, reportDay, reportHour, reportMinute, tzinfo=utc)

        if reportDatetimeObject.hour != 13 or reportDatetimeObject.minute != 30:
            continue

        reportDatetimeEST = reportDatetimeObject.astimezone(est).strftime(fmt)

        print(f"Event: {result['event']}")
        print(f"Date: {reportDatetimeEST}")
        print()

