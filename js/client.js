'use strict';

function send_update_password(p) {
  var arr = [];
  arr.push('update_password');
  arr.push(p);
  var msg = arr.join(':');
  ws.send(msg);
}

function send_heartbeat() {
  ws.send('ping');
}

function parse_msg(msg) {
  var arr = msg.split(':');
  if (arr[0] == 'draw_line')
    handle_draw_line_msg(arr);
  else if (arr[0] == 'draw_letter')
    handle_draw_letter_msg(arr);
  else if (arr[0] == 'draw_canvas_background')
    draw_canvas_background();
}

function handle_draw_line_msg(arr) {
  var from = { x: arr[1], y: arr[2] };
  var to = { x: arr[3], y: arr[4] };
  var size = arr[5];
  var color = arr[6].split(',');
  var gap = arr[7];
  draw_line(from, to, size, color, gap);
}

function send_draw_line(from, to, size, color, gap) {
  var arr = [];
  arr.push('draw_line');
  arr.push(from.x);
  arr.push(from.y);
  arr.push(to.x);
  arr.push(to.y);
  arr.push(size);
  arr.push(color);
  arr.push(gap);
  var msg = arr.join(':');
  ws.send(msg);
}

function handle_draw_letter_msg(arr) {
  var key = arr[1];
  var pos = { x: arr[2], y: arr[3] };
  draw_letter(key, pos);
}

function send_draw_letter(key, pos) {
  var arr = [];
  arr.push('draw_letter');
  arr.push(key);
  arr.push(pos.x);
  arr.push(pos.y);
  var msg = arr.join(':');
  ws.send(msg);
}

function send_draw_canvas_background() {
  var msg = 'draw_canvas_background';
  ws.send(msg);
}
