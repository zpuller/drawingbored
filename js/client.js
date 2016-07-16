'use strict';

var HOST = location.origin.replace(/^http/, 'ws')
var ws = new WebSocket(HOST);

ws.onmessage = function (event) {
  parse_msg(event.data);
};

function parse_msg(msg)
{
  var arr = msg.split(':');
  if (arr[0] == 'draw_line')
    handle_draw_line_msg(arr);
}

function handle_draw_line_msg(arr)
{
  var from = { x: arr[1], y: arr[2] };
  var to = { x: arr[3], y: arr[4] };
  var size = arr[5];
  var color = arr[6].split(',');
  draw_line(from, to, size, color);
}

function send_draw_line(from, to, size, color)
{
  var arr = [];
  arr.push('draw_line');
  arr.push(from.x);
  arr.push(from.y);
  arr.push(to.x);
  arr.push(to.y);
  arr.push(size);
  arr.push(color);
  var msg = arr.join(':');
  ws.send(msg);
}
