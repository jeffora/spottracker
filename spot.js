var xml = require('xml2js'),
  http = require('http');

var options = {
  hostname: 'share.findmespot.com',
  path: '/messageService/guestlinkservlet?glId=0YaIAq9bVTnrpNmuDmB6QSkx5bsbl2MJz&completeXml=true',
  method: 'GET',
};

var req = http.request(options, function (res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  var resData = '';
  res.on('data', function (chunk) {
    resData = resData + chunk;
  });
  res.on('end', function () {
    var parser = new xml.Parser();
    parser.parseString(resData, function (err, result) {
      console.dir(result);
    })
  })
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

req.end();