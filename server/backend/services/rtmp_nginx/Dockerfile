FROM tiangolo/nginx-rtmp

RUN apt-get update && apt-get install -y gettext-base

COPY nginx.conf.template /templates/nginx.conf.template

COPY entrypoint.sh /custom_entrypoint/entrypoint.sh

ENTRYPOINT ["sh", "/custom_entrypoint/entrypoint.sh"]