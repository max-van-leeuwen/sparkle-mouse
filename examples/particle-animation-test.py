# Continuously draw a heart shape using HTTP API ❤️

import math
import subprocess
import time
import sys
import requests

subprocess.Popen(['sparkle-mouse']) # start Sparkle Mouse (if not open already)
API_URL = 'http://127.0.0.1:58008' # Sparkle Mouse API

try: # catching keyboard interrupts

    while True:
        try:
            requests.post(f'{API_URL}/cursor-tracking', json=False, timeout=1) # disable cursor tracking
            requests.post(f'{API_URL}/spawning', json=True, timeout=1) # enable spawning

            # draw a heart shape
            NUM_POINTS = 60
            SCALE = 300
            CENTER = 500
            for i in range(NUM_POINTS):

                # heart equation
                t = (i / NUM_POINTS) * 2 * math.pi
                normX = math.sin(t)**3
                normY = 0.625 * math.cos(t) - 0.3125 * math.cos(2*t) - 0.125 * math.cos(3*t) - 0.0625 * math.cos(4*t)
                x = int(normX*SCALE + CENTER)
                y = int(-normY*SCALE + CENTER)
                
                # send to Sparkle Mouse
                requests.post(f'{API_URL}/draw', json={'x': x, 'y': y}, timeout=1)
                time.sleep(.05) # await next point

            # pause between cycles
            requests.post(f'{API_URL}/spawning', json=False, timeout=1) # disable spawning until next shape starts
            time.sleep(0.5) # await next shape

        except requests.exceptions.RequestException as e:
            print(f"API request failed: {e}")

except KeyboardInterrupt:

    try:
        requests.post(f'{API_URL}/cursor-tracking', json=True, timeout=1) # re-enable cursor tracking
        requests.post(f'{API_URL}/spawning', json=True, timeout=1) # re-enable spawning
    except requests.exceptions.RequestException:
        print(f"API request failed: {e}")

    sys.exit(0)