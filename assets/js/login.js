$(function () {
  // 点击“去注册账号”的连接
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })
  //点击“去登陆”的链接
  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })

  //从 layui 中获取form对象
  var form = layui.form
  // 通过form.verify() 函数自定义校验规则
  form.verify({
    //自定义了叫 pwd的校验规则
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

    // 校验两次密码是否一致的规则
    repwd: function (value) {
      // value是确认密码框中的内容，还需要密码框的内容，然后判断，如果不成立return即可
      var pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return '两次密码不一致!'
      }
    }

  })

  var layer = layui.layer
  // 注册
  $('#form_reg').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/api/reguser',
      data: {
        username: $('.reg-box [name=username]').val(),
        password: $('.reg-box [name=password]').val()
      },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('注册成功')
        $('#link_login').click()
        $('#form_reg')[0].reset()
      }
    })
  })
  // 登录
  $('#form_login').submit(function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/api/login',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('注册成功')
        localStorage.setItem('token', res.token)
        location.href = '/index.html'
      }
    })
  })
})