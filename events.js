var draw_mode = "pen";

function handle_mousemove_draw(event)
{
  update_pos(event, click);
  var size = 10;
  var color = beige;
  var distance = click.x + click.y; 
  for (var i = 0; i < distance; ++i)
  {
    var x = ((click.x * i) + (last_click.x * (distance - i))) / distance;
    var y = ((click.y * i) + (last_click.y * (distance - i))) / distance;
    draw_rectangle(x, y, size, size, color); 
  }

  last_click.x = click.x;
  last_click.y = click.y;
}

function handle_mousemove_erase(event)
{
  update_pos(event, click);
  var size = 100;
  var color = black;
  var distance = click.x + click.y; 
  for (var i = 0; i < distance; i = i + 10)
  {
    var x = ((click.x * i) + (last_click.x * (distance - i))) / distance;
    var y = ((click.y * i) + (last_click.y * (distance - i))) / distance;
    draw_rectangle(x, y, size, size, color); 
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
  else if (key == "e")
    draw_mode = "erase";
  else if (key == "c")
    draw_canvas_background();
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
  var handler = draw_mode == "erase" ? handle_mousemove_erase : handle_mousemove_draw;
  handler(event);
  canvas.addEventListener("mousemove", handler); 
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
  var left_click = event.which == 1;
  if (left_click)
  {
    if (draw_mode == "pen" || draw_mode == "erase")
      start_drawing(event);
    else if (draw_mode == "text")
      start_typing(event);
  }
}

function handle_mouseup(event)
{
  canvas.removeEventListener("mousemove", handle_mousemove_draw);
  canvas.removeEventListener("mousemove", handle_mousemove_erase);
}
