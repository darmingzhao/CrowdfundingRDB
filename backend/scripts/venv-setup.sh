#!/bin/bash

# This script creates a virutal environment and installs dependencies

python3 -m venv venv
source venv/bin/activate
pip install flask
deactivate
