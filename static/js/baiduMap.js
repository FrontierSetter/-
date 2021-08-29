//* 地图初始化 
var map = new BMapGL.Map("main5");

map.centerAndZoom(new BMapGL.Point(121.447176,31.033731),16);

map.setMapStyleV2({     
    styleId: '0c4e2c205d522daab0c5090baf1e0163'
  });

map.enableScrollWheelZoom(true);    //允许滚轮缩放地图
var top_left_control = new BMapGL.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});// 左上角，添加比例尺
var top_left_navigation = new BMapGL.NavigationControl();  //左上角，添加默认缩放平移控件
var top_right_navigation = new BMapGL.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}); //右上角，仅包含平移和缩放按钮

map.addControl(top_right_navigation);

// * 周边子图状态转换函数
function subfigBackToBackground(){
    // 如果本来就是全局模式，则不用动
    if(shouldMapGlobal){
        return;
    }else{
        console.log("subfigBackToBackground");
        menuGlobal();
        turn_all_to_front()
        setTimeout(function(){myChart1_1.resize();}, 3005);
        setTimeout(function(){myChart2_1.resize();}, 3005);
        setTimeout(function(){myChart7_1.resize();}, 3005);
    }
}

function sunfigEnterSingle(){
    // 如果本来就是单车模式，则不用动
    if(!shouldMapGlobal){
        return;
    }else{
        console.log("sunfigEnterSingle");
        menuSingle();
        turn_all_to_back();
        // setTimeout(function(){myChart1_2.resize();}, 3005);
        setTimeout(function(){myChart2_2.resize();}, 3005);
        setTimeout(function(){myChart7_2.resize();}, 3005);
    }
}

// * 右键菜单
var menu_all = new BMapGL.ContextMenu();
// single,global,disabled
var txtMenuItem_all = [
    {
        text:'返回全局模式',
        callback:function(){subfigBackToBackground();},
        mode:'disabled'
    },
    {
        text:'进入单车模式',
        callback:function(){sunfigEnterSingle();},
        mode:'disabled'
    },
    {
        text:'显示/隐藏纠偏后轨迹',
        callback:function(){
        },
        mode:'disabled'
    },
    {
        text:'播放轨迹动画',
        callback:function(){
            
        },
        mode:'disabled'
    },
];

for(var i=0; i < txtMenuItem_all.length; i++){
    menu_all.addItem(new BMapGL.MenuItem(txtMenuItem_all[i].text,txtMenuItem_all[i].callback,100));
}

for(var i = 0; i < txtMenuItem_all.length; ++i){
    if(txtMenuItem_all[i].mode != 'disabled'){
        menu_all.getItem(i).enable();
    }
}

function menuGlobal(){
    for(var i = 0; i < txtMenuItem_all.length; ++i){
        if(txtMenuItem_all[i].mode == 'global'){
            menu_all.getItem(i).enable();
        }else{
            menu_all.getItem(i).disable();
        }
    }
}

function menuSingle(){
    for(var i = 0; i < txtMenuItem_all.length; ++i){
        if(txtMenuItem_all[i].mode == 'single'){
            menu_all.getItem(i).enable();
        }else{
            menu_all.getItem(i).disable();
        }
    }
}


map.addContextMenu(menu_all);
menuGlobal();

// 本地坐标转换库样例
// var gcj02tobd09 = coordtransform.gcj02tobd09(116.404, 39.915);

// *地图车辆贴图
var iconOnline = new BMapGL.Icon(server_ip+"circle-blue.png", new BMapGL.Size(25, 25));
var iconOffline = new BMapGL.Icon(server_ip+"circle-green.png", new BMapGL.Size(25, 25));
var iconCharging = new BMapGL.Icon(server_ip+"icon-blue-small.gif", new BMapGL.Size(25, 25));
var iconInitmode = new BMapGL.Icon(server_ip+"icon-purple-small.gif", new BMapGL.Size(25, 25));
var iconPoweron = new BMapGL.Icon(server_ip+"icon-yellow-small.gif", new BMapGL.Size(25, 25));
var iconUnknown = new BMapGL.Icon(server_ip+"circle-yellow.png", new BMapGL.Size(25, 25));

var iconStart = new BMapGL.Icon("start.png", new BMapGL.Size(25, 25));
var iconEnd = new BMapGL.Icon("final.png", new BMapGL.Size(25, 25));

var iconArr = new Array();
iconArr.push(iconOnline,iconOffline, iconCharging, iconInitmode, iconPoweron, iconUnknown);

// *全局事件同步变量
var shouldMapGlobal = true; //用来获取整个网页属于全局/单车粒度
var needUpdateMap = true; //用来控制鼠标悬停弹出信息窗口时，不更新地图

// function wgs84tobdpoint(long, lati){
//     var curGcjCoord = coordtransform.wgs84togcj02(long, lati);
//     var curBaiduCoord = coordtransform.gcj02tobd09(curGcjCoord[0], curGcjCoord[1]);
    
