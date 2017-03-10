var SerialPort = require('serialport'),
    serialPort = new SerialPort('/dev/ttyS1', {
        baudRate: 19200
    }),
    Printer = require('thermalprinter');

// either set environment variables (recommended) or delete until _here_
if(!process.env.PASSWORD || !process.env.USERNAME || !process.env.HOST || !process.env.SSID) {
  console.log("Please set the Environment Variables PASSWORD, USERNAME and HOST to your controller credentials and tell us with SSID the SSID of your wifi");
  process.exit(1);
}
//_here
// and set the variables manually here
var config = {
  username: process.env.USERNAME, // username: "niceuser1",
  password: process.env.PASSWORD, // password: "secretpassword43",
  host: process.env.HOST, // host: "www.myunificontroller.gov",
  ssid: process.env.SSID // ssid: "myssid"
}

var Unifi = require('unifi-api');
//var Ruckus = require('./ruckus.js'); // ruckus coming later.

var api = new Unifi(config);
var printer;

function generateCode() {
  api.login(function(d) {
    api.addGuestVoucher(1, 1, 1440, function(err, codes) {
      var code = codes[0].code;
      code = code.substring(0,5) + '-' + code.substring(5, 10);
      printCode(code);
    })
  });
}

// feel free to change what it prints ;)
function printCode(code) {
  printer
      .center()
      .printLine('=====================')
      .printLine('WLAN: ' + config.ssid)
      .printLine('+++++++++++++++++++++')
      .printLine('Code: ' + code)
      .printLine('+++++++++++++++++++++')
      .printLine('Viel spaß... und mach keinen unsinn!')
      .printLine('--------------------')
      .horizontalLine()
      .lineFeed(3)
      .print(function() {
          console.log('done');
          process.exit();
      });
}

serialPort.on('open',function() {
    printer = new Printer(serialPort);
    generateCode();
});
