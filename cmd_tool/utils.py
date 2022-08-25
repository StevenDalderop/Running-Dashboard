from shutil import copyfile
import subprocess
from django.conf import settings
import django 
import sys
import os
sys.path.append("/running/settings")
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'running.settings')
django.setup()
import warnings
warnings.filterwarnings("ignore", category=RuntimeWarning)
from app.models import Session, Lap, Record, Matches
from cmd_tool.calendar import authenticate_google_calendar_api, RunningCalendar


def copy_file(source, destination):
    copied = False
    if os.path.isfile(source) and not os.path.isfile(destination):  
        copyfile(source, destination)
        copied = True
    return copied


def fit_to_csv(source, destination):
    created = False 
    if os.path.isfile(source) and not os.path.isfile(destination):
        subprocess.run(["java", "-jar", settings.FIT_CSV_TOOL, "-b", source, destination])
        created = True
    return created


def remove_records_from_db():
    Session.objects.all().delete()
    Lap.objects.all().delete()
    Record.objects.all().delete()
    return
    

def copy_files_from_dir(source, destination):
    sources = os.listdir(source)
    copies = 0

    for s in sources:
        path_source = os.path.join(source, s)
        path_destination = os.path.join(destination, s)
        copied = copy_file(path_source, path_destination)
        if copied:
            copies += 1

    return copies


def extract_files_from_dir(source, destination):
    sources = os.listdir(source)

    copies = 0
    files_copied = []

    for s in sources:
        path_source = os.path.join(source, s)
        path_destination = os.path.join(destination, s[:-4] + ".csv")
        copied = fit_to_csv(path_source, path_destination)
        if copied:
            copies += 1
            files_copied.append(path_destination)

    return copies, files_copied


def csv_dir_to_db(csv_dir):
    csvs = os.listdir(csv_dir)
    count = 0 

    for csv in csvs:
        path = os.path.join(csv_dir, csv)
        session, created = Session.create_session(path)
        print(f"{session} is created: {created}")
        Lap.create_laps(path)
        Record.create_records(path)
        if created: 
            count += 1

    return count


def csv_files_to_db(csvs):
    count = 0 

    for csv in csvs:
        session, created = Session.create_session(csv)
        print(f"{session} is created: {created}")
        Lap.create_laps(csv)
        Record.create_records(csv)
        if created: 
            count += 1

    return count    


def update_matches_db(csv):
    count = Matches.update_db(csv)
    return count


def get_info():
    print(f"{Session.objects.all().count()} sessions in database")
    print(f"{Lap.objects.all().count()} laps in database")
    print(f"{Record.objects.all().count()} records in database")
    print(f"{Matches.objects.all().count()} races in database")
    service = authenticate_google_calendar_api()
    calendar = RunningCalendar(service)
    event_count = len(calendar.get_running_events())
    print(f"{event_count} events in calendar")


def import_files_from_usb():
    count = copy_files_from_dir(settings.USB_DIR, settings.FIT_DIR) 
    print(f"Copied {count} files")
    return 


def extract_new_files():
    count, extracted = extract_files_from_dir(settings.FIT_DIR, settings.CSV_DIR)
    print(f"Extracted {count} files")

    count = csv_files_to_db(extracted)
    print(f"Added {count} files to database")
       
    service = authenticate_google_calendar_api()
    calendar = RunningCalendar(service)
    count = calendar.add_files_to_calendar(extracted)
    print(f"Added {count} files to calendar")
    return


def update_database():
    count = update_matches_db(settings.MATCHES)
    print(f"Created {count} matches in database")
    return
