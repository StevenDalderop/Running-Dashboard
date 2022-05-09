# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
import os 
from django.conf import settings
from cmd_tool.parse import parse_csv
import pandas as pd
from datetime import date

weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]


class Session(models.Model):
    index = models.AutoField(primary_key=True)
    start_time = models.DateTimeField(blank=True, null=True)
    end_time = models.DateTimeField(blank=True, null=True)
    start_position_lat = models.FloatField(blank=True, null=True)
    start_position_long = models.FloatField(blank=True, null=True)
    total_elapsed_time = models.FloatField(blank=True, null=True)
    total_distance = models.FloatField(blank=True, null=True)
    total_strides = models.FloatField(blank=True, null=True)
    total_calories = models.FloatField(blank=True, null=True)
    avg_speed = models.FloatField(blank=True, null=True)
    avg_heart_rate = models.FloatField(blank=True, null=True)
    max_heart_rate = models.FloatField(blank=True, null=True)
    num_laps = models.FloatField(blank=True, null=True)
    name = models.TextField(blank=True, null=True)
    avg_running_cadence = models.FloatField(blank=True, null=True)
    max_running_cadence = models.FloatField(blank=True, null=True)

    class Meta:
        db_table = 'session'

    def __str__(self):
        return f"Session {self.index}: {weekdays[self.start_time.weekday()]} {self.start_time.day}-{self.start_time.month}-{self.start_time.year}"

    def create_session(csv):
        df = parse_csv(csv)

        df_session = df[df["Message"] == "session"]
    
        row = df_session.iloc[0]

        session, created = Session.objects.get_or_create(
            start_time=row["start_time"],
            end_time=row["timestamp"],
            defaults = {
                "start_position_lat": row.get("start_position_lat"),
                "start_position_long": row.get("start_position_long"),
                "total_elapsed_time": row["total_elapsed_time"],
                "total_distance": row["total_distance"],
                "total_strides": row["total_strides"],
                "total_calories": row["total_calories"],         
                "avg_speed": row["avg_speed"],
                "avg_heart_rate": row["avg_heart_rate"],
                "max_heart_rate": row["max_heart_rate"],
                "num_laps": row["num_laps"],
                "name": row["name"],
                "avg_running_cadence": row["avg_running_cadence"],
                "max_running_cadence": row["max_running_cadence"]  
            }
        ) 

        return session, created      


class Lap(models.Model):
    index = models.AutoField(primary_key=True)
    start_time = models.DateTimeField(blank=True, null=True)
    end_time = models.DateTimeField(blank=True, null=True)
    start_position_lat = models.FloatField(blank=True, null=True)
    start_position_long = models.FloatField(blank=True, null=True)
    end_position_lat = models.FloatField(blank=True, null=True)
    end_position_long = models.FloatField(blank=True, null=True)
    total_elapsed_time = models.FloatField(blank=True, null=True)
    total_distance = models.FloatField(blank=True, null=True)
    total_strides = models.FloatField(blank=True, null=True)
    total_calories = models.FloatField(blank=True, null=True)
    avg_speed = models.FloatField(blank=True, null=True)
    avg_heart_rate = models.FloatField(blank=True, null=True)
    max_heart_rate = models.FloatField(blank=True, null=True)
    avg_running_cadence = models.FloatField(blank=True, null=True)
    max_running_cadence = models.FloatField(blank=True, null=True)
    session_index = models.ForeignKey(Session, on_delete=models.CASCADE)

    class Meta:
        db_table = 'lap'

    def __str__(self):
        return f"Lap {self.index}: {weekdays[self.start_time.weekday()]} {self.start_time.day}-{self.start_time.month}-{self.start_time.year}"

    def create_laps(csv):
        df = parse_csv(csv)

        df_lap = df[df["Message"] == "lap"]

        filename = df_lap["name"].iloc[0]
        
        session = Session.objects.filter(name = filename)

        if session.count() == 0:
            raise IndexError("Session must be created first")
        else:
            session = session[0]

        for _, row in df_lap.iterrows():
            lap, created = Lap.objects.get_or_create(
                start_time=row["start_time"],
                end_time=row["timestamp"],
                defaults = {
                    "start_position_lat": row.get("start_position_lat"),
                    "start_position_long": row.get("start_position_long"),
                    "end_position_lat": row.get("end_position_lat"),
                    "end_position_long": row.get("end_position_long"),
                    "total_elapsed_time": row["total_elapsed_time"],
                    "total_distance": row["total_distance"],
                    "total_strides": row["total_strides"],
                    "total_calories": row["total_calories"],         
                    "avg_speed": row["avg_speed"],
                    "avg_heart_rate": row["avg_heart_rate"],
                    "max_heart_rate": row["max_heart_rate"],
                    "avg_running_cadence": row["avg_running_cadence"],
                    "max_running_cadence": row["max_running_cadence"],
                    "session_index": session    
                }   
            )            


