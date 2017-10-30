var table;

function bindEvent() {
  $('#showAddPage').on('click', function(e) {
    e.preventDefault();
    pop.window('分类管理--新建文章', '/manger/article_add');
  });

  $('table').on('click', 'a.option_edit',function(e) {
    e.preventDefault();
    let selector = $(e.currentTarget).closest('tr');
    let data = table.row(selector).data();   
    pop.window('分类管理--修改文章', '/manger/article_add?id='+data._id);
  });
  
  $('table').on('click', 'a.option_delet', function(e) {
    e.preventDefault();
    let selector = $(e.currentTarget).closest('tr');
    let data = table.row(selector).data();   
    layer.confirm('您确定删除吗？', function(layero, index) {
      delArticle([data._id]);
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
      delArticle(ids);
    });
  })
}

function delArticle(ids) {
  oajax('/article/delArticle', 'post', {ids: ids}, function(data) {
    layer.msg('删除成功',)
    table.ajax.reload()
  });
}

$(function() {
  table = initTable({
    url: '/api/article/getArticles',
    type: 'get',
    datas: function(d) {
      return {
        title: $('#title').val(),
        tags: $('#tag').val(),
        keywords: $('#keywords').val(),
        state: $('#state').val(),
        author: $("#author").val(),
        original: $('#original').val()
      };
    },
    columns: ['', 'title', 'from', 'img', 'author', 'createdAt', 'keywords', 'tags', 'state', '_id'],
    defaults: {
      '0': '<input type="checkbox" class="check">',
    },
    callbacks: {
      '2': function(data) {
        return data.keywords;
      },
      '3': function(data) {
        if(data) {
          return '<img width="200" style="max-height:150px;" src="'+ data +'" />';
        }
      },
      '6': function(data) {
        if(data instanceof Array) {
          return $.map(data, function(v) {
            return '<label class="label label-primary radius">'+v+'</label>';
          }).join(' ');
        }
      },
      '7': function(data) {
        if(data instanceof Array) {
          return $.map(data, function(v) {
            return '<label class="label label-warning radius">'+v+'</label>';
          }).join(' ');
        }
      },
      '8': function(data) {
        return data ? '<label class="label label-success radius">发布中</label>' 
          : '<label class="label label-danger radius">关闭</label>' 
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
