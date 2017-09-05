{% extends "./layout.swig" %}

{%block title%}创翊软科--新闻中心{%endblock%}

{%block head%}
<link rel="stylesheet" href="/css/news.css">
{%endblock%}

{%block container%}
<div class="container">
  <!-- Headlines today  -->
  <div class="panel headlines">
    <h3 class="panel-head">今日头条</h3>
    <div class="panel-body">
      <dl class="jagged-graphic">
        <dd></dd>
        <dt><img src="/images/products-picture1.png" alt=""></dt>
      </dl>
      <dl class="jagged-graphic">
        <dt><img src="/images/products-picture2.png" alt=""></dt>
        <dd>我们却深知有形之碑，
            固然可以广而告之，昭示
            天下而弥足珍贵，
            但真正能够在行业中流芳
            百世的，
            还是客户的口碑</dd>
      </dl>
      <dl class="jagged-graphic">
        <dd>不断的努力拼搏
            使我们在行业中不断地举
            起奖杯</dd>
        <dt><img src="/images/products-picture3.png" alt=""></dt>
      </dl>
      <dl class="jagged-graphic">
        <dt><img src="/images/products-picture4.png" alt=""></dt>
        <dd>越努力，越幸福... 
          <button class="btn">更多 +</button>
        </dd>
      </dl>
    </div>
  </div>
  <!-- news list -->
  <div class="panel newslist">
    <h3 class="panel-head">新闻动态</h3>
    <div class="panel-body">
      <div class="newslist-item">
        <div class="item-img"><img src="/images/products-picture5.png" alt=""></div>
        <div class="item-info">
          <h4>北京软件开发公司电信运营商后台服务系统</h4>
          <p>
              北京软件开发公司电信运营商后台服务系统北京软件开发公司电信运营商后台服务系统北京软件开发公司电信运营商后台服务系统北京软件开发公司电信运营商后台服务系统北京软件开发公司电信运营商后台服务系统北京软件开发公司电信运营商后台服务系统北京软件开发公司电信运营商后台服务系统北京软件开发公司电信运营商后台服务系统北京软件开发公司电信运营商后台服务系统
          </p>
          <div class="item-info-tip">
            <em>日期：</em>2015-08-11
            <em>来源：</em>北极光软件开发公司
          </div>
          <button class="btn">更多 +</button>
        </div>
      </div>
    </div>
  </div>
  <!-- paging -->
  <div class="paging">
    <a href="#">&lt;&lt; 上一页</a>
    <a href="#" class="active">1</a>
    <a href="#">2</a>
    <a href="#">3</a>
    <a href="#">下一页 &gt;&gt;</a>
  </div>
</div>
{%endblock%}