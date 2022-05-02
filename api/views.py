from rest_framework import viewsets, permissions, generics, status
from api.serializers import SessionSerializer, RecordSerializer, LapSerializer, MatchSerializer, TrainingSerializer
from app.models import Session, Record, Lap, Matches, Training
from rest_framework.views import APIView
from rest_framework.response import Response
from api.pagination import UnpaginatedTable

# Create your views here.
class SessionViewSet(viewsets.ModelViewSet):
    queryset = Session.objects.all().order_by('-end_time')
    serializer_class = SessionSerializer
    permission_classes = [permissions.IsAuthenticated]

class RecordViewSet(viewsets.ModelViewSet):
    queryset = Record.objects.all().order_by('-timestamp')
    serializer_class = RecordSerializer
    permission_classes = [permissions.IsAuthenticated]
    
class MatchViewSet(viewsets.ModelViewSet):
    queryset = Matches.objects.all().order_by('-date')
    serializer_class = MatchSerializer
    permission_classes = [permissions.IsAuthenticated]
    
class LapViewSet(viewsets.ModelViewSet):
    queryset = Lap.objects.all().order_by('-end_time')
    serializer_class = LapSerializer
    permission_classes = [permissions.IsAuthenticated] 
    
class getSessionLaps(generics.ListAPIView):
    serializer_class = LapSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Lap.objects.filter(session_index=self.kwargs['id'])

class getSessionRecords(generics.ListAPIView):
    serializer_class = RecordSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Record.objects.filter(session_index=self.kwargs['id'])
   
class getTrainings(generics.ListAPIView):
    queryset = Training.objects.all().order_by('index')
    serializer_class = TrainingSerializer
    permission_classes = [permissions.IsAuthenticated]
    
class updateTraining(generics.RetrieveUpdateAPIView):
    queryset = Training.objects.all()
    serializer_class = TrainingSerializer
    permission_classes = [permissions.IsAuthenticated]
    
