'use strict';

function update_pos(event, obj)
{
  var ipadX = event.targetTouches[0].pageX;
  var ipadY = event.targetTouches[0].pageY;
  obj.x = Math.floor(canvas.width * ((event.offsetX || ipadX ) / canvas.clientWidth));
  obj.y = Math.floor(canvas.height * ((event.offsetY || ipadY) / canvas.clientHeight));
}
