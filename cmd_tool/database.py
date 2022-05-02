from contextlib import nullcontext
import sys
import os
from website.app.constants import WEBSITE_DIR

sys.path.append(WEBSITE_DIR)
os.environ['DJANGO_SETTINGS_MODULE'] = 'running.settings'
os.environ['DJANGO_ALLOW_ASYNC_UNSAFE'] = "true"
import django
django.setup()
from app.models import Session, Lap, Record, Matches, Training 
import warnings
warnings.filterwarnings("ignore", category=RuntimeWarning)
from datetime import date


def update_db_matches(df_matches):   
    count_created = 0
    for index, row in df_matches.iterrows():
        day, month, year = row["Date"].split("-")
        match, created = Matches.objects.get_or_create(
            index=index,
            date=date(int(year), int(month), int(day)),
            distance=row["Distance"],
            time=row["Time"],
            name=row["Name"],
            isRecord=row["Record"]
        )
        count_created += int(created) 
        print(f"{match} created: {created} \r", end="") 
    print(f"Matches created: {count_created}           ")

       
def update_db_training_schedule(df_training_schedule): 
    count_created = 0
    for index, row in df_training_schedule.iterrows():
        defaults = {
            "year": row["year"], 
            "quarter": row["quarter"], 
            "week": row["week"], 
            "training_nr": row["training_nr"], 
            "description": row["description"]
        }
        training, created = Training.objects.update_or_create(
            index = row["id"], defaults = defaults
        )
        count_created += int(created)
        print(f"{training} created: {created} \r", end="")
    print(f"Trainings created: {count_created}")
