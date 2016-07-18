'use strict';

var draw_mode = 'pen';

function handle_mousemove_draw(event)
{
  update_pos(event, click);
  var size = 10;
  var color = beige;
  var gap = 1;

  draw_line(last_click, click, size, color, gap);
  send_draw_line(last_click, click, size, color, gap);

  last_click.x = click.x;
  last_click.y = click.y;
}

function handle_mousemove_erase(event)
{
  update_pos(event, click);
  var size = 100;
  var gap = size; 
  var color = black;
  var from = {};
  from.x = last_click.x - size/2; 
  from.y = last_click.y - size/2; 
  var to = {}
  to.x = click.x - size/2; 
  to.y = click.y - size/2; 

  draw_line(from, to, size, color, gap);
  send_draw_line(from, to, size, color, gap);

  last_click.x = click.x;
  last_click.y = click.y;
}

function handle_keypress(event)
{
  var key = event.key;
  if (key == 't')
    draw_mode = 'text';
  else if (key == 'p')
    draw_mode = 'pen';
  else if (key == 'e')
    draw_mode = 'erase';
  else if (key == 'c')
  {
    draw_canvas_background();
    send_draw_canvas_background();
  }
}

function handle_typing(event)
{
  var key = event.key;
  if (key == 'Escape' || key == 'Enter')
    stop_typing();
  else if (
      key == 'Shift' ||
      key == 'CapsLock' ||
      key == 'Tab' ||
      key == 'Control' ||
      key == 'Meta' ||
      key == 'Alt' ||
      key == 'Backspace')
  {
    return;
  }
  else
  {
    var width = draw_letter(key, text_cursor);
    send_draw_letter(key, text_cursor);
    text_cursor.x += width;
  }
}

function start_drawing(event)
{
  update_pos(event, last_click);
  var handler = draw_mode == 'erase' ? handle_mousemove_erase : handle_mousemove_draw;
  handler(event);
  canvas.addEventListener('mousemove', handler); 
  canvas.addEventListener('touchmove', handler);
}

function start_typing(event)
{
  update_pos(event, text_cursor);
  window.removeEventListener('keydown', handle_keypress);
  window.addEventListener('keydown', handle_typing);
  canvas.removeEventListener('mousedown', handle_mousedown); 
}

function stop_typing(event)
{
  window.removeEventListener('keydown', handle_typing);
  window.addEventListener('keydown', handle_keypress);
  canvas.addEventListener('mousedown', handle_mousedown); 
}

function handle_mousedown(event)
{
  var left_click = event.which == 1 || event.which == 0;
  if (left_click)
  {
    if (draw_mode == 'pen' || draw_mode == 'erase')
      start_drawing(event);
    else if (draw_mode == 'text')
      start_typing(event);
  }
}

function handle_mouseup(event)
{
  canvas.removeEventListener('mousemove', handle_mousemove_draw);
  canvas.removeEventListener('mousemove', handle_mousemove_erase);
  canvas.removeEventListener('touchmove', handle_mousemove_draw);
  canvas.removeEventListener('touchmove', handle_mousemove_erase);
}
