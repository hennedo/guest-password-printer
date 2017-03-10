import RPi.GPIO as GPIO
import time
import os

#sets the Input Pin for your Button
#in this case it is GPIO24 or HardwarePin 19
buttonPin = 19
#sets GPIO Mode to use Hardware Pin Layout
GPIO.setmode(GPIO.BCM)
#sets GPIO Pin to INPUT mode with a Pull Down Resistor
GPIO.setup(buttonPin,GPIO.IN, pull_up_down=GPIO.PUD_DOWN)

while True:
#waits for Pin Input and then exectures the script below
    if (GPIO.input(buttonPin)):
#the script that will be executed (as root)
     os.system("node /home/pi/guest-password-printer/index.js")
