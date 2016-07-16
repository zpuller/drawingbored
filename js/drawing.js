'use strict';

var canvas = document.getElementById('canvas');
var tools = document.getElementById('tools');

var click = {};
var last_click = {};
var text_cursor = {};

canvas.width = 1920;
canvas.height = 1080;

var beige = [150, 160, 30, 255];
var black = [0, 0, 0, 255];

function draw_canvas_background()
{
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.fillRect (0, 0, canvas.width, canvas.height);
}

// could just use ctx.fillRect() but keeping this for
// reference if I want fancy pixel stuff later 
function draw_rectangle(x, y, width, height, color)
{
  var ctx = canvas.getContext('2d');
  var image_data = ctx.createImageData(width, height);
  var data  = image_data.data;
  for (var i = 0; i < data.length;)
  {
    //rgba
    data[i] = color[0];
    ++i;
    data[i] = color[1];
    ++i;
    data[i] = color[2];
    ++i;
    data[i] = color[3];
    ++i;
  }

  ctx.putImageData(image_data, x, y);
}

function draw_line(from, to, size, color)
{
  var distance = Math.abs(to.x - from.x) + Math.abs(to.y - from.y); 
  for (var i = 0; i < distance; ++i)
  {
    var x = ((to.x * i) + (from.x * (distance - i))) / distance;
    var y = ((to.y * i) + (from.y * (distance - i))) / distance;
    draw_rectangle(x, y, size, size, color); 
  }
}

function draw_letter(key)
{
  var ctx = canvas.getContext('2d');
  ctx.font = '250% Arial';
  ctx.fillStyle = '#96A01E';

  var width = ctx.measureText(key).width;
  ctx.fillText(key, text_cursor.x, text_cursor.y);
  text_cursor.x += width;
}

function draw_help()
{
  text_cursor.x = 5;
  text_cursor.y = 0;

  var ctx = canvas.getContext('2d');
  ctx.font = '250% Arial';
  ctx.fillStyle = '#96A01E';

  text_cursor.y += 50; 
  ctx.fillText('pen: p', text_cursor.x, text_cursor.y);
  text_cursor.y += 50; 
  ctx.fillText('erase: e', text_cursor.x, text_cursor.y);
  text_cursor.y += 50; 
  ctx.fillText('text: t (click to type, esc/return to stop)', text_cursor.x, text_cursor.y);
  text_cursor.y += 50; 
  ctx.fillText('clear screen: c', text_cursor.x, text_cursor.y);
}
