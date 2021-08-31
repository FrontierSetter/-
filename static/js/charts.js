// ======== 车辆累计行驶里程 =================
option_global_mile_time = {
    grid: {
        left: '0',
        top: '30',
        right: '0',
        bottom: '10',
        containLabel: true
    },
    legend: {
        show: false,
        top: 0,
        textStyle: {
            color: "#fff",
        },

        itemWidth: 10, // 设置宽度
        itemHeight: 10, // 设置高度
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    xAxis: {
        type: 'category',
        data: ["车1", "车2", "车3", "车4", "车5", "车6"],
        axisTick: { //---坐标轴 刻度
            show: false, //---是否显示
        },
        axisLine: { //---坐标轴 轴线
            show: true, //---是否显示
            lineStyle: {
                color: 'rgba(255,255,255,.1)',
                width: 1,
                type: 'dotted',
            },
        },
        axisLabel: { //X轴文字
            show:false,
            textStyle: {
                fontSize: 12,
                color: '#fff'
            },
        },
    },
    yAxis: {
        type: 'value',
        splitLine: { //分割线
            show: true,
            lineStyle: {
                color: 'rgba(255,255,255,.1)',
                width: 1,
                type: 'dotted'
            }
        },
        axisLabel: { //Y轴刻度值
            formatter: '{value}',
            textStyle: {
                fontSize: 12,
                color: '#fff'
            },
        },
        axisLine: { //---坐标轴 轴线
            show: false, //---是否显示
        },
    },
    dataZoom: [
        {
            type: 'inside',
        },
    ],
    series: [{
        name: '累计行驶里程',
        type: 'bar',
        data: [13, 27, 34, 19, 32, 35],
        // barWidth: 15,
        // barGap: 0.5, //柱子之间间距 //柱图宽度      两种情况都要设置，设置series 中对应数据柱形的itemStyle属性下的emphasis和normal的barBorderRadius属性初始化时候圆角  鼠标移上去圆角
        itemStyle: {
            normal: {
                barBorderRadius: 50,
                color: "#446ACF",
            }
        },
    }]
};

function requestGlobalMileage(){
    curMileage = []
    curTime = []
    curVin = []
    $.ajax({
        // 3
        url: server_ip+'api/global_car_mileage', //请求的url
        type: 'get', //请求的方式
        error: function (data) {
            console.log('requestGlobalMileage请求失败');
        },
        success: function (data) {

            data.sort(function(a,b){
                // js的sort是根据正负判断的，所以不能返回true/false
                return (b['Mileage'] - a['Mileage']);
            })

            for(var i = 0; i < data.length; ++i){
                if(data[i]['Mileage'] > 100000000 || data[i]['Vin'] == ''){
                    continue;
                }

                curVin.push(data[i]['Vin'])
                curMileage.push(data[i]['Mileage'])
                // 因为现在没有时长信息，所以留空
                // curTime.push()
            }

            option_global_mile_time['series'][0]['data'] = curMileage
            // option_global_mile_time['series'][1]['data'] = curTime
            option_global_mile_time['xAxis']['data'] = curVin

            myChart1_1.setOption(option_global_mile_time, true);

            // // TODO: request的时间最好错开
            // setTimeout(function(){
            //     requestGlobalMileage();
            // }, 3000);
        }
    });
}


option_single_mile_time = {
    grid: {
        left: '0',
        top: '30',
        right: '0',
        bottom: '10',
        containLabel: true
    },
    legend: {
        top: 0,
        textStyle: {
            color: "#fff",
        },

        itemWidth: 10, // 设置宽度
        itemHeight: 10, // 设置高度
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    xAxis: {
        type: 'category',
        data: ["六天前", "五天前", "四天前", "三天前", "两天前", "一天前"],
        axisTick: { //---坐标轴 刻度
            show: true, //---是否显示
        },
        axisLine: { //---坐标轴 轴线
            show: true, //---是否显示
            lineStyle: {
                color: 'rgba(255,255,255,.1)',
                width: 1,
                type: 'dotted',
            },
        },
        axisLabel: { //X轴文字
            textStyle: {
                fontSize: 12,
                color: '#fff'
            },
        },
    },
    yAxis: {
        type: 'value',
        splitLine: { //分割线
            show: true,
            lineStyle: {
                color: 'rgba(255,255,255,.1)',
                width: 1,
                type: 'dotted'
            }
        },
        axisLabel: { //Y轴刻度值
            formatter: '{value}',
            textStyle: {
                fontSize: 12,
                color: '#fff'
            },
        },
        axisLine: { //---坐标轴 轴线
            show: false, //---是否显示
        },
    },
    series: [{
        name: '累计行驶里程',
        type: 'bar',
        data: [1, 7, 3, 6, 3, 8],
        barWidth: 15,
        barGap: 0.5, //柱子之间间距 //柱图宽度      两种情况都要设置，设置series 中对应数据柱形的itemStyle属性下的emphasis和normal的barBorderRadius属性初始化时候圆角  鼠标移上去圆角
        itemStyle: {
            normal: {
                barBorderRadius: 50,
                color: "#446ACF",
            }
        },
    }, {
        name: '累计行驶时长',
        type: 'bar',
        data: [6, 3, 5, 2, 5, 6],
        barWidth: 15, //柱图宽度
        barGap: 0.5,
        itemStyle: {
            normal: { //设置颜色的渐变
                barBorderRadius: 50,
                color: "#4fb69d",
            }
        },
    }]
};


// ======== 车辆状态曲线 =================
option_car_status = {

    tooltip: { //鼠标指上时的标线
        trigger: 'axis',
        axisPointer: {
            lineStyle: {
                color: '#fff'
            }
        }
    },
    legend: {
        icon: 'rect',
        itemWidth: 14,
        itemHeight: 5,
        itemGap: 13,
        data: ['off', 'on'],
        right: '10px',
        top: '0px',
        textStyle: {
            fontSize: 12,
            color: '#fff'
        }
    },
    grid: {
        x: 35,
        y: 25,
        x2: 8,
        y2: 25,
    },
    xAxis: [{
        type: 'category',
        boundaryGap: false,
        axisLine: {
            lineStyle: {
                color: '#57617B'
            }
        },
        axisLabel: {
            textStyle: {
                color: '#fff',
            },
        },
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    }],
    yAxis: [{
        type: 'value',
        axisTick: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#57617B',

            }
        },
        axisLabel: {
            margin: 10,
            textStyle: {
                fontSize: 14
            },
            textStyle: {
                color: '#fff',
            },
        },
        splitLine: {
            lineStyle: {
                color: 'rgba(255,255,255,.2)',
                type: 'dotted',
            }
        }
    }],
    dataZoom: [
        {
            type: 'inside',
        },
    ],
    series: [{
        name: 'off',
        type: 'line',
        stack:'总量',
        smooth: true,
        lineStyle: {
            normal: {
                width: 2
            }
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(0, 136, 212, 0.3)'
                }, {
                    offset: 0.8,
                    color: 'rgba(0, 136, 212, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
            }
        },
        // itemStyle: {
        //     normal: {
        //         color: 'rgb(137,189,27)'
        //     }
        // },
        data: [20, 35, 34, 45, 52, 41, 49, 64, 24, 52.4, 24, 33]
    }, {
        name: 'on',
        type: 'line',
        stack:'总量',
        smooth: true,
        lineStyle: {
            normal: {
                width: 2
            }
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(137, 189, 27, 0.3)'
                }, {
                    offset: 0.8,
                    color: 'rgba(137, 189, 27, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
            }
        },
        
        // itemStyle: {
        //     normal: {
        //         color: 'rgb(0,136,212)'
        //     }
        // },
        data: [97.3, 99.2, 99.3, 100.0, 99.6, 90.6, 80.0, 91.5, 69.8, 67.5, 90.4, 84.9]
    }, 
    // {
    //     name: '大型车',
    //     type: 'line',
    //     smooth: true,
    //     lineStyle: {
    //         normal: {
    //             width: 2
    //         }
    //     },
    //     areaStyle: {
    //         normal: {
    //             color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
    //                 offset: 0,
    //                 color: 'rgba(219, 50, 51, 0.3)'
    //             }, {
    //                 offset: 0.8,
    //                 color: 'rgba(219, 50, 51, 0)'
    //             }], false),
    //             shadowColor: 'rgba(0, 0, 0, 0.1)',
    //             shadowBlur: 10
    //         }
    //     },
    //     itemStyle: {
    //         normal: {
    //             color: 'rgb(219,50,51)'
    //         }
    //     },
    //     data: [84.2, 81.0, 67.5, 62.1, 43.7, 68.5, 51.9, 71.8, 76.7, 67.6, 62.9, 0]
    // }, 
    ]
};

function requestCarStatus(){
    curTime = []
    curOn = []
    curOff = []
    $.ajax({
        // 3
        url: server_ip+'api/global_car_status_history', //请求的url
        type: 'get', //请求的方式
        data: "st="+getTimeHour(7)+"&et="+getTimeHour(0),
        error: function (data) {
            console.log('requestCarStatus请求失败');
        },
        success: function (data) {
            // console.log(data)
            for(var i = 0; i < data.length; ++i){
                curOn.push(data[i]["On"]);
                curOff.push(data[i]["Off"]);
                curTime.push(data[i]["T"]);
            }

            // console.log(curOn)
            // console.log(curOff)
            // console.log(curTime)


            option_car_status['series'][1]['data'] = curOn
            option_car_status['series'][0]['data'] = curOff
            option_car_status['xAxis'][0]['data'] = curTime

            myChart2_1.setOption(option_car_status);

            // // TODO: request的时间最好错开
            // setTimeout(function(){
            //     requestCarStatus();
            // }, 3000);
        }
    });
}

// ======== 车辆告警信息 =================
// TODO: warningID 应该来自服务器
var WarningId = 5;

function createWarningInfo(dict){
    var result = ''
    result += '<p>车辆告警详情:</p><ul>'

    for(var key in dict){
        result += '<li><strong>'+key+'</strong> '+dict[key]+'</li>'
    }

    result += '</ul>'

    return result;

}

function requestWarning(){
    curTime = []
    curOn = []
    curOff = []
    $.ajax({
        // 3
        url: server_ip+'api/alarm_info_total', //请求的url
        type: 'get', //请求的方式
        // data: "st="+getTimeHour(31)+"&et="+getTimeHour(0),
        error: function (data) {
            console.log('requestWarning请求失败');
        },
        success: function (data) {
            // console.log(data)

            for(var curVin in data){
                for(var i = 0; i < data[curVin].length; ++i){
                    add_warning_withpara(WarningId, curVin, curVin, createWarningInfo(data[curVin][i]))
                    WarningId += 1;
                }
            }
        }
    });
}

// =========== 车辆位置分布旭日图 =======================

option_car_position = {
    series: {
        type: 'sunburst',
        label: {
            rotate: 'radial',
            minAngle: 20
        },
        // 圆角不好看
        // itemStyle: {
        //     borderRadius: 7,
        //     borderWidth: 3,
        //     borderColor: 'rgba(6,20,54, 1)'
        // },
        emphasis: {
            label: {
                formatter: '{b}\n{c}',
            },
            // labelLine:{
            //     show: true,
            // },
            focus: 'ancestor'
        },
        radius: [0, '100%'],
        data: []
    }
};

var car_point_arr = new Array();
var car_position = {};
var index = 0;
var myGeo = new BMapGL.Geocoder();
var echartCircleData = new Array();

function carPositionRequest(){
    $.ajax({
        url: server_ip+'api/car_location_and_status', //请求的url
        type: 'get', //请求的方式
        error: function (data) {
            console.log('carPositionRequest请求失败');
        },
        success: function (data) {
            filteredData = data;

            for(var i = 0; i < filteredData.length; ++i){
                if(!rawPointValid(filteredData[i]['Longitude'], filteredData[i]['Latitude'])){
                    continue;
                }

                var curPoint = wgs84tobdpoint(filteredData[i]['Longitude'], filteredData[i]['Latitude']);

                car_point_arr.push(curPoint);
            }

            index = 0;
            bdGEO();
        }
    });
}

function bdGEO(){	
    if(index >= car_point_arr.length){
        // console.log(car_position);
        createCircleData();
        return;
    }
    var pt = car_point_arr[index];
    geocodeSearch(pt);
    index++;

}

function geocodeSearch(pt){
    myGeo.getLocation(pt, function(rs){
        var addComp = rs.addressComponents;
        curProvince = addComp.province;
        curCity = addComp.city;
        curDistrict = addComp.district;

        if(!(curProvince in car_position)){
            car_position[curProvince] = {}
        }
        if(!(curCity in car_position[curProvince])){
            car_position[curProvince][curCity] = {}
        }
        if(!(curDistrict in car_position[curProvince][curCity])){
            car_position[curProvince][curCity][curDistrict] = 0;
        }

        car_position[curProvince][curCity][curDistrict] += 1;

        // console.log("结构化数据(" + addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber + ")")
        
        bdGEO();
    });
}

function createCircleData(){
    var i = -1, j = -1;
    for(curProvince in car_position){
        // console.log(curProvince)
        echartCircleData.push({
            'name': curProvince,
            'children': []
        })
        ++i;
        j=-1;
        // console.log(echartCircleData)
        for(curCity in car_position[curProvince]){
            // console.log(curCity)
            echartCircleData[i]['children'].push({
                'name': curCity,
                'children': []
            })
            ++j
            // console.log(echartCircleData)
            for(curDistrict in car_position[curProvince][curCity]){
                // console.log(curDistrict)
                echartCircleData[i]['children'][j]['children'].push({
                    'name': curDistrict,
                    'value': car_position[curProvince][curCity][curDistrict]
                })
            }
        }
    }

    // console.log(echartCircleData)

    option_car_position['series']['data'] = echartCircleData;

    myChart7_1.setOption(option_car_position, true);
}

carPositionRequest();

// =========== 车辆充电行驶散点图 =======================

var option_car_time = {
    grid: {
        left: '0',
        top: '30',
        right: '5%',
        bottom: '25',
        containLabel: true
    },
    tooltip: { //鼠标指上时的标线
        trigger: 'item',
        formatter: function (param) {
            return param.data[3]+"：<br />充电"+(param.data[0]/3600).toFixed(2)+"小时，行驶"+(param.data[1]/3600).toFixed(2)+"小时，<br />行驶"+param.data[2]+"千米";
        },
    },
    dataZoom: [{
        type: 'inside'
    },  {
        type: 'inside',
        orient: 'vertical'
    }],
    xAxis: {
        name:'\n充电时长（秒）',
        nameLocation:'middle',
        nameTextStyle:{
            fontSize: 12,
            color: '#fff'
        },
        splitLine: {
            lineStyle: {
                color: 'rgba(255,255,255,.1)',
                width: 1,
                type: 'dashed'
            }
        },
        axisLine: { //---坐标轴 轴线
            show: true, //---是否显示
            lineStyle: {
                color: 'rgba(255,255,255,.1)',
                width: 1,
                type: 'dotted',
            },
        },
        axisLabel: { //X轴文字
            show:true,
            textStyle: {
                fontSize: 12,
                color: '#fff'
            },
        },
    },
    yAxis: {
        name:'行驶时长（秒）',
        nameTextStyle:{
            fontSize: 12,
            color: '#fff'
        },
        splitLine: {
            lineStyle: {
                color: 'rgba(255,255,255,.1)',
                width: 1,
                type: 'dashed'
            }
        },
        axisLine: { //---坐标轴 轴线
            show: true, //---是否显示
            lineStyle: {
                color: 'rgba(255,255,255,.1)',
                width: 1,
                type: 'dotted',
            },
        },
        axisLabel: { //X轴文字
            show:true,
            textStyle: {
                fontSize: 12,
                color: '#fff'
            },
        },
        scale: true,
    },
    series: [{
        name: 'last 30 days',
        data: [],
        type: 'scatter',
        symbolSize: function (data) {
            return Math.sqrt(data[2])/10;
        },
        emphasis: {
            focus: 'self',
        },
        itemStyle: {
            shadowBlur: 10,
            // 深色底的情况下，原本的阴影不管用了
            shadowColor: 'rgba(25, 100, 150, 0.5)',
            shadowOffsetY: 5,
            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                offset: 0,
                color: 'rgba(0, 136, 212, 0.3)'
            }, {
                offset: 1,
                color: 'rgba(0, 136, 212, 1)'
            }])
        }
    }]
};

function carTimeScatterRequest(){
    $.ajax({
        url: server_ip+'api/charge_time', //请求的url
        type: 'get', //请求的方式
        data: "st="+getTimeSecond(7)+"&et="+getTimeSecond(0),
        error: function (data) {
            console.log('carTimeScatterRequest请求失败');
        },
        success: function (data) {
            result_data = new Array();

            for(var i = 0; i < data.length; ++i){
                if(data[i]['Mileage'] <= 0){
                    continue;
                }

                result_data.push([data[i]['ChargeTime'], data[i]['DriveTime'], data[i]['Mileage'], data[i]['Vin']])
            }

            option_car_time['series'][0]['data'] = result_data;
            // console.log(result_data);

            myChart3.setOption(option_car_time, true);

        }
    });
}

carTimeScatterRequest()