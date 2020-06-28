import graphene
from graphene_django.types import DjangoObjectType
from apiary.apps.organisation.models import Organisation


class OrganisationType(DjangoObjectType):
    class Meta:
        model = Organisation


class Query(object):
    pass
