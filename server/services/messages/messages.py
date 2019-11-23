from emitter import Client
import json
import os


def on_connect():
    print("Connected to Emitter broker")


def on_disconnect():
    print("Disconnected from Emitter broker")


def on_presence(presence):
    print(f"Presence message: {str(presence)}")


def on_message(message):
    print(
        f'"Message received on default handler, destined to {message.channel}: {message.as_string()}'
    )


def on_error(error):
    print(f"Error received: {str(error)}")


def on_me(me):
    print(f"Information about Me received: {str(me)}")


if __name__ == "__main__":

    print("Starting messages service")

    emitter = Client()

    emitter.connect("emitter", port=8080, secure=False)

    emitter.on_connect = on_connect
    emitter.on_disconnect = on_disconnect
    emitter.on_presence = on_presence
    emitter.on_message = on_message
    emitter.on_error = on_error
    emitter.on_me = on_me

    emitter.me()
    emitter.subscribe(key=os.environ["MESSAGES_ALL_HIVES_KEY"], channel="hive/+")

    try:
        emitter.loop_forever()
    except KeyboardInterrupt as error:
        emitter.loop_stop()
        emitter.disconnect()
        raise error
