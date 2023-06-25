"use strict";

function box_downsampling(width, height, input, sigma_space, sigma_range, rate) {
  var ss = sigma_space * rate;
  var sr = sigma_range * rate;
  var size = width * height;
  var ret_x = Math.ceil(width / ss);
  var ret_y = Math.ceil(height / ss);
  var ret_z = Math.ceil(intensity / sr);
  var ret = new Float32Array(ret_x * ret_y * ret_z);
  
  for (var pz = 0; pz < intensity; pz += sr)
  for (var py = 0; py < height; py += ss)
  for (var px = 0; px < width; px += ss)
  {
    var sum = 0;
    var cnt = 0;
    var ind_ret = (px / ss) + ret_x * (py / ss) + ret_x * ret_y * (pz / sr);
    
    for (var dz = 0; dz < sr; ++dz)
    for (var dy = 0; dy < ss; ++dy)
    for (var dx = 0; dx < ss; ++dx)
    {
      var px1 = px + dx;
      var py1 = py + dy;
      var pz1 = pz + dz;
      if (px1 < width && py1 < height && pz1 < intensity) {
        var idx = px1 + width * py1 + size * pz1;
        sum += input[idx];
        cnt += 1;
      }
    }
    sum = sum / cnt;
    ret[ind_ret] = sum;
  }
  return ret;
}
