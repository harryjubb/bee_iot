import graphene
from graphql import GraphQLError
from graphene_django.types import DjangoObjectType
from apiary.apps.hive.models import Hive


class HiveType(DjangoObjectType):
    class Meta:
        model = Hive


class Query(object):
    all_hives = graphene.List(HiveType, description="Retrieve a list of all hives")
    hive = graphene.Field(
        HiveType,
        hive_id=graphene.String(description="Unique internal ID of the hive"),
        hive_uid=graphene.String(description="External (shared between services) unique ID of the hive"),
        hive_url_name=graphene.String(description="Unique URL identifier of the hive"),
        description="Retrieve a single hive by an identifier. One and only one kind of identifier must be specified"
    )

    def resolve_all_hives(self, info, **kwargs):
        return Hive.objects.all()

    def resolve_hive(self, info, hive_id=None, hive_uid=None, hive_url_name=None, **kwargs):
        if len([identifier for identifier in [hive_id, hive_uid, hive_url_name] if identifier]) != 1:
            raise GraphQLError("One and only one kind of identifier must be specified")

        if hive_id:
            return Hive.objects.get(id=hive_id)
        
        if hive_uid:
            return Hive.objects.get(uid=hive_uid)
        
        if hive_url_name:
            return Hive.objects.get(url_name=hive_url_name)