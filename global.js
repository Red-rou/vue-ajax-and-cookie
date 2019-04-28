

/**
 * reqData:请求参数 json对象
 * url：请求地址
 * callback:回调函数，参数1 错误时返回，参数2,请求成功时返回
 */
global.ajax = (reqData, url,callback) => {
    var xhr = null;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else {
      xhr = new ActiveXObject("Microsoft.XMLHTTP")
    }
    var oData = new FormData();
    
    for (const key in reqData) {
      oData.append(key, reqData[key])
    }
    // 2. 设置请求参数。
    xhr.open("post", url, true);
    //  3. 将请求提交给服务器
    xhr.send(oData);
    // 4. 等待服务器响应。
    xhr.onreadystatechange = function () {
      if (4 == xhr.readyState && 200 == xhr.status) {
        try {
          callback(null,JSON.parse(xhr.responseText))
        } catch (error) {
          callback(null,xhr.responseText)
        }
        
      } else if (4 == xhr.readyState) {
        callback(xhr.status,JSON.parse(xhr.responseText))
      }
    }
  }

global.cookie = {}

/**
* 设置cookie
* @param {String} name  cookie名称
* @param {String} value cookie值
* @param {Number} time 过期时间 分钟
*/
global.cookie.setValue = (name, value, minute) => {
  let va = escape(value)
  let data = new Date()
  if (minute) {
    data.setTime(data.getTime() + 1000 * 60 * minute)
    document.cookie = `${name}=${va};expires=${data.toUTCString()}`
  } else {
    document.cookie = `${name}=${va}` //当前会话关闭就超时
  }

}


/**
 * return 包含当前cookie值的对象 
 */
global.cookie.getAll = () => {
  let coo = document.cookie
  if (coo == '') {
    return null
  }
  //清除空格
  coo = coo.replace(/\s+/g, '')
  let cArr = coo.split(';')
  let cookies = {}
  cArr.forEach((coo) => {
    let c = coo.split('=')
    cookies[c[0]] = unescape(c[1])
  })
  return cookies
}
/**
 * 删除指定cookie
 * @param {String} name 要删除的cookie名称
 */
global.cookie.clear = (name) => {
  cookie.setValue(name, '', -1)
}
/**
 * 删除所有cookie
 */
global.cookie.clearAll = () => {
  let cs = cookie.getAll()
  if (cs) {
    for (key in cs) {
      cookie.clear(key)
    }
  }
}