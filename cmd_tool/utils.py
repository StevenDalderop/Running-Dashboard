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
from app.models import Session, Lap, Record


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
