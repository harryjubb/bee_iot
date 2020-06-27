import graphene
import apiary.apps.hive.schema
import apiary.apps.sponsor.schema


class Query(
    apiary.apps.hive.schema.Query, apiary.apps.sponsor.schema.Query, graphene.ObjectType
):
    pass


schema = graphene.Schema(query=Query)
