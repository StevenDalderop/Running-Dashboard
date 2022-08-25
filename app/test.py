from django.test import TestCase
from django.conf import settings

from app.models import Session, Lap, Record, Matches
import os
from cmd_tool.utils import copy_file, fit_to_csv, csv_dir_to_db
from cmd_tool.calendar import RunningCalendar, RunningEvent, authenticate_google_calendar_api


# Create your tests here.
class DatabaseTestCase(TestCase):
    def setUp(self):
        self.csv_file = "A83E5626.csv"

    def test_create_session(self):
        self.assertEqual(Session.objects.count(), 0)
        path = os.path.join(settings.TEST_DIR / 'csv', self.csv_file)
        session, created = Session.create_session(path)
        self.assertTrue(created)
        self.assertEqual(Session.objects.count(), 1)
        self.assertEqual(session.name, self.csv_file)

        session2, created2 = Session.create_session(path)
        self.assertFalse(created2)
        self.assertEqual(Session.objects.count(), 1)

    def test_create_laps(self):
        self.assertEqual(Lap.objects.count(), 0)
        path = os.path.join(settings.TEST_DIR / 'csv', self.csv_file)
        with self.assertRaises(IndexError):
            Lap.create_laps(path)
        self.assertEqual(Lap.objects.count(), 0)
        session, created = Session.create_session(path)
        Lap.create_laps(path)
        self.assertEqual(Lap.objects.count(), 1)
        self.assertEqual(round(Lap.objects.first().total_distance, 5), 2.18859)
        self.assertEqual(Lap.objects.first().session_index.name, self.csv_file)
        Lap.create_laps(path)
        self.assertEqual(Lap.objects.count(), 1)
        
    def test_create_records(self):
        self.assertEqual(Record.objects.count(), 0)
        path = os.path.join(settings.TEST_DIR / 'csv', self.csv_file)
        with self.assertRaises(IndexError):
            Record.create_records(path)
        self.assertEqual(Record.objects.count(), 0)
        session, created = Session.create_session(path)
        self.assertEqual(Session.objects.count(), 1)
        Record.create_records(path)
        self.assertEqual(Record.objects.count(), 734)
        self.assertEqual(Record.objects.first().speed, 9.6552)
        self.assertEqual(Record.objects.first().session_index.name, self.csv_file)
        Record.objects.first().delete()
        self.assertEqual(Record.objects.count(), 733)
        Record.create_records(path)
        self.assertEqual(Record.objects.count(), 734)

    def test_csv_dir_to_db(self):
        self.assertEqual(Session.objects.count(), 0)
        csv_dir_to_db(settings.TEST_DIR / 'csv')
        self.assertEqual(Session.objects.count(), 1)
        csv_dir_to_db(settings.TEST_DIR / 'csv')
        self.assertEqual(Session.objects.count(), 1)
        self.assertEqual(Session.objects.filter(name = self.csv_file)[0].total_distance, 2.18859)
        self.assertEqual(Lap.objects.count(), 1)
        self.assertEqual(Record.objects.count(), 734)

    def test_update_db_matches(self):
        self.assertEqual(Matches.objects.count(), 0)
        Matches.update_db(settings.TEST_DIR / 'matches.csv')
        self.assertEqual(Matches.objects.count(), 10)


class FitTestCase(TestCase):
    def setUp(self):
        self.fit_file = "A6DM0211.FIT"
        self.fit_file2 = "2307215335.FIT"

    def test_copy_file(self):
        source = os.path.join(settings.TEST_DIR / 'watch', self.fit_file)
        destination = os.path.join(settings.TEST_DIR, self.fit_file)
        copied = copy_file(source, destination)
        self.assertTrue(copied)
        copied = copy_file(source, destination)
        self.assertFalse(copied)
        os.remove(destination)

    def test_fit_to_csv(self):
        source = os.path.join(settings.TEST_DIR / 'fit', self.fit_file2)
        destination = os.path.join(settings.TEST_DIR, "2307215335.csv")
        created = fit_to_csv(source, destination)
        self.assertTrue(created)
        created = fit_to_csv(source, destination)
        self.assertFalse(created)
        os.remove(destination)


class CalendarTestCase(TestCase):
    def setUp(self):
        self.calendar_dir = settings.TEST_DIR / 'calendar'
        self.calendar_files = ["C4HA5946.csv", "C4JI0358.csv"]
        service = authenticate_google_calendar_api()
        self.calendar = RunningCalendar(service)

    def test_add_and_remove_event_from_calendar(self):
        csv = os.path.join(self.calendar_dir, self.calendar_files[0])
        event = RunningEvent(csv=csv)
        self.assertTrue(self.calendar.is_in_calendar(event))
        self.assertTrue(self.calendar.remove_from_calendar(event))
        self.assertFalse(self.calendar.is_in_calendar(event))
        self.assertTrue(self.calendar.add_event_to_calendar(event))
        self.assertTrue(self.calendar.is_in_calendar(event))

    def test_add_dir_to_calendar(self):
        csv = os.path.join(self.calendar_dir, self.calendar_files[0])
        event = RunningEvent(csv=csv)
        self.assertTrue(self.calendar.remove_from_calendar(event))

        count = self.calendar.add_directory(self.calendar_dir)
        self.assertEqual(count, 1)
    
    def test_add_files_to_calendar(self):  
        csv = os.path.join(self.calendar_dir, self.calendar_files[0])
        event = RunningEvent(csv=csv)
        self.assertTrue(self.calendar.remove_from_calendar(event))

        files = [os.path.join(self.calendar_dir, file) for file in self.calendar_files]   
        count = self.calendar.add_files_to_calendar(files)
        self.assertEqual(count, 1)
