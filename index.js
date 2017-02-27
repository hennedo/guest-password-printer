var SerialPort = require('serialport'),
    serialPort = new SerialPort('/dev/ttyS1', {
        baudRate: 19200
    }),
    Printer = require('thermalprinter');


var Unifi = require('unifi-api');
//var Ruckus = require('./ruckus.js');

var api = new Unifi({
  password: 'xxxxxx',
  username: 'henne',
  host: '10.211.55.4'
});
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


function printCode(code) {
  printer
      .center()
      .printLine('=====================')
      .printLine('WLAN: Drunken Records')
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

setTimeout(function() {
 //generateCode();
 printCode("test")
}, 1000);

serialPort.on('open',function() {
    printer = new Printer(serialPort);
});
