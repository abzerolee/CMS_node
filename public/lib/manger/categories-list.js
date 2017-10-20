let table;

function bindEvent() {
  
}

$(function() {
  let table = initTable({
    url: '/api/categories/getCategory',
    type: 'get',
    datas: function(d) {
      return {};
      return {
      };
    },
    columns: ['', 'name', 'parent', 'keywords', 'title', 'path', 'order', '_id'],
    defaults: {
      '0': '<input type="checkbox" class="check">',
      '2': '----'
    },
    callbacks: {
      '7': function(data, type, row) {
        const ops = [];
        ops.push('<a class="editor detail" href="javascript:;">详情</a>');
        ops.push('<a class="editor edit" href="javascript:;">修改</a>');
        ops.push('<a class="editor delet" href="javascript:;">删除</a>');
        return ops.join(' | ');
      }
    }
  });

  bindEvent();
})
