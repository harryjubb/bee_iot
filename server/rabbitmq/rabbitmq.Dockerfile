FROM rabbitmq:3.9.1-management

RUN apt-get update && \
apt-get install -y xxd && \
rm -rf /var/lib/apt/lists/*

RUN mkdir /conf
COPY rabbitmq-definitions.template.json /conf

COPY rabbitmq.conf /etc/rabbitmq/rabbitmq.conf

RUN mkdir /custom_entrypoint
COPY entrypoint.sh /custom_entrypoint
RUN chmod 755 /custom_entrypoint/entrypoint.sh

# Run Rabbit
ENTRYPOINT /custom_entrypoint/entrypoint.sh
