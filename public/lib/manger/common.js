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

  return $('#dataTable').dataTable({
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
    "url": '/api/'+ url,
    "crossDomain": true,
    "data": data,
    "dataType": 'json',
    "timeout": 30000,
    "method": type
  }).done(function (result) {
    if (result.code == 10) {
        successFn.call(this, result)
    } else if (result.code == 11) {
        layer.alert('操作失败!'+ result.info);
    } else if (result.code == 12) {
        layer.alert("您无权执行此操作！");
    } else if (result.code == 99) {
        layer.alert(result.message);
    }
  });
}