$(function () {
  // 验证名字长度规则
  var form = layui.form
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '昵称长度为 1~6 之间!'
      }
    }
  })
  // 用户信息渲染
  initUserInfo()
  var layer = layui.layer
  // 封装
  function initUserInfo() {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg(res.message)
        // 成功就利用layui的form.val方法快速渲染 lay-filter 属性表单
        form.val('formUserInfo', res.data)
      }
    })
  }
  //表单的重置
  //- 阻止表单的默认重置行为
  // - 重新调用 initUserInfo() 函数，重新获取用户信息
  $('#btnReset').on('click', function (e) {
    e.preventDefault()
    //重新获取用户信息
    initUserInfo()
  })
  // 发起请求更新用户的信息
  // 监听表单提交事件,取消默认行为
  // 利用 $.ajax()发起 post 请求利用 $(this).serialize() 获取表单数据
  // 如果返回的 status 不为0，说明更新失败，及逆行提示
  // 更新成功之后，调用父页面中的方法，重新渲染用户的头像和用户信息
  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg(res.message)
        // 成功,调用父页面中的方法，重新渲染
        window.parent.getUserInfo()
      }
    })
  })




})