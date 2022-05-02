from __future__ import print_function
import pickle
import os.path
import re
import pandas as pd
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from cmd_tool.parse import parse_csv

# If modifying these scopes, delete the file token.pickle.
SCOPES = ['https://www.googleapis.com/auth/calendar',
          'https://www.googleapis.com/auth/calendar.events']


def authenticate_google_calendar_api():
    creds = None
    # The file token.pickle stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('.\credentials\\token.pickle'):
        with open('.\credentials\\token.pickle', 'rb') as token:
            creds = pickle.load(token)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            print(creds)
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                '.\credentials\\credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('.\credentials\\token.pickle', 'wb') as token:
            pickle.dump(creds, token)

    service = build('calendar', 'v3', credentials=creds)
    
    return service   

 
class RunningCalendar:
    def __init__(self, service):
        self.service = service     

    def is_in_calendar(self, event):
        is_in_calendar = event.start_time in self.get_running_events()["start"].tolist()
        return is_in_calendar

    def add_event_to_calendar(self, event):
        created = False 
        is_in_calendar = self.is_in_calendar(event)
        if not is_in_calendar:
            created = True
            self.service.events().insert(calendarId = 'primary', body = event.get_json()).execute()
        return created

    def remove_from_calendar(self, event):
        events = self.get_running_events()
        matches = events[events["start"] == event.start_time]["id"]
        if len(matches) == 0:
            return False
        id = matches.iloc[0]
        self.service.events().delete(calendarId='primary', eventId=id).execute()
        return True
    
    def add_directory(self, directory):
        csvs = [os.path.join(directory, csv) for csv in os.listdir(directory)]

        return self.add_files_to_calendar(csvs)
    
    def add_files_to_calendar(self, files):
        count = 0 

        for file in files:
            event = RunningEvent(file)
            created = self.add_event_to_calendar(event)   
            if created:
                count += 1

        return count             

    def search_events(self, query):
        page_token = None
        events = []
        while True:
            events_page = self.service.events().list(calendarId='primary', q = query, pageToken=page_token).execute()
            for event in events_page['items']:
                events = events + [event]
            page_token = events_page.get('nextPageToken')
            if not page_token:
                break
        df_events = pd.DataFrame(events)
        return df_events  

    def get_running_events(self):
        events = self.search_events("Hardlopen")
        
        events = events[events["status"] == "confirmed"]
        
        format_string = r"Hardlopen\s\([0-9]+\.\d\sKM\)"
        is_format_ok = lambda x: bool(re.match(format_string, x))
        is_format_ok = events["summary"].apply(is_format_ok)
        
        events = events[is_format_ok]
        events["start"] = events["start"].apply(lambda x: x["dateTime"][0:19])
        events["start"] = events["start"].apply(pd.to_datetime)
        events["end"] = pd.to_datetime(events["end"].apply(lambda x: x["dateTime"][0:19]))            
        return events

    
class RunningEvent:
    def __init__(self, csv=False, df_row=None):
        if csv: 
            df = parse_csv(csv)
            df_session = df[df["Message"] == "session"] 

            self.start_time = df_session["start_time"].iloc[0]
            self.end_time = df_session["timestamp"].iloc[0]
            self.distance = df_session["total_distance"].iloc[0]
        else:        
            self.start_time = df_row["start"].iloc[0]
            self.end_time = df_row["end"].iloc[0]
            self.distance = 0
        
    def create_summary(self):
        return "Hardlopen ("  + str(round(self.distance, 1)) + " KM)"
    
    def get_json(self):
        event = {
        'summary': self.create_summary(), 
        'colorId': 5, 
        'start': {
            'dateTime': self.start_time.isoformat(), 
            'timeZone': 'Europe/Amsterdam'
            },
        'end': {
            'dateTime': self.end_time.isoformat(),
            'timeZone': 'Europe/Amsterdam'
            }
        }
        return event
