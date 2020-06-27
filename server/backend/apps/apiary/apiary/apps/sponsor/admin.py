from django.contrib import admin
from apiary.apps.sponsor.models import Sponsor


@admin.register(Sponsor)
class SponsorAdmin(admin.ModelAdmin):
    pass
