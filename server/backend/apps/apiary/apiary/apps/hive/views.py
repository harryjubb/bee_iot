from apiary.apps.hive.models import Hive
from apiary.apps.hive.serializers import HiveSerializer
from rest_framework import generics


class HiveList(generics.ListCreateAPIView):
    queryset = Hive.objects.all()
    serializer_class = HiveSerializer


class HiveDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Hive.objects.all()
    serializer_class = HiveSerializer