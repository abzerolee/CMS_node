var table;

function bindEvent() {
  $('#showAddPage').on('click', function(e) {
    e.preventDefault();
    pop.window('广告管理--添加广告', '/manger/advertising_add');
  });

  $('table').on('click', 'a.option_edit',function(e) {
    e.preventDefault();
    let selector = $(e.currentTarget).closest('tr');
    let data = table.row(selector).data();   
    pop.window('广告管理--修改', '/manger/advertising_add?id='+data._id);
  });
  
  $('table').on('click', 'a.option_delet', function(e) {
    e.preventDefault();
    let selector = $(e.currentTarget).closest('tr');
    let data = table.row(selector).data();   
    layer.confirm('您确定删除该广告吗？', function(layero, index) {
      delCategory([data._id]);
    });
  });

  $('#banch_delet').on('click', function(e) {
    e.preventDefault();
    let ids = [];
    const data = table.rows(".selector").data()
    data.each((data,i) => {
      ids.push(data._id)
    })
    if(ids.length < 1){
      return layer.msg('请选择数据');
    }
    layer.confirm('您是否要删除选中的所有信息？', function() {
      delCategory(ids);
    });
  })
}

function delCategory(ids) {
  oajax('/adver/delAdver', 'post', {ids: ids}, function(data) {
    layer.msg('删除成功',)
    table.ajax.reload()
  });
}

$(function() {
  table = initTable({
    url: '/api/adver/getAdvers',
    type: 'get',
    datas: function(d) {
      return {
        name: $('#adverName').val(),
        type: $('#adverType').val(),
        state: $('#state').val()
      };
    },
    columns: ['', 'adverId', 'name', 'title', 'link', 'sImg', 'target', 'state', 'type', '_id'],
    defaults: {
      '0': '<input type="checkbox" class="check">'
    },
    callbacks: {
      '4': function(data, type, row) {
        if(row.type == 1) {
          return row.sImg[0] && row.sImg[0].link;
        }else {
          return data;
        }
      },
      '5': function(data, type, row) {
        if(data instanceof Array) {
          let img = data[0] && data[0].img;
          return '<img width="200" style="max-height:150px;" src="'+ img +'" />';
        }else {
          return '<img width="200" style="max-height:150px;" src="'+ data +'"/>';
        }
      },
      '7': function(data, type, row) {
        return data ? '<span class="label label-success radius">开启</span>' 
        : '<span class="label label-primary label-radius">关闭</span>';
      },
      '8': function(data) {
        return data == 0 ? '单条' : '多条';
      },
      '9': function(data, type, row) {
        const ops = [];
        ops.push('<a class="option_edit" href="javascript:;">修改</a>');
        ops.push('<a class="option_delet" href="javascript:;">删除</a>');
        return ops.join(' | ');
      }
    }
  });
  bindEvent();
})
