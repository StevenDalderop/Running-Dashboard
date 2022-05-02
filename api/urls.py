from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'sessions', views.SessionViewSet)
router.register(r'records', views.RecordViewSet)
router.register(r'laps', views.LapViewSet)
router.register(r'matches', views.MatchViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('training', views.getTrainings.as_view()),
    path('training/<int:pk>', views.updateTraining.as_view()),
    path('sessions/<int:id>/laps', views.getSessionLaps.as_view()),
    path('sessions/<int:id>/records', views.getSessionRecords.as_view()),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]