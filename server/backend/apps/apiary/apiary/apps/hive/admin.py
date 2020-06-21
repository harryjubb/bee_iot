from django.contrib import admin
from apiary.apps.hive.models import Hive

@admin.register(Hive)
class HiveAdmin(admin.ModelAdmin):
    pass