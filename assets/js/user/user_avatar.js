$(function () {
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)



  $('#btnChooseImage').on('click', function () {
    $('#file').click()
  })

  //修改裁剪图片

  //- 给文件选择框绑定 change 事件
  //- 用户选择了文件就会触发这个事件，通过 e.target.files 获取用户选择文件列表
  //通过索引0拿到用户选择的文件
  //将文件转化为路径
  //利用 $image 重新初始化裁剪区域
  var layer = layui.layer
  $('#file').on('change', function (e) {
    var files = e.target.files
    if (files.length === 0) {
      return layer.msg('请选择图片!')
    }
    var file = files[0]
    var imgURL = URL.createObjectURL(file)
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', imgURL) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域
  })

  // 上传头像
  $('#btnUpload').on('click', function () {
    // 拿到用户裁剪之后的头像,创建一个 Canvas 画布，将 Canvas 画布上的内容，转化为 base64 格式的字符串
    var dataURL = $image
      .cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png')
    // 调用接口，把头像上传到服务器
    $.ajax({
      method: 'POST',
      url: '/my/update/avatar',
      data: {
        avatar: dataURL
      },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('恭喜上传头像成功!')
        // 渲染父页面的头像
        window.parent.getUserInfo()
      }
    })
  })
  getUserInfo()
  // 修改个人中心头像
  function getUserInfo() {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg(res.message)
        }
        // 渲染 头像
        $image
          .cropper('destroy') // 销毁旧的裁剪区域
          .attr('src', res.data.user_pic) // 重新设置图片路径
          .cropper(options) // 重新初始化裁剪区域
      }
    })
  }









})