//     var curPoint = new BMapGL.Point(curBaiduCoord[0], curBaiduCoord[1]);

//     return curPoint;
// }

// *全局查询
var backgroundCarOverlayOld = new Array();
var backgroundCarOverlayNew = new Array();

function backgroundRequest(){
    if(!shouldMapGlobal){
        return;
    }else{
        $.ajax({
            // [{"Vin":"LL3ABCJ22KA011491","Longitude":118.0033,"Latitude":24.5253},{"Vin":"LL3ACCJ22JA011664","Longitude":118.0034,"Latitude":24.5251},{"Vin":"LL3ACCJ27JA011515","Longitude":118.0044,"Latitude":24.5253}]
            url: server_ip+'api/car_location_and_status', //请求的url
            type: 'get', //请求的方式
            error: function (data) {
                console.log('backgroundRequest请求失败');
            },
            success: function (data) {
                // console.log('backgroundRequest请求成功');
                // console.log("length: "+data.length);

                // 不用过滤了
                // console.log("before filter"+data.length);
                // filterBackgroundRequest(data);
                // console.log("after filter"+filteredData.length)

                // var curTime = new Date().getTime();

                filteredData = data;

                for(var i = 0; i < filteredData.length; ++i){
                    // var curType = getMode(filteredData[i]['collectTime'], curTime);
                    var curType = 0; // 默认为启动状态

                    if(filteredData[i]['Status'] == 'ready'){
                        curType = 0;
                    }else if(filteredData[i]['Status'] == 'keyoff'){
                        curType = 1;
                    }else{
                        curType = 5;
                    }

                    if(!rawPointValid(filteredData[i]['Longitude'], filteredData[i]['Latitude'])){
                        continue;
                    }

                    var curPoint = wgs84tobdpoint(filteredData[i]['Longitude'], filteredData[i]['Latitude']);

                    var marker = new BMapGL.Marker(curPoint);
                    marker.setIcon(iconArr[curType]);

                    var content = filteredData[i]['Vin'];
                    addMouseHandler(content, marker);

                    backgroundCarOverlayNew.push(marker);
                }

                if(shouldMapGlobal && needUpdateMap){
                    drawOverlay();
                }

                if(shouldMapGlobal){
                    setTimeout(function(){
                        backgroundRequest();
                    }, 3000);
                }
            }
        });
    }

}

// 金总写的后台sql语句有问题，会导致数据重复，但是用nodejs写的我不会改，所以增加一部分前端复杂度
    var filterDic = {}
    var filteredData = new Array();

    // 过滤全局模式车辆坐标请求返回信息中的重复内容
    function filterBackgroundRequest(data){
        filterDic = {};
        for(var i = 0; i < data.length; ++i){
            var tem_key = data[i]['VIN']
            if(filterDic.hasOwnProperty(tem_key) && (Date.parse(filterDic[tem_key]['collectTime']) >= Date.parse(data[i]['collectTime']))){
                continue;
            }else{
                filterDic[tem_key] = data[i];
            }
        }

        filteredData = new Array();
        for(var k in filterDic){
            filteredData.push(filterDic[k]);
        }

    }

function addMouseHandler(content,marker){
    marker.addEventListener("mouseover",function(e){
        this.getPosition();
        needUpdateMap = false;
        openInfo(content, e);
    });
    marker.addEventListener("mouseout",function(e){
        needUpdateMap = true;
    });

}

function openInfo(content, e){
    var p=e.target;
    
    var opts = {
        // width : 50px,     // 信息窗口宽度
        // height: '10%',     // 信息窗口高度
        title : '车辆编号'  // 信息窗口标题
    }

    var point=new BMapGL.Point(p.getPosition().lng, p.getPosition().lat);
    var infoWindow = new BMapGL.InfoWindow(content, opts);
    map.openInfoWindow(infoWindow, point);
}

function drawOverlay(){
    // console.log("drawOverlay")
    // console.log(backgroundCarOverlayOld)
    // console.log(backgroundCarOverlayNew)
    var shouldZoom = false;
    bPoints = new Array();

    if(backgroundCarOverlayOld.length == 0){
        shouldZoom = true;
    }else{
        for(var i = 0; i < backgroundCarOverlayOld.length; ++i){
            map.removeOverlay(backgroundCarOverlayOld[i]);
        }
    }
    backgroundCarOverlayOld = new Array();
    for(var i = 0; i < backgroundCarOverlayNew.length; ++i){
        if(shouldMapGlobal){
            if(shouldZoom){
                bPoints.push(backgroundCarOverlayNew[i].getPosition())
            }
            map.addOverlay(backgroundCarOverlayNew[i]);
        }
        backgroundCarOverlayOld.push(backgroundCarOverlayNew[i]);
    }
    backgroundCarOverlayNew = new Array();

    if(shouldZoom && shouldMapGlobal){
        var view = map.getViewport(bPoints);
        var mapZoom = view.zoom;
        var centerPoint = view.center;
        map.centerAndZoom(centerPoint, mapZoom);
    }
}

