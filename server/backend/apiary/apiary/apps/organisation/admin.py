from django.contrib import admin
from apiary.apps.organisation.models import Organisation


@admin.register(Organisation)
class OrganisationAdmin(admin.ModelAdmin):
    pass
