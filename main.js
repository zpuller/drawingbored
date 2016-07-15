var canvas = document.getElementById("canvas");
var tools = document.getElementById("tools");
var ctx

ctx = canvas.getContext("2d");
var image_data = ctx.createImageData(canvas.width,canvas.height);
var data  = image_data.data;

for (var i = 0; i < data.length;)
{
  data[i] = 0;
  ++i;
  data[i] = 0;
  ++i;
  data[i] = 255 * i / data.length;
  ++i;
  data[i] = 255;
  ++i;
}

ctx.putImageData(image_data, 0, 0);

ctx = tools.getContext("2d");
ctx.fillStyle = "rgb(0, 200,0)";
ctx.fillRect (0, 0, tools.width, tools.height);
