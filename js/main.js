'use strict';

var is_mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

canvas.addEventListener('touchstart', handle_mousedown);
window.addEventListener('touchend', handle_mouseup);
canvas.addEventListener('mousedown', handle_mousedown);
window.addEventListener('mouseup', handle_mouseup);
window.addEventListener('keydown', handle_keypress);
document.addEventListener('touchmove', function (event) { event.preventDefault(); }, false);
colors.addEventListener('mousedown', handle_colors);

draw_canvas_background();

// if (is_mobile) {
//   draw_clear_button();
//   canvas.addEventListener('touchstart', handle_buttons);
// }
// else {
//   draw_help();
// }

var HOST = location.origin.replace(/^http/, 'ws')
var ws = new WebSocket(HOST);
var p = window.location.pathname;

ws.onopen = function () { send_update_password(p) };
ws.onmessage = function (event) { parse_msg(event.data) };

setInterval(send_heartbeat, 5000);
