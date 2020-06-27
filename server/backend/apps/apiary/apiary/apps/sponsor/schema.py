import graphene
from graphene_django.types import DjangoObjectType
from apiary.apps.sponsor.models import Sponsor


class SponsorType(DjangoObjectType):
    class Meta:
        model = Sponsor


class Query(object):
    pass
