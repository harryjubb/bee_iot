FROM linuxserver/letsencrypt

# Required for envsubstr
RUN apk add gettext

COPY entrypoint.sh /run/entrypoint.sh

ENTRYPOINT ["sh", "/run/entrypoint.sh"]