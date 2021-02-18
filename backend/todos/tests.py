from django.test import TestCase

# Create your tests here.

from channels.testing import WebsocketCommunicator
from todos.routing import websocket_urlpatterns

from channels.routing import URLRouter


class MyTests(TestCase):
    async def test_connection(self):
        application = URLRouter(websocket_urlpatterns)
        communicator = WebsocketCommunicator(application, "/ws/chat/testroomname/")

        connected, subprotocol = await communicator.connect()
        assert connected
        # # Test sending text
        # await communicator.send_to(text_data="hello")
        # response = await communicator.receive_from()
        # assert response == "hello"
        # # Close
        await communicator.disconnect()
