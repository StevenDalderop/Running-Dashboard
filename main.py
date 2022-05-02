from cmd_tool.calendar import authenticate_google_calendar_api, RunningCalendar
from cmd_tool.utils import copy_files_from_dir, extract_files_from_dir, csv_files_to_db
from running import settings


def main():
    count = copy_files_from_dir(settings.USB_DIR, settings.FIT_DIR) 
    print(f"Copied {count} files")

    count, extracted = extract_files_from_dir(settings.FIT_DIR, settings.CSV_DIR)
    print(f"Extracted {count} files")

    count = csv_files_to_db(extracted)
    print(f"Added {count} files to database")
       
    service = authenticate_google_calendar_api()
    calendar = RunningCalendar(service)
    count = calendar.add_files_to_calendar(extracted)
    print(f"Added {count} files to calendar")


if __name__ == "__main__":
    main()
