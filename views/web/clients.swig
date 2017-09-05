{% extends "./layout.swig" %}

{%block title%}创翊软科--客户案例{%endblock%}

{%block head%}
<link rel="stylesheet" href="/css/clients.css">
{%endblock%}

{% block banner %}
<div class="banner ui-swipe">
  <div class="ui-swiper-slide">
    <img src="/images/customers-banner.png" alt="">
  </div>
</div>
{% endblock %}

{# container #}
{%block container%}
<div class="container">
  <div class="panel customers">
    <h3 class="panel-head">客户案例</h3>
    <div class="panel-body">
      <dl class="customers-item">
        <dt><img src="/images/customers-picture1.png" alt=""></dt>
        <dd>
          <h4><a href="">OTIS</a></h4>
          <p>品牌网站、响应式网址</p>
          <p>PC、手机</p>
        </dd>
      </dl>
      <dl class="customers-item">
        <dt><img src="/images/customers-picture1.png" alt=""></dt>
        <dd>
          <h4><a href="">OTIS</a></h4>
          <p>品牌网站、响应式网址</p>
          <p>PC、手机</p>
        </dd>
      </dl>
      <dl class="customers-item">
        <dt><img src="/images/customers-picture1.png" alt=""></dt>
        <dd>
          <h4><a href="">OTIS</a></h4>
          <p>品牌网站、响应式网址</p>
          <p>PC、手机</p>
        </dd>
      </dl>
    </div>
  </div>
</div>
{%endblock%}