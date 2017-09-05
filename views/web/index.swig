{% extends './layout.swig' %}

{% block title %} 创翊软科官方网站 {% endblock %}

{% block head %}
<link rel="stylesheet" href="/css/index.css">
{% endblock %}

{% block banner %}
<div class="banner ui-swipe">
  <div class="ui-swiper-slide">
    <img src="images/banner.png" alt="">
  </div>
</div>
{% endblock %}

{% block container %}
<!-- container -->
<div class="container-wrap">
  <div class="container">
    <!-- abou us -->
    <div class="panel aboutUs">
      <h3 class="panel-head">
        创翊软科 <small>/ ABOUT US</small>
      </h3>
      <div class="panel-body">
          <p>创翊软科专业从事系统、网站设计及开发、微信公众平台、APP、手机网站开发、数据维护、软件技术咨询等业务。
              目前已经具备4人的宣传营销团队和4人的正式技术团队。其中宣传人员具有丰富的商赛和创业经验，掌握一定市场
              资源；开发人员则拥有平均3年的软件系统开发经验，对C#、JAVA及APP开发、UI设计技术掌握扎实。项目初期主
              要针对创业团队提供服务，后续将业务对象逐渐拓展至社会中小型企业。</p>
          <button class="btn">更多 +</button>
      </div>
    </div>
    <!-- service -->
    <div class="panel service">
      <h3 class="panel-head">
        技术与服务 <small>/ TECHNICAL AND SERVICE</small>
      </h3>
      <div class="panel-body">
        
      </div>
    </div>
    <!-- products -->
    <div class="panel products">
      <h3 class="panel-head">
        客户案例 <small>/ PRODUCTS</small>
      </h3>
      <div class="panel-body">
        <div class="products-list">
          <a href="">
            <dl class="case">
              <dd><img src="./images/picture1.png" alt=""></dd>
              <dt class="variation"><p>政府事业单位协同办公解决方案</p></dt>
            </dl>
          </a>
          <a href="">
            <dl class="case">
              <dd><img src="./images/picture2.png" alt=""></dd>
              <dt class="variation"><p>生产制造行业协同应用解决方案</p></dt>
            </dl>
          </a>
          <a href="">
            <dl class="case">
              <dd><img src="./images/picture3.png" alt=""></dd>
              <dt class="variation"><p>医疗行业解决方案</p></dt>
            </dl>
          </a>
          <a href="">
            <dl class="case">
              <dd><img src="./images/picture4.png" alt=""></dd>
              <dt class="variation"><p>交通运输行业解决方案</p></dt>
            </dl>
          </a>
          <a href="">
            <dl class="case">
              <dd><img src="./images/picture5.png" alt=""></dd>
              <dt class="variation"><p>连锁流通行业解决方案</p></dt>
            </dl>
          </a>
          <a href="">
            <dl class="case">
              <dd><img src="./images/picture6.png" alt=""></dd>
              <dt class="variation"><p>建筑房地产行业协同运营管理方案</p></dt>
            </dl>
          </a>
        </div>
        <button class="btn">更多 +</button>
      </div>
    </div>
  </div>

  <div class="canvas">
    <canvas id="particleLine" width="1170" height="500px"></canvas>
    <!-- <h2 class="canvas-tit">
      <strong>以技术为核心</strong><br>专业的服务团队
    </h2> -->
  </div>
</div>
<script>
    var RAF = (function() {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
              window.setTimeout(callback, 1000 / 60);
          };
    })();

    ;(function() {
      var canvas = document.getElementById('particleLine');
      var ctx = canvas.getContext('2d');

      var polygon = {x: canvas.width/2, y: canvas.height/2, num: 6, r: 200} // 多边形
      var xA = rand(-0.2, 0.2), yA = rand(-0.2, +0.2); // 速率
      var titles = ['一条龙服务', '品质服务', '24小时服务', '技术服务'];
      
      var particle = titles.map(function(item, i) {
        return getRelativeXY(polygon.x, polygon.y, 300, Math.PI/2*i+Math.PI/4);
      });

      // 悬浮
      drawRAF();
      function drawRAF() {
        ctx.clearRect(0,0,1170,500);
        
        particle.forEach(function(item, i) {
          ctx.fillText(i, item.x, item.y);
        });

        polygon.x += xA;
        polygon.y += yA;// 浮动范围10px的园
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

        var startX = x + r * Math.cos(0 - Math.PI/5);
        var startY = y - r * Math.sin(0 - Math.PI/5);
        var points = []; // 多边形顶点坐标

        ctx.beginPath();

        ctx.strokeStyle = '#DDD';
        ctx.lineWidth = 1.5;
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
        ctx.closePath();
        ctx.stroke();

        // 描点
        points.forEach(function(item) {
          ctx.beginPath();
          ctx.arc(item.x, item.y, 8, 0, Math.PI*2);
          ctx.fillStyle = '#DDD';
          ctx.fill();
        })

        fillTit('以技术为核心', x, y, {textAlign: 'center',color: '#f0ad4e'});
        fillTit('专业的服务团队', x, y+30, {font: '26',textAlign: 'center', color: '#f0ad4e'});
      }

      function fillTit(title, x, y, style) {
        ctx.beginPath()
        var font = style && style.font || '30',
            color = style && style.color || '#666',
            textAlign = style && style.textAlign || 'start';
      
        ctx.font = font + 'px serif';
        ctx.textAlign = textAlign;
        ctx.fillStyle = color;
        ctx.fillText(title, x, y);
        ctx.closePath();
      }
    })()

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
  </script>
{% endblock %}