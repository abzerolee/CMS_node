{% extends './layout.swig' %}

{% block title %} 创翊软科--产品中心 {% endblock %}

{% block head %}
<link rel="stylesheet" href="/css/products.css">
{% endblock %}

{% block banner %}
<div class="banner ui-swipe">
  <div class="ui-swiper-slide">
    <img src="/images/product-banner.png" alt="">
  </div>
</div>
{% endblock %}

{%block container%}
<div class="container-wrap">
  <!-- mobile -->
  <div class="mobile">
    <img src="/images/product-bg.png" alt="">              
    <div class="container">
      <img src="/images/product-mobile.png" alt="">
      <div class="mobile-text">
        <h4>移动互联</h4>
        <ul>
          <li>随时随地，互联互通。</li>
          <li>有效占领移动互联入口，赢在起点。</li>
          <li>全方位，多媒体展示。</li>
          <li>无需依靠任何媒体应用，自主营销。</li>
          <li>无需繁琐输入，即可轻松浏览。</li>
          <li>随时随地，互联互通。</li>
          <li>有效占领移动互联入口，赢在起点。</li>
          <li>全方位，多媒体展示。</li>
          <li>无需依靠任何媒体应用，自主营销。</li>
          <li>无需繁琐输入，即可轻松浏览。</li>
        </ul>
      </div>
    </div>
  </div>
  <!-- website -->
  <div class="mobile web">
    <div class="container">
      <div class="mobile-text">
        <h4>网站建设</h4>
        <ul>
          <li>已经汇集了一批资深网站策划师、设计师，专业的网站实施团队，以及高素质售后服务人员，并且完全形成了一套成熟的业务流程</li>
          <li>独创的私人订制，完全按照客户需求，对网站进行建设、维护、更新和改版。</li>
          <li>已经汇集了一批资深网站策划师、设计师，专业的网站实施团队，以及高素质售后服务人员，并且完全形成了一套成熟的业务流程</li>
          <li>独创的私人订制，完全按照客户需求，对网站进行建设、维护、更新和改版。</li>
        </ul>
      </div>
      <img src="/images/product-website.png" alt="">
    </div>
  </div>
  <!-- work -->
  <div class="work">
    <div class="container">
      <h4>协同办公</h4>
      <p>创翊软科是天津奥的斯电梯指定为旗下供应商提供软件开发的服务团队，目前为大多数奥的斯供应商开发过PDF订单解析系统、装箱系统、库存比对系统、进销存系统、OA系统等。是奥的斯供应商良好的合作软件开发服务商。创翊软科是天津奥的斯电梯指定为旗下供应商提供软件开发的服务团队，目前为大多数奥的斯供应商开发过PDF订单解析系统、装箱系统、库存比对系统、进销存系统、OA系统等。是奥的斯供应商良好的合作软件开发服务商。</p>
    </div>
  </div>
</div>
{%endblock%}