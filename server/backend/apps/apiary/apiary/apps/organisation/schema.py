import graphene
from graphene_django.types import DjangoObjectType
from apiary.apps.organisation.models import Organisation


class OrganisationType(DjangoObjectType):
    class Meta:
        model = Organisation

    def resolve_logo(self, info):
        if self.logo:
            return info.context.build_absolute_uri(self.logo.url) if self.logo else None
        return None


class Query(object):
    pass
