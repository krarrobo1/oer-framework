export const timeConverter = (unixTimeStamp) => {
    var a = new Date(unixTimeStamp * 1000)
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    var year = a.getFullYear()
    var month = months[a.getMonth()]
    var date = a.getDate()
    var hour = a.getHours()
    var min = a.getMinutes()
    var sec = a.getSeconds()
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec
    return time
  }