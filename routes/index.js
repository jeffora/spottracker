var http = require('http'),
  xml2js = require('xml2js');

exports.index = function(req, res){
  res.render('index', { title: 'Spot' });
};

exports.indexPost = function(req, res) {
  var match = /glId=([A-Za-z0-9]+)/.exec(req.body.spot_url);
  if (match === null) {
    res.redirect('/');
    return;
  }

  res.redirect('/spot/' + match[1]);
}

exports.spot = function (req, res) {
  if (req.params.id === undefined){
    res.redirect('/');
    return;
  }

  var servData = '';

  http.get('http://share.findmespot.com/messageService/guestlinkservlet?glId=' + req.params.id + '&completeXml=true',
    function (spotRes) {
      spotRes.setEncoding('utf8');
      spotRes.on('data', function (chunk) {
        servData = servData + chunk;
      });
      spotRes.on('end', function () {
        var parser = new xml2js.Parser();
        parser.parseString(servData, function (err, parseRes) {
          console.log(parseRes);
          console.log(JSON.stringify(parseRes));
          res.render('spot', {
            title: 'Spot',
            id: req.params.id,
            data: JSON.stringify(parseRes),
          });
        });
      });
    });
}

var findmespot = function (res) {
  res.setEncoding('utf8');
  res.on('data', function(chunk) {

  });
}