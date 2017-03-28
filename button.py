import RPi.GPIO as GPIO
import time
import os

from optparse import OptionParser

# Parse input arguments
parser = OptionParser()
parser.add_option("-t", "--testGPIO", action="store_true", help="Test GPIO connection, does not call the JS script.")

# The option --pin sets the Input Pin for your Button
# It default to GPIO24 or HardwarePin 19
parser.add_option("-p", "--pin", dest="pin", help="GPIO pin to use. If not provided it defaults to HardwarePin 19.", default=19)

(options, args) = parser.parse_args()

testingGPIO = options.testGPIO != None
buttonPin = options.pin 

#sets GPIO Mode to use Hardware Pin Layout
GPIO.setmode(GPIO.BCM)
#sets GPIO Pin to INPUT mode with a Pull Down Resistor
GPIO.setup(buttonPin,GPIO.IN, pull_up_down=GPIO.PUD_DOWN)

if(testingGPIO):
  print "Press the connected button. If you are pressing but you do not see any further output then....there is something wrong with the connection."

while True:
#waits for Pin Input and then exectures the script below
  if (GPIO.input(buttonPin)):
    if (testingGPIO):
      print "PIN " + buttonPin + " works correctly."
      continue
    #the script that will be executed (as root)
    os.system("node index.js")
