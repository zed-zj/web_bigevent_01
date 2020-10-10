$(function () {
  //  为密码框定义校验规则
  var form = layui.form
  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    samePwd: function (value) {
      if (value === $('[name=oldPwd]').val()) {
        return '新旧密码不能一致!'
      }
    },
    rePwd: function (value) {
      if (value !== $('[name=newPwd]').val()) {
        return '两次密码输入不一致!'
      }
    }
  })


  // 发起请求实现重置密码的功能
  // 给form表单绑定 submit 事件,取消默认行为
  // 利用 $.ajax() 来发送 post 请求,利用 $(this).serialize() 来设置提交的数据
  // 如果 服务器返回的 status 不等于0，说明失败，利用 layui.layer.msg 来进行提示
  //更新成功，用原生DOM方法重置一下表单内容
  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg(res.message)
        }
        layui.layer.msg('更新密码成功!')
        //更新成功，重置一下表单内容
        $('.layui-form')[0].reset()
      }
    })
  })
})