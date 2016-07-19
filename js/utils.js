'use strict';

function update_pos(event, obj)
{
  if (event.targetTouches)
  {
    var ipadX = event.targetTouches[0].pageX;
    var ipadY = event.targetTouches[0].pageY;
  }
  obj.x = Math.floor(canvas.width * ((event.offsetX || ipadX) / canvas.clientWidth));
  obj.y = Math.floor(canvas.height * ((event.offsetY || ipadY) / canvas.clientHeight));
}

function clear_screen()
{
  draw_canvas_background();
  send_draw_canvas_background();
}

function add_password_input()
{
  password_input.type = 'text';
  password_input.oninput = handle_password_input;
  password_input.addEventListener('keyup', handle_password_keyup);
  password_input.addEventListener('focus', handle_password_input_focus);
  document.body.appendChild(password_input);
}
