import uuid
from django.db import models

SPONSORSHIP_LEVELS = (
    ("BRONZE", "Bronze"),
    ("SILVER", "Silver"),
    ("GOLD", "Gold"),
    ("PLATINUM", "Platinum"),
)


class Sponsor(models.Model):
    """
    An organisation sponsoring one or more hives.
    """

    # Primary key ID using a UUID
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    name = models.CharField(max_length=1024, help_text="Organisation name")
    logo = models.ImageField(
        upload_to="logos",
        null=True,
        blank=True,
        help_text="Image of the logo of the sponsor",
    )

    sponsorship_level = models.CharField(
        max_length=10,
        choices=SPONSORSHIP_LEVELS,
        null=True,
        blank=True,
        help_text="Sponsorship level of the sponsor",
    )

    def __str__(self):
        return f"{self.name} ({self.sponsorship_level})"
