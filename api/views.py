from rest_framework import viewsets, permissions, generics
from api.serializers import SessionSerializer, RecordSerializer, LapSerializer, MatchSerializer
from app.models import Session, Record, Lap, Matches
from api.pagination import SmallPagination

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
    