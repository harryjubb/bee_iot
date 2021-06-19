FROM tiangolo/nginx-rtmp

RUN apt-get update && apt-get install -y gettext-base

COPY nginx.conf.template /templates/nginx.conf.template

COPY entrypoint.sh /custom_entrypoint/entrypoint.sh

RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log

ENTRYPOINT ["sh", "/custom_entrypoint/entrypoint.sh"]
