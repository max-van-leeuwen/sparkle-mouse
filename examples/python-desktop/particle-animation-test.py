# Continuously draw a heart shape using HTTP API ❤️
# Switches between 'spinning' values to show how /parameters can change the look of particles on runtime.
# Uses a short spawning cooldown period for a graceful switch.

import math
import subprocess
import time
import sys
import requests

# subprocess.Popen(['sparkle-mouse', '--headless']) # start Sparkle Mouse (if not open already)
# TODO delete next line, uncomment previous! local testing only
subprocess.Popen(['/Users/max/Desktop/Sparkle Mouse/Project/Git/sparkle-mouse/src-tauri/target/release/sparkle-mouse', '--headless'])
API_URL = 'http://127.0.0.1:58008' # Sparkle Mouse API

SPINNING_VALUES = [0, 1]
spinning_index = 0

# particle settings
PARTICLE_SETTINGS = {
    'amount': 0.72,
    'radius': 0.11,
    'life': 0.9,
    'size': 0.23,
    'mouse-state': 'move',
    'translucent': False,
    'spinning': 0, # overwritten by spinning animation
    'align': False,
    'turbulence': 0.09,
    'glide': True,
    'outwards': 0,
    'grow': True,
    'shrink': True,
    'fade': False,
    'bouncy': True,
    'glittery': True,
    'flip': False,
    'image-speed': 0,
    'image-play-from-start': False,
    'image-count': [1],
    'image-cycles': [0],
    'image-data': 'image:sparkles'
}

# wait for server to be ready
for attempt in range(10):
    try:
        requests.get(f'{API_URL}/', timeout=1)
        break
    except requests.exceptions.RequestException:
        time.sleep(0.5)

try: # catching keyboard interrupts

    requests.post(f'{API_URL}/cursor-tracking', json=False, timeout=1) # disable cursor tracking
    
    while True:
        try:
            # set particle settings
            params = {**PARTICLE_SETTINGS, 'spinning':SPINNING_VALUES[spinning_index]} # set animated spinning value
            requests.post(f'{API_URL}/parameters', json=params, timeout=1)
            requests.post(f'{API_URL}/spawning', json=True, timeout=1) # enable spawning

            # draw a heart shape
            for cycle in range(2):
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

                time.sleep(0.5) # pause between cycles

            # gracefully switch
            requests.post(f'{API_URL}/spawning', json=False, timeout=1) # disable spawning
            time.sleep(2.3) # wait for particles to clear
            spinning_index = (spinning_index + 1) % len(SPINNING_VALUES)

        except requests.exceptions.RequestException as e:
            print(f"API request failed: {e}")
            sys.exit(0)

except KeyboardInterrupt:

    try:
        requests.post(f'{API_URL}/cursor-tracking', json=True, timeout=1) # re-enable cursor tracking
        requests.post(f'{API_URL}/spawning', json=True, timeout=1) # re-enable spawning
    except requests.exceptions.RequestException:
        print(f"API request failed: {e}")

    sys.exit(0)