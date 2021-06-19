"""apiary URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings

from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView

admin.site.title = "Apiary Administration"
admin.site.site_header = "Apiary Administration"
admin.site.index_title = "Apiary Administration"

urlpatterns = [path("admin/", admin.site.urls),] + static(
    settings.MEDIA_URL, document_root=settings.MEDIA_ROOT
)

# GraphQL patterns
urlpatterns = urlpatterns + [
    path("graphql", csrf_exempt(GraphQLView.as_view(graphiql=settings.DEBUG))),
]
