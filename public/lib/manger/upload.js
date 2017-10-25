;(function($, layer) {
  var uploader = new WebUploader.Uploader({
    auto: true,
    swf: '/plugins/webuploader/0.1.5/Uploader.swf',
    server: '/api/uploadImg',
    pick: '#picker',
    accept: {
      title: 'Images',
      extensions: 'gif,jpg,jpeg,bmp,png',
      mimeTypes: 'image/*'
    }
  });

  var $list = $('#thelist');
  uploader.on('fileQueued', function( file ) {
    $li = $(
      '<div id="' + file.id + '" class="file-item thumbnail">' +
          '<img>' +
          '<div class="info">' + file.name + '</div>' +
      '</div>'
      );
    uploader.makeThumb(file, function( error, src ) {
      if (error) {
        $li.replaceWith('<span>不能预览</span>');
        return;
      }
      $li.find('img').attr( 'src', src );
    });
    $list.html($li);
  });

  uploader.on( 'uploadSuccess', function(file, res) {
    $('#image').val(res.info[0]);
    $('#'+file.id).addClass('upload-state-done');
  });

  uploader.on( 'uploadError', function( file ) {
    var $li = $( '#'+file.id ),
    $error = $li.find('div.error');
    if (!$error.length) {
        $error = $('<span class="error"></span>').appendTo( $li );
    }
    $error.text('上传失败');
  });

  // 多图上传
  $.fn.UploadImgs = function() {
    // 清除图片项
    var root = this;
    $(this).on('click', '.trash', function() {
      var self = this;
      layer.confirm('您确定要删除该图片吗？', function(index) {
        $(self).parent().remove();
        var len = $(root).children('.sImg-item').length;
        if(len < 6) {
          $(root).children('.sImg-addItem').show();
        }
        layer.close(index);
      });
    });
    // 添加图片项
    $(this).on('click', '.sImg-addItem>a', function() {
      var len = $(root).children('.sImg-item').length;
      $(this).parent().before(reSimgItem(len));
      if(++len >= 6)  {
        $(root).children('.sImg-addItem').hide();
      }
    });
    // 上传图片
    $(this).on('click', '.thumbnail', function() {
      $(this).parent().siblings('.file').click();
    });
    $(this).on('change', '.file', function() {
      var data = new FormData(), self = this; 
      data.append('file', this.files[0]);
      $.ajax({
        url:'/api/uploadImg',
        type: 'post',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        success: function(data) {
          if(data.code === 10) {
            $(self).siblings('.thumbnail-wrap').children('.thumbnail').attr('src', data.info[0]);
            $(self).siblings('.simg-item-img').val(data.info[0]);
          }else {
            layer.msg('上传失败 ：）'+ data.info);
          }
        }
      });
    });

    return root;
  }

  $.fn.getSimgs = function() {
    var root = this;
    var items = $(this).children('.sImg-item');
    let sImgs = $.map(items, function(item) {
      return {
        img: $(item).children('.simg-item-img').val(),
        link: $(item).children('.simg-item-link').val(),
        alt: $(item).children('.simg-item-alt').val()
      }
    });
    return sImgs;
  }

  // 页面加载图片
  $.initSingleIMG = function(path) {
    var $list = $('#thelist');
    var $img = $('<div class="file-item thumbnail"><img width="110" height="110" src="'+ path +'" /></div>');
    $list.html($img)
  }

  $.initMultiIMG = function(path) {
    if(path instanceof Array) {
      $.each(path, function(i, v) {
        var _html = reSimgItem(i, v);
        $('#multi_img .sImg-addItem').before(_html);
      });
    }
  }

  function reSimgItem(index, obj) {
    let $item = $(
      '<div class="sImg-item col-sm-3" data-index="'+index+'">'+
        '<input type="hidden" value="" class="simg-item-img"/>'+
        '<input type="file" class="hidden file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" multiple="false" />'+
        '<div class="thumbnail-wrap">'+
          '<img class="thumbnail" src="/images/uploads.png" />'+
        '</div>'+
        '<a href="javascript:;" class="Hui-iconfont trash">&#xe6a6;</a>'+
        '<input type="text" class="input-text simg-item-link" placeholder="请输入广告连接"/>'+
        '<input type="text" class="input-text simg-item-alt" placeholder="广告图片加载失败文字"/>'+
      '</div>');

    if(obj && obj.img && obj.link) {
      $item.children('.simg-item-img').val(obj.img);
      $item.find('.thumbnail-wrap>.thumbnail').attr('src', obj.img);
      $item.children('.simg-item-link').val(obj.link);
      $item.children('.simg-item-alt').val(obj.alt);
    }

    return $item;
  }

})(jQuery, layer)