# guest-password-printer

This project uses a thermalprinter, which is connected via Serial, to print out guest passes for Ubiquiti Unifi enabled wireless networks.
We use this one: https://www.adafruit.com/product/597 - but you can use any, if the protocols are the same.

## Installation

### Node part
This Project uses Node 6.10.0, so you have to install this
Use either [NVM](https://github.com/creationix/nvm) or follow the Docs at https://nodejs.org/en/ to install Node and NPM.
Once you installed Node do ```npm install```. This will install the needed libs and you are ready to go.

You propably need to adjust the Serialport used. Just change line 2 in index.js to your corresponding port. The one used, is the correct one for the raspberrypi zero.

### Python part
TODO

## Usage
The button.py script, listens for buttonpresses on GPIO Pin 19 on a Raspberrypi Zero or compatible and then runs the Node script, if the button is pressed.
Example: 
```
# export USER=unifiuser;
# export PASSWORD=unifiuserpassword;
# export HOST=unificontrollerhost
# python button.py
```
Or replace ```python button.py``` with ```node index.js``` if you just want to print a code.
