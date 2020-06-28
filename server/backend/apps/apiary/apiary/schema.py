import graphene
import apiary.apps.hive.schema
import apiary.apps.organisation.schema


class Query(
    apiary.apps.hive.schema.Query,
    apiary.apps.organisation.schema.Query,
    graphene.ObjectType,
):
    pass


schema = graphene.Schema(query=Query)
