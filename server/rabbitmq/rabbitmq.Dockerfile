FROM rabbitmq:3.9.1

RUN mkdir /conf
COPY rabbitmq-definitions.template.json /conf

COPY rabbitmq.conf /etc/rabbitmq/rabbitmq.conf

RUN mkdir /run
COPY entrypoint.sh /run
RUN chmod 755 /run/entrypoint.sh

# Run Rabbit
RUN /run/entrypoint.sh
