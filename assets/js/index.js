$(function () {
  // 渲染页面
  getUserInfo()

  // 实现退出功能
  // 点击退出按钮后利用layui的询问框功能判断,确认后清空token跳转页面,关闭询问框
  $('#btnLogout').on('click', function () {
    layer.confirm('是否确认退出?', { icon: 3, title: '提示' }, function (index) {
      localStorage.removeItem('token')
      location.href = '/login.html'
      layer.close(index);
    });
  })



})
// 渲染页面函数
function getUserInfo() {
  $.ajax({
    url: '/my/userinfo',
    // headers: {
    //   // 因为需要身份认证所以要设置请求头把本地的token上传给后台
    //   Authorization: localStorage.getItem('token') || ''
    // },
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg(res.message)
      }
      // layui.layer.msg(res.message)
      // 成功就根据服务器返回的数据来渲染页面
      renderAvatar(res.data)
    },
    // 不论成功与否都会调用complete 回调函数, 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
    // complete: function (res) {
    //   if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
    //     // 如果服务器返回的status不为1且,message不是失败,就清空token,跳转页面
    //     localStorage.removeItem('token')
    //     location.href = '/login.html'
    //   }
    // }
  })
}
// 渲染头像函数
function renderAvatar(user) {
  // 获取昵称,然后修改头像后的欢迎语
  var name = user.nickname || user.username
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
  // 用户头像
  // 先判断是否有头像,有就渲染头像,没有就渲染名字第一位
  if (user.user_pic !== null) {
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.user-avatar').hide()
  } else {
    $('.layui-nav-img').hide()
    var text = name[0].toUpperCase()
    $('.user-avatar').show().html(text)
  }
}