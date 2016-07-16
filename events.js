var draw_mode = "pen";

function handle_mousemove(event)
{
  update_pos(event, click);
  var distance = click.x + click.y; 
  for (var i = 0; i < distance; ++i)
  {
    var x = ((click.x * i) + (last_click.x * (distance - i))) / distance;
    var y = ((click.y * i) + (last_click.y * (distance - i))) / distance;
    draw_rectangle(x, y, 10, 10);
  }

  last_click.x = click.x;
  last_click.y = click.y;
}

function handle_keypress(event)
{
  var key = event.key;
  if (key == "t")
    draw_mode = "text";
  else if (key == "p")
    draw_mode = "pen";
}

function handle_typing(event)
{
  var key = event.key;
  if (key == "Escape")
    stop_typing();
  else
    draw_letter(key);
}

function start_drawing(event)
{
  update_pos(event, last_click);
  handle_mousemove(event);
  canvas.addEventListener("mousemove", handle_mousemove);
}

function start_typing(event)
{
  update_pos(event, text_cursor);
  window.removeEventListener("keydown", handle_keypress);
  window.addEventListener("keydown", handle_typing);
  canvas.removeEventListener("mousedown", handle_mousedown); 
}

function stop_typing(event)
{
  window.removeEventListener("keydown", handle_typing);
  window.addEventListener("keydown", handle_keypress);
  canvas.addEventListener("mousedown", handle_mousedown); 
}

function handle_mousedown(event)
{
  if (draw_mode == "pen")
    start_drawing(event);
  else if (draw_mode == "text")
    start_typing(event);
}

function handle_mouseup(event)
{
  canvas.removeEventListener("mousemove", handle_mousemove);
}
