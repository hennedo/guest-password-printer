var request = require('request-json');

var Unifi = function(options) {
  var _default_options = {
    host: 'localhost',
    ssl: true,
    port: '8443',
    username: 'admin',
    password: 'password',
    site: 'default',
    selfSigned: true

  };
  if((!!options) && (options.constructor === Object))
    this.options = Object.assign(_default_options, options);
  else
    this.options = _default_options;

  this.connect();
};

// Setter
Unifi.prototype.setHost = function(host) {
  this.options.host = host;
  this.connect();
}
Unifi.prototype.setPort = function(port) {
  this.options.port = port;
  this.connect();
}

// "Privates"
Unifi.prototype.connect = function() {
  var s = 'http://';
  if(this.options.ssl)
    s = 'https://';
  this._client = request.createClient(s + this.options.host + ':' + this.options.port, {jar: true, agentOptions:{rejectUnauthorized: false}});
}

// "Publics"
Unifi.prototype.login = function(cb) {
  var req = {
    username: this.options.username,
    password: this.options.password
  }
  this._client.post('/api/login', req, function(err, res, body) {
    if(err)
      throw err;
    if(!(!!body.meta && !!body.meta.rc && body.meta.rc === 'ok')) {
      console.log(body);
      console.log("Unifi API: Invalid Login");
      validLogin = false;
      if(typeof(cb) === 'function')
        cb(false);
    }
    if(typeof(cb) === 'function')
      cb(true);
  })
}

Unifi.prototype.addGuestVoucher = function(amount, quota, time, cb) {
  var _this = this;
  var req = {
    cmd:"create-voucher",   // Command to create a voucher
    n:amount,               // Amount of created vouchers
    quota:quota,              // Times the code can be reused.
    expire:time            // Time one is valid, in Minutes
  }


  // first add the vouchers
  var addVoucher = function(cb) {
    _this._client.post("/api/s/" + _this.options.site + "/cmd/hotspot", req, function(err, res, body) {
      if(err)
        throw err;
      if(!(!!body.meta && !!body.meta.rc && body.meta.rc === 'ok')) {
        cb('something went wrong', null);
      }
      cb(null, body.data);
    })
  }
  // then get a list of all vouchers and take the last x of them matching the creation time got from the response of the creation.
  var getVoucher = function(data, cb) {
    _this._client.get("/api/s/" + _this.options.site + "/stat/voucher", function(err, res, body) {
      if(err)
        throw(err);
      if(!(!!body.meta && !!body.meta.rc && body.meta.rc === 'ok')) {
        cb('something went wrong', null);
      }
      var codes = body.data.splice(0,amount);
      cb(null, codes);
    })
  }

  addVoucher(function(err, res) {
    if(err)
      return cb(err, res);
    getVoucher(res, function(err, res) {
      cb(err, res);
    })
  })
}

module.exports = exports = Unifi;
