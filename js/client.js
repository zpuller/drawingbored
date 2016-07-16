'use strict';

var HOST = location.origin.replace(/^http/, 'ws')
var ws = new WebSocket(HOST);

ws.onmessage = function (event) {
  console.log("recv'd data");
  console.log(event.data);
};
