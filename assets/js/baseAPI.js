var baseURL = 'http://ajax.frontend.itheima.net'
$.ajaxPrefilter(function (options) {
  options.url = baseURL + options.url
  // 统一为有权限的接口配置headers请求头
  if (options.url.indexOf('/my/') !== -1) {
    options.headers = {
      Authorization: localStorage.getItem('token') || ''
    }
  }
  options.complete = function (res) {
    if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
      // 如果服务器返回的status不为1且,message不是失败,就清空token,跳转页面
      localStorage.removeItem('token')
      location.href = '/login.html'
    }
  }
})