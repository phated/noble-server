var noble = require('noble');

var engine = require('engine.io')
  , server = engine.listen(8080)


console.log('noble');

// noble.on('stateChange', function(state) {
//   console.log('on -> stateChange: ' + state);

//   if (state === 'poweredOn') {
//     noble.startScanning(null, true);
//   } else {
//     noble.stopScanning();
//   }
// });

noble.on('scanStart', function() {
  // console.log('on -> scanStart');
  console.log('\n');
});

noble.on('scanStop', function() {
  // console.log('on -> scanStop');
  console.log('\n');
});

var keyMap = {
  0: null,
  32: 2,
  4: 3,
  128: 4,
  16: 5,
  2: 6,
  64: 7,
  8: 8,
  1: 9
}

server.on('connection', function (socket) {
  noble.startScanning(null, true);

  var date = Date.now();
  noble.on('peripheralDiscover', function(peripheral) {
    // console.log('on -> peripheralDiscover: ' + peripheral);
    var keyCode = peripheral.advertisement.serviceData[1][0];
    var key = keyMap[keyCode];
    console.log(key);
    var newDate = Date.now();
    console.log(newDate - date);
    date = newDate;
    socket.send(key);
  });

  socket.on('close', function(){
    noble.stopScanning();
  })
});
