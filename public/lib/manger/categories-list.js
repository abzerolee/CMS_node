var table;

function bindEvent() {
  $('#showAddPage').on('click', function(e) {
    e.preventDefault();
    pop.window('分类管理--添加路由', '/manger/categories_add');
  });

  $('table').on('click', 'a.option_edit',function(e) {
    e.preventDefault();
    let selector = $(e.currentTarget).closest('tr');
    let data = table.row(selector).data();   
    pop.window('分类管理--修改路由', '/manger/categories_add?categoryName='+data.name+'&id='+data._id);
  });
  
  $('table').on('click', 'a.option_delet', function(e) {
    e.preventDefault();
    let selector = $(e.currentTarget).closest('tr');
    let data = table.row(selector).data();   
    layer.confirm('您确定删除该路由吗？', function(layero, index) {
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
  oajax('/categories/delCategory', 'post', {ids: ids}, function(data) {
    layer.msg('删除成功',)
    table.ajax.reload()
  });
}

$(function() {
  table = initTable({
    url: '/api/categories/getCategory',
    type: 'get',
    datas: function(d) {
      return {
        name: $('#categoryName').val(),
        parent: $('#categoryPName').val(),
      };
    },
    columns: ['', 'name', 'parent', 'keywords', 'title', 'path', 'order', '_id'],
    defaults: {
      '0': '<input type="checkbox" class="check">',
      '2': '----'
    },
    callbacks: {
      '5': function(data, type, row) {
        return '<a href="'+ data +'">'+ data +'</a>';
      },
      '7': function(data, type, row) {
        const ops = [];
        ops.push('<a class="option_edit" href="javascript:;">修改</a>');
        ops.push('<a class="option_delet" href="javascript:;">删除</a>');
        return ops.join(' | ');
      }
    }
  });
  bindEvent();
})
