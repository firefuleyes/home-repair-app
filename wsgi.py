import sys
import os

path = '/home/firefuleyes/home-repair-app'
if path not in sys.path:
    sys.path.append(path)

from app import app as application
