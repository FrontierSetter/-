// ======== 获取时间戳 =================

Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

// 获取dayLength天前的时间戳
function getTimeHour(dayLength){
    var curDate = new Date();
    var time = curDate.getTime() - 24 * 60 * 60 * 1000 * dayLength;
    var yesday = new Date(time); // 获取的是前几天日期
    var yesdatHour = yesday.Format("yyyy-MM-dd+hh");

    console.log(yesdatHour)

    return yesdatHour;

    // yesdatHour = yesday.getFullYear() 
    // yesdatHour += "-" + (yesday.getMonth() >= 9 ? (yesday.getMonth() + 1) : "0" + (yesday.getMonth() + 1))
    // yesdatHour += "-" + (yesday.getDate() > 9 ? (yesday.getDate()) : "0" + (yesday.getDate()));
    // yesdatHour += "-" + (yesday.getHours() > 9 ? (yesday.getHours()) : "0" + (yesday.getHours()));
}

// ======== 百度 坐标转换 =================

function wgs84tobdpoint(long, lati){
    var curGcjCoord = coordtransform.wgs84togcj02(long, lati);
    var curBaiduCoord = coordtransform.gcj02tobd09(curGcjCoord[0], curGcjCoord[1]);
    
    var curPoint = new BMapGL.Point(curBaiduCoord[0], curBaiduCoord[1]);

    return curPoint;
}

function switchToLive(){
    console.log("switchToLive")
    parent.slideLeft();
}