var activeThreshold = 1000*60*3;

function getMode(logTime, curTime){
    var tem = Date.parse(logTime);
    if(curTime-tem > activeThreshold){
        return 1; //表示未知
    }else{
        return 0; //表示运行中
    }
}

// *单车查询

var curCarVin;
var eagleEntity;
var singleCarTraceInitFinish = false; // 防止单车初始化和单车查询冲突


function do_initRequestSingleCar(requestIdValue){
    console.log('single start');

    shouldMapGlobal = false;
    map.clearOverlays();

    

    // TODO:鹰眼轨迹纠偏
    // eagleEntity = Date.parse(new Date()).toString()+"_"+curCarVin;

    requestSingleCarTrace();

    // requestSingleCarHistory();

    // console.log('request History finish'+ curSingleMode);
}

var singleCarFilteredPoints = new Array();
var singleCarTranslatedPoints = new Array();

function requestSingleCarTrace(){
    singleCarTraceInitFinish = false;
    $.ajax({
        url: 'http://202.120.60.31:4000/query/single/route', //请求的url
        type: 'get', //请求的方式
        data: 'car_VIN='+curCarVin+'&limit='+queryLimit,
        error: function (data) {
            console.log('requestSingleCarTrace请求失败');
        },
        success: function (data) {
            console.log('请求到的历史轨迹长度: '+data.length);
            singleCarTranslatedPoints = new Array();
            singleCarFilteredPoints = new Array();
            // TODO:鹰眼轨迹纠偏
            // singleCarEagleRawData = new Array();
            singleCarFilteredPointsIdx = 0;
            singleCarTranslatedPointsIdx = 0;

            filterTrace(data);
            // TODO:鹰眼轨迹纠偏
            // constructEagleTrace(data,eagleEntity);
            // createEagleTrace(eagleEntity);
            translateTrace();
        }
        
    });

}

function translateTrace(){
    console.log('translateTrace');
    for(var i = 0; i < singleCarFilteredPoints.length; ++i){
        var curPoint = wgs84tobdpoint(singleCarFilteredPoints[i].lng, singleCarFilteredPoints[i].lat);
        singleCarTranslatedPoints.push(curPoint);
    }
    do_singleCarTrace()
}

function do_singleCarTrace(){
    console.log('do_singleCarTrace');
    if(singleCarTranslatedPoints.length == 0){
        alert('no history trace');
        return;
    }

    curOldOverlayHandler = new BMapGL.Marker(singleCarTranslatedPoints[0]);
    curOldOverlayHandler.setIcon(iconStart);
    map.addOverlay(curOldOverlayHandler)
    curOldOverlayHandler.setAnimation(BMAP_ANIMATION_DROP);//跳动的动画

    // TODO: 鹰眼轨迹
    // var startTime = singleCarEagleRawData[0]['loc_time'];
    // var endTime = singleCarEagleRawData[0]['loc_time'];
    // for(var i = 0; i < singleCarEagleRawData.length; ++i){
    //     if(singleCarEagleRawData[i]['loc_time'] > endTime){
    //         endTime = singleCarEagleRawData[i]['loc_time']
    //     }
    //     if(singleCarEagleRawData[i]['loc_time'] < startTime){
    //         startTime = singleCarEagleRawData[i]['loc_time']
    //     }
    // }
    // getEagleTrace(eagleEntity, startTime, endTime);

    polylineNaive = new BMapGL.Polyline(singleCarTranslatedPoints, { strokeColor: "#5470C6", strokeWeight: 5, strokeOpacity: 0.8 });
    map.addOverlay(polylineNaive);
    // console.log('do_singleCarTrace 2');

    curNewOverlayHandler = new BMapGL.Marker(singleCarTranslatedPoints[singleCarTranslatedPoints.length-1]);
    curNewOverlayHandler.setIcon(iconEnd);
    var content = curCarVin;
    map.addOverlay(curNewOverlayHandler)
    curNewOverlayHandler.setAnimation(BMAP_ANIMATION_BOUNCE);//跳动的动画
    addMouseHandler(content, curNewOverlayHandler);

    singleCarTraceInitFinish = true;

}


function filterTrace(data){
    console.log('过滤前的历史轨迹长度: '+data.length);
    for(var i = 0; i < data.length; ++i){

        if(!rawPointValid(data[i]['longitude'], data[i]['latitude'])){
            continue;
        }

        var curPoint = new BMapGL.Point(data[i]['longitude'], data[i]['latitude']);
        if(singleCarFilteredPoints.length == 0 || !curPoint.equals(singleCarFilteredPoints[singleCarFilteredPoints.length-1])){
            singleCarFilteredPoints.push(curPoint);
        }
    }
    console.log('过滤完的历史轨迹长度: '+singleCarFilteredPoints.length);
}

// TODO:厦门坐标筛选
function rawPointValid(lon, lat){
    if (lon == null || lat == null) {
        return false;
    }
    if (lon > 136 || lon < 70 || lat > 60 || lat < 10) {
        return false;
    }
    return true;
}
