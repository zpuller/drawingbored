'use strict';

canvas.addEventListener('touchstart', handle_mousedown);
window.addEventListener('touchend', handle_mouseup);
canvas.addEventListener('mousedown', handle_mousedown); 
window.addEventListener('mouseup', handle_mouseup); 
window.addEventListener('keydown', handle_keypress); 
document.addEventListener('touchmove',function(event){ event.preventDefault(); }, false);

draw_canvas_background();

var is_mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

if (is_mobile)
{
  draw_clear_button();
  canvas.addEventListener('touchstart', handle_clear_button); 
}
else
{
  draw_help();
}

setInterval(send_heartbeat, 5000)
