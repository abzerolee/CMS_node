;(function() {
  // requestAnimation
  var RAF = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
  })();

  var canvas = document.getElementById('particleLine');
  var ctx = canvas.getContext('2d');

  var polygon = {x: canvas.width/2, y: canvas.height/2, num: 6, r: 180} // 多边形
  var xA = rand(-0.4, 0.4), yA = rand(-0.4, +0.4); // 速率
  var titles = ['一条龙服务', '品质服务', '24小时服务', '技术服务'];

  // 衍生点
  var particle = titles.map(function(item, i) {
    var angle = i%2===0 ? Math.PI/6 : Math.PI/3;
    return getRelativeXY(polygon.x, polygon.y, 400, Math.PI/2*i+angle);
  });

  // 悬浮
  drawRAF();
  function drawRAF() {
    ctx.clearRect(0,0,1170,500);
    ctx.strokeStyle = '#DDD';
    ctx.lineWidth = 1.5;

    // 衍生点悬浮
    particle.forEach(function(item, i) {
      ctx.fillText(titles[i], item.x, item.y);
    });

    // 多边形运动趋势浮动范围10px的园
    polygon.x += xA;
    polygon.y += yA;
    xA *= polygon.x >= (canvas.width/2+20) || polygon.x <= (canvas.width/2-20) ? -1 : 1;
    yA *= polygon.y >= (canvas.height/2+20) || polygon.y <= (canvas.height/2-20) ? -1 : 1;
    drawPolygon(polygon);
    RAF(drawRAF);
  }

  // 绘制多边形
  function drawPolygon(opt) {
    var x = opt && opt.x || 0;
    var y = opt && opt.y || 0;
    var num = opt && opt.num || 3;
    var r = opt && opt.r || 2;
    var angle = 2*Math.PI/num; // 圆心角
    var points = []; // 多边形顶点坐标
    var startX = x + r * Math.cos(0 - Math.PI/5);
    var startY = y - r * Math.sin(0 - Math.PI/5);
    

    ctx.beginPath();
    ctx.moveTo(startX, startY); // 默认起始点从右方开始 偏移36度

    // 多边形顶点轨迹
    for(var i = 1; i <= num; i++) {
      var newXY = getRelativeXY(x, y, r, angle*i + Math.PI/5);
      points.push(newXY);
      ctx.lineTo(newXY.x, newXY.y);
    }

    if(points.length > 3) {
      // 对角线
      points.forEach(function(item, j) {
        ctx.moveTo(x,y);
        ctx.lineTo(item.x, item.y);
        if(j >= points.length - 2) j = j - points.length;
        ctx.lineTo(points[j+2].x, points[j+2].y); // 依次隔一个顶点连线
      });
    }

    // 衍生点连线
    particle.forEach((item, j) => {
      switch(j) {
        case 0: ligature(j, [0,1,4,5]);break;
        case 1: ligature(j, [0,1]);break;
        case 2: ligature(j, [1,2,3]);break;
        case 3: ligature(j, [3,4]);break;
      }
    });
    
    ctx.closePath();
    ctx.stroke();
    
    // 顶点描点
    points.forEach(function(item) {
      ctx.beginPath();
      ctx.arc(item.x, item.y, 8, 0, Math.PI*2);
      ctx.fillStyle = '#CCC';
      ctx.fill();
    })

    fillTit('以技术为核心', x, y, {textAlign: 'center',color: '#f0ad4e'});
    fillTit('专业的服务团队', x, y+30, {font: '26',textAlign: 'center', color: '#f0ad4e'});
    
    // 顶点与衍生点连线（连接顶点索引数组）定点连线
    function ligature(start ,lines) {
      for(var i = 0; i < lines.length; i++) {
        ctx.moveTo(particle[start].x, particle[start].y);
        ctx.lineTo(points[lines[i]].x, points[lines[i]].y);
      }
    }
  }
  // 填充标题
  function fillTit(title, x, y, style) {
    ctx.beginPath()
    var font      = style && style.font || '30',
        color     = style && style.color || '#666',
        textAlign = style && style.textAlign || 'start';
  
    ctx.font = font + 'px serif';
    ctx.textAlign = textAlign;
    ctx.fillStyle = color;
    ctx.fillText(title, x, y);
    ctx.closePath();
  }

  function rand(min, max){   
    return(min + (Math.random() * (max-min)));   
  }

  function getRelativeXY(x, y, dis, angle) { // angle为逆时针
    return {
      x: x + dis*Math.cos(angle),
      y: y + dis*Math.sin(angle),
    }
  }

  function getDistance(a, b){
    var dis = Math.sqrt(
      Math.pow((a.x - b.x), 2) + Math.pow((a.y - b.y), 2)
    )
    return Math.abs(dis);
  };
})()