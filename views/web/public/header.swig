<div class="head">
  <div class="logo">
    <img src="/images/logo.png" alt="">
  </div>
  <div class="head-nav">
    <ul class="ui-nav">
      {% for item in nav -%}
      <li class="ui-nav-item {{item.active|navActive}}"><a href="{{item.href}}">{{item.text}}</a></li>
      {% endfor %}
    </ul>
    <div class="navbar-list">
    </div>
  </div>
</div>