// 配置dataTable
if ($.fn.dataTable) {
  $.extend($.fn.dataTable.defaults, {
    searching: false,
    ordering: false,
    lengthMenu: [5, 10, 20, 30, 40, 50],
    pageLength: 10,
    processing: true,
    serverSide: true,
  });
  $.fn.dataTable.ext.errMode = 'throw';
}
// 查询，重新载入 DataTables
$('#search').on('click', (e) => {
  e.preventDefault();
  table.ajax.reload();
});

// 清空
$('#clear').on('click', function(e) {
  e.preventDefault();
  $(this).parent().find(':input').val('');
  table.ajax.reload();
});

//绑定选中所有的事件
$("table").on('change', 'input.select-all', (e) => {
  e.preventDefault();
  const re = $(e.currentTarget).prop("checked")
  if (re) {
      $("tr:not(:first)").addClass('selector')
  } else {
      $("tr:not(:first)").removeClass('selector')
  }
  $(".check").prop("checked", re);
})

$('table').on('change', 'input.check', (e) => {
  e.preventDefault();
  const re = $(e.currentTarget).prop("checked");
  if (re) {
      $(e.currentTarget).closest('tr').addClass('selector')
  } else {
      $(e.currentTarget).closest('tr').removeClass('selector')
  }
})

/**
 * 初始化表格 
 * @param opt Objects
 * @param {url: String, type: String, datas: function, columns: Array, defaults: Object, callbacks: Object}
 */ 
function initTable(opt) {
  if(typeof opt !== 'object') {
    throw new Error('func initTable need option\'Object\' ');
  }

  let columns = getColumns(opt.columns, opt.defaults, opt.callbacks)

  return $('#dataTable').DataTable({
    autowidth: false,
    serverSide: true,
    columns: columns,
    ajax: {
      url: opt.url,
      type: opt.type,
      data: opt.datas,
      dataFilter: function(res){
        res = JSON.parse(res);
        const renderData = {
          code: res.code,
          recordsTotal: res.info.length || 0,
          recordsFiltered: res.info.length || 0,
          data: res.info,
        };
        if(res.code !== 10){
          return JSON.stringify(renderData);
        };
        $('#total').html(res.info.length);
        return JSON.stringify(renderData);
      }
    },
  }); 
}
/**
 * 获取表格列
 * @param {*} columns 
 * @param {*} defaults 
 * @param {*} cbs 
 */
function getColumns(columns, defaults, cbs) {
  return columns.map(function(val, i) {
    let tmp = {data: val};
    if(defaults[String(i)]) {
      tmp.defaultContent = defaults[String(i)];
    }else {
      tmp.defaultContent = '';
    }
    
    if(cbs[String(i)] && typeof cbs[String(i)] === 'function') {
      tmp.render = cbs[String(i)];
    }
    return tmp;
  });
}
/**
 * 请求方法
 * @param {String} url 
 * @param {String} type 
 * @param {Object} data 
 * @param {function} successFn 
 */
function oajax(url, type, data, successFn) {
  $.ajax({
    "url": '/api'+ url,
    "crossDomain": true,
    "data": data,
    "dataType": 'json',
    "timeout": 30000,
    "method": type
  }).done(function (result) {
    if (result.code == 10) {
        successFn.call(this, result)
    } else if (result.code == 11) {
        layer.alert('操作失败 ：）'+ result.info);
    } else if (result.code == 12) {
        layer.alert("您无权执行此操作！");
    } else if (result.code == 99) {
        layer.alert(result.message);
    }
  });
}

// 弹出层 弹窗
const pop = {
  window: function(title, url, successFn, endFn) {
    layer.open({
      type: 2,
      title: title || '创翊软科CMS后台管理系统',
      area: ['1000px', '600px'],
      maxmin: true,
      shade: 0,
      anim: 1,
      content: url,
      success: function(layero, index) {
        $(layero[0]).find('ifram').attr('src', $(layero[0]).find('ifram').src+1);
        if(typeof successFn === 'function') {
          successFn.call(null);
        }
      },
      end: function(){
        if(typeof endFn === 'function') {
          endFn.call(null);
        }
      }
    });
  },
  close: function() {
    const layerindex = parent.layer.getFrameIndex(window.name);
    parent.layer.close(layerindex);
  },
}
// 字数限制
function limitLength(obj, length) {
  var desc = obj.value;
  obj.value = (function substr(str, length) {
    var l = 0, i = 0;
    while (l < length && i < str.length) {
        l += 1;
        if (str.substring(i, i + 1).match(/[\u4e00-\u9fa5]/)) l += 2; //一个中文是相当于3个英文   
        i += 1;
    }
    return str.substring(0, i);
  })(obj.value, length);
}

// 截取query参数
function getQueryString(name) {
  var reg = new RegExp(name + "=([^&]*)(&|$)", "i");
  var r = window.location.href.match(reg);
  if (r != null) return decodeURIComponent(r[1]);
  return null;
}

// 获取form表单值
function getFormValue(form, booleanToNum) {
  var data = {};
  var selectors = ['input[type=text]', 'input[type="hidden"]', 'input[type="password"]', 'textarea', 'input[type=radio]:checked', 'input[type=checkbox]', 'select'];
  $.each(selectors, function(i, selector) {
    $(form).find(selector).each(function() {
      if(selector === 'select' && this.name) {
        var values = [];
        $(this).find('option:selected').each(function (index, item) {
            values.push(item.value);
        });
        data[this.name] = values.join(",");
        return;
      }
      if(selector === 'input[type=checkbox]') {
        if (booleanToNum) {
            data[this.name] = booleanToNum[this.checked];
        } else {
            data[this.name] = this.checked;
        }
        return;
      }
      if(this.name) data[this.name] = this.value;
    })
  });
  return data;
}

// 设置form Value
function setFormValue(form, value, numToBoolean) {
  var selectors = ['input[type=text]', 'input[type="hidden"]', 'input[type="password"]', 'textarea', 'input[type=radio]', 'input[type=checkbox]', 'select'];
  $.each(selectors, function(i, selector) {
    $(form).find(selector).each(function() {
      if(selector === 'select' && this.name) {
        let self = this;
        $(self).find('option').each(function() {
          value[self.name] == this.value ? $(this).attr('selected', true) : $(this).removeAttr('selected');
        });
        return;
      }
      if(selector === 'input[type=checkbox]' && this.name) {
        if(numToBoolean){
          this.checked = numToBoolean[value[this.name]];
        }else {
          this.checked = value[this.name];
        }
        return;
      }
      
      if(this.name) this.value = value[this.name] || '';
      if(value[this.name] === 0) this.value = 0;
    })
  });
}
