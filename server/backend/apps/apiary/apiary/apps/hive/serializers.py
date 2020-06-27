from rest_framework import serializers
from apiary.apps.hive.models import Hive

class HiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hive
        fields = [
            'id', 'uid', 'name', 'logo', 'active', 'stream_key', 'stream_active'
        ]