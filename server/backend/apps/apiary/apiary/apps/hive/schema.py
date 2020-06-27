import graphene
from graphene_django.types import DjangoObjectType
from apiary.apps.hive.models import Hive


class HiveType(DjangoObjectType):
    class Meta:
        model = Hive


class Query(object):
    all_hives = graphene.List(HiveType)

    def resolve_all_hives(self, info, **kwargs):
        return Hive.objects.all()