class Record(models.Model):
    index = models.AutoField(primary_key=True)
    timestamp = models.DateTimeField(blank=True, null=True)
    position_lat = models.FloatField(blank=True, null=True)
    position_long = models.FloatField(blank=True, null=True)
    distance = models.FloatField(blank=True, null=True)
    speed = models.FloatField(blank=True, null=True)
    heart_rate = models.FloatField(blank=True, null=True)
    cadence = models.FloatField(blank=True, null=True)
    session_index = models.ForeignKey(Session, on_delete=models.CASCADE)
    
    class Meta:
        db_table = 'record'
        
    def __str__(self):
        return f"Record {self.index}: {weekdays[self.timestamp.weekday()]} {self.timestamp.day}-{self.timestamp.month}-{self.timestamp.year}"

    def create_records(csv):
        df = parse_csv(csv)
        df_record = df[df["Message"] == "record"]

        filename = df_record["name"].iloc[0]

        session = Session.objects.filter(name = filename)
        if session.count() == 0:
            raise IndexError("Session object must be created first")
        else:
            session = session[0]

        Record.objects.filter(session_index = session).delete() 
        
        records = (Record( 
            timestamp=row["timestamp"],
            position_lat=row.get("position_lat"),
            position_long=row.get("position_long"),
            distance=row["distance"],
            speed=row["speed"],
            heart_rate=row["heart_rate"],
            cadence=row["cadence"],            
            session_index=session
            ) for index, row in df_record.iterrows())
        Record.objects.bulk_create(records)


class Matches(models.Model):
    index = models.BigIntegerField(blank=True, primary_key=True)
    date = models.DateField(blank=True, null=True)
    distance = models.FloatField(blank=True, null=True)
    time = models.TextField(blank=True, null=True)
    name = models.TextField(blank=True, null=True)
    isRecord = models.BooleanField(default=False)
    
    class Meta: 
        db_table = 'match'
        
    def __str__(self):
        return f"Match {self.index}"

    def update_db(csv):
        df_matches = pd.read_csv(csv, sep=";")
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
        return count_created


class Training(models.Model):
    index = models.IntegerField(primary_key=True)
    year = models.IntegerField(blank=True, null=True)
    quarter = models.IntegerField(blank=True, null=True)
    week = models.IntegerField(blank=True, null=True)
    training_nr = models.IntegerField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    completed = models.BooleanField(default=False)

    class Meta: 
        db_table = 'training' 

    def __str__(self):
        return f"{self.year} Q:{self.quarter} W:{self.week} nr:{self.training_nr} completed: {self.completed} {self.description}"

    def update_db(csv):
        df = pd.read_csv(csv, sep=";")
        count_created = 0
        for index, row in df.iterrows():
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
        return count_created


class Article(models.Model):
    pub_date = models.DateTimeField(auto_now_add=True)
    headline = models.CharField(max_length=200)
    content = models.TextField()

    def __str__(self):
        return f"{self.pub_date}: {self.headline}"
