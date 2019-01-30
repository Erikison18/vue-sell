/**
 * 解析url参数
 * @example ?id=123456&a=b
 * @return  Object {id: 123456, a:b}
 */
export function urlParse () {
  let url = window.location.href
  let obj = {}
  let reg = /[?&][^?&]+=[^?&]+/g
  let arr = url.match(reg)
  // ['?id=123456', '&a=b']
  if (arr) {
    arr.forEach((item) => {
      let temArr = item.substring(1).split('=')
      let key = decodeURIComponent(temArr[0])
      let val = decodeURIComponent(temArr[1])
      obj[key] = val
    })
  }
  console.log(obj)
  return obj
}
