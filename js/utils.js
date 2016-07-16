function update_pos(event, obj)
{
  obj.x = Math.floor(canvas.width * (event.offsetX / canvas.clientWidth));
  obj.y = Math.floor(canvas.height * (event.offsetY / canvas.clientHeight));
}
