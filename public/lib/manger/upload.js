;(function($) {
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
})(jQuery)