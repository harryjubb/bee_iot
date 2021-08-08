import uuid
from django.db import models


class Hive(models.Model):
    """
    Manages the metadata relating to a physical hive.
    """

    # Primary key ID using a UUID
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    uid = models.CharField(
        max_length=1024,
        unique=True,
        help_text="Unique hive ID",
    )

    name = models.CharField(max_length=1024, help_text="Human-friendly hive name")

    slug = models.CharField(
        max_length=1024,
        unique=True,
        help_text="Short human and URL-friendly name used for the hive's URL",
    )

    active = models.BooleanField(
        help_text="Determines if this hive should be accessible publicly"
    )

    # TODO: Basic location information

    # Sponsor
    sponsor = models.ForeignKey(
        "organisation.Organisation",
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        help_text="Sponsoring organisation of this hive",
    )

    # AV streaming data
    stream_key = models.CharField(
        max_length=1024, help_text="AV stream name for this hive", null=True, blank=True
    )

    stream_active = models.BooleanField(
        help_text="Determines if this hive's stream should be accessible publicly"
    )

    # Sensor dashboard data
    dashboard_url = models.URLField(
        null=True,
        blank=True,
        help_text="URL of the Grafana dashboard template to display sensor data for this hive",
    )

    dashboard_active = models.BooleanField(
        help_text="Determines if this hive's dashboard should be accessible publicly through the apiary interface"
    )

    def __str__(self):
        return f"{self.name}{' (inactive)' if not self.active else ''}"
