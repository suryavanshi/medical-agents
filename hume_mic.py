import os
import asyncio
from hume import HumeVoiceClient, MicrophoneInterface
from dotenv import load_dotenv
load_dotenv()

async def main() -> None:
  # Paste your Hume API key here
  HUME_API_KEY = os.getenv("HUME_API_KEY")
  print("key:",HUME_API_KEY)
  # Connect and authenticate with Hume
  client = HumeVoiceClient(HUME_API_KEY)
  # Start streaming EVI over your device's microphone and speakers
  async with client.connect() as socket:
      await MicrophoneInterface.start(socket)
asyncio.run(main())