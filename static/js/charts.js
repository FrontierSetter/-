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
        },
        confine: true,
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
        emphasis: {
            itemStyle: {
                color: 'rgba(137, 189, 27, 1)'
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
        data: "st="+getTimeHour(3)+"&et="+getTimeHour(0),
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
    tooltip: {
        trigger: 'item',
        confine: true,
    },
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
            // 用了tooltip，就不用label了
            // label: {
            //     formatter: '{b}\n{c}',
            // },
            focus: 'ancestor'
        },
        radius: [0, '100%'],
        data: [
            {
                "name": "福建省",
                "children": [
                    {
                        "name": "厦门市",
                        "children": [
                            {
                                "name": "湖里区",
                                "value": 35
                            },
                            {
                                "name": "思明区",
                                "value": 40
                            },
                            {
                                "name": "海沧区",
                                "value": 1
                            },
                            {
                                "name": "翔安区",
                                "value": 5
                            }
                        ]
                    },
                    {
                        "name": "漳州市",
                        "children": [
                            {
                                "name": "龙海区",
                                "value": 2
                            }
                        ]
                    }
                ]
            },
            {
                "name": "广东省",
                "children": [
                    {
                        "name": "深圳市",
                        "children": [
                            {
                                "name": "南山区",
                                "value": 1
                            }
                        ]
                    },
                    {
                        "name": "珠海市",
                        "children": [
                            {
                                "name": "金湾区",
                                "value": 1
                            }
                        ]
                    },
                    {
                        "name": "佛山市",
                        "children": [
                            {
                                "name": "南海区",
                                "value": 1
                            }
                        ]
                    }
                ]
            },
            {
                "name": "浙江省",
                "children": [
                    {
                        "name": "嘉兴市",
                        "children": [
                            {
                                "name": "嘉善县",
                                "value": 5
                            },
                            {
                                "name": "桐乡市",
                                "value": 4
                            }
                        ]
                    }
                ]
            },
            {
                "name": "江苏省",
                "children": [
                    {
                        "name": "无锡市",
                        "children": [
                            {
                                "name": "滨湖区",
                                "value": 1
                            },
                            {
                                "name": "锡山区",
                                "value": 5
                            }
                        ]
                    },
                    {
                        "name": "苏州市",
                        "children": [
                            {
                                "name": "相城区",
                                "value": 35
                            },
                            {
                                "name": "常熟市",
                                "value": 1
                            }
                        ]
                    }
                ]
            },
            {
                "name": "湖南省",
                "children": [
                    {
                        "name": "衡阳市",
                        "children": [
                            {
                                "name": "雁峰区",
                                "value": 5
                            },
                            {
                                "name": "蒸湘区",
                                "value": 1
                            },
                            {
                                "name": "石鼓区",
                                "value": 1
                            }
                        ]
                    }
                ]
            },
            {
                "name": "北京市（省）",
                "children": [
                    {
                        "name": "北京市",
                        "children": [
                            {
                                "name": "大兴区",
                                "value": 1
                            },
                            {
                                "name": "通州区",
                                "value": 1
                            }
                        ]
                    }
                ]
            },
            {
                "name": "内蒙古自治区",
                "children": [
                    {
                        "name": "鄂尔多斯市",
                        "children": [
                            {
                                "name": "准格尔旗",
                                "value": 1
                            }
                        ]
                    }
                ]
            },
            {
                "name": "重庆市（省）",
                "children": [
                    {
                        "name": "重庆市",
                        "children": [
                            {
                                "name": "渝北区",
                                "value": 4
                            }
                        ]
                    }
                ]
            },
            {
                "name": "湖北省",
                "children": [
                    {
                        "name": "武汉市",
                        "children": [
                            {
                                "name": "蔡甸区",
                                "value": 3
                            }
                        ]
                    }
                ]
            },
            {
                "name": "上海市（省）",
                "children": [
                    {
                        "name": "上海市",
                        "children": [
                            {
                                "name": "浦东新区",
                                "value": 1
                            }
                        ]
                    }
                ]
            }
        ]
    }
};
myChart7_1.setOption(option_car_position, true);

var car_point_arr = new Array();
var car_position_vin_arr = new Array();  // 用来记录车辆Vin
var car_position = {};
var position_index = 0;
var myGeo = new BMapGL.Geocoder();
var echartCircleData = new Array();

var car_vin_to_district = {};    // 用来记录vin到区的映射，用于之后的数据联动
var position_to_car_vin = {
    "All": [
        "LL3ABCJ20KA010806",
        "LL3ABCJ20LA011300",
        "LL3ABCJ20LA011989",
        "LL3ABCJ20MA010083",
        "LL3ABCJ20MA010245",
        "LL3ABCJ20MA010780",
        "LL3ABCJ20MA010782",
        "LL3ABCJ20MA010827",
        "LL3ABCJ20MA010830",
        "LL3ABCJ21LA010172",
        "LL3ABCJ21LA011385",
        "LL3ABCJ21MA010495",
        "LL3ABCJ21MA010801",
        "LL3ABCJ21MA010819",
        "LL3ABCJ21MA010822",
        "LL3ABCJ22KA011491",
        "LL3ABCJ22LA010732",
        "LL3ABCJ22MA010084",
        "LL3ABCJ22MA010246",
        "LL3ABCJ22MA010490",
        "LL3ABCJ22MA010781",
        "LL3ABCJ22MA010828",
        "LL3ABCJ22MA010831",
        "LL3ABCJ23LA011386",
        "LL3ABCJ23LA011985",
        "LL3ABCJ23MA010496",
        "LL3ABCJ23MA010823",
        "LL3ABCJ24LA010621",
        "LL3ABCJ24LA010690",
        "LL3ABCJ24LA011381",
        "LL3ABCJ24MA010116",
        "LL3ABCJ24MA010247",
        "LL3ABCJ24MA010491",
        "LL3ABCJ24MA010779",
        "LL3ABCJ24MA010782",
        "LL3ABCJ24MA010827",
        "LL3ABCJ24MA010829",
        "LL3ABCJ24MA010832",
        "LL3ABCJ24MA010881",
        "LL3ABCJ25LA011387",
        "LL3ABCJ25LA011986",
        "LL3ABCJ25MA010497",
        "LL3ABCJ25MA010824",
        "LL3ABCJ26KA011350",
        "LL3ABCJ26LA011382",
        "LL3ABCJ26MA010248",
        "LL3ABCJ26MA010492",
        "LL3ABCJ26MA010816",
        "LL3ABCJ26MA010833",
        "LL3ABCJ27KA010737",
        "LL3ABCJ27LA011116",
        "LL3ABCJ27LA011987",
        "LL3ABCJ27MA010498",
        "LL3ABCJ27MA010825",
        "LL3ABCJ28KA010794",
        "LL3ABCJ28LA010170",
        "LL3ABCJ28LA010895",
        "LL3ABCJ28LA011299",
        "LL3ABCJ28LA011383",
        "LL3ABCJ28MA010087",
        "LL3ABCJ28MA010493",
        "LL3ABCJ28MA010817",
        "LL3ABCJ28MA010820",
        "LL3ABCJ28MA010834",
        "LL3ABCJ29LA011117",
        "LL3ABCJ29LA011988",
        "LL3ABCJ29MA010244",
        "LL3ABCJ29MA010499",
        "LL3ABCJ29MA010826",
        "LL3ABCJ2XKA011349",
        "LL3ABCJ2XLA010171",
        "LL3ABCJ2XLA011384",
        "LL3ABCJ2XMA010494",
        "LL3ABCJ2XMA010818",
        "LL3ABCJ2XMA010821",
        "LL3ABCJ2XMA010835",
        "LL3ACCJ20JA011517",
        "LL3ACCJ20KA010742",
        "LL3ACCJ20KA010787",
        "LL3ACCJ20KA010790",
        "LL3ACCJ20KA010806",
        "LL3ACCJ20LA010421",
        "LL3ACCJ20MA010730",
        "LL3ACCJ21KA010734",
        "LL3ACCJ21KA010748",
        "LL3ACCJ21KA010751",
        "LL3ACCJ21KA010773",
        "LL3ACCJ21KA010779",
        "LL3ACCJ21KA010782",
        "LL3ACCJ21KA010796",
        "LL3ACCJ21KA010801",
        "LL3ACCJ21KA010881",
        "LL3ACCJ22JA011664",
        "LL3ACCJ22KA010743",
        "LL3ACCJ22KA010788",
        "LL3ACCJ22KA010791",
        "LL3ACCJ22KA010807",
        "LL3ACCJ22KA010810",
        "LL3ACCJ22LA010412",
        "LL3ACCJ22LA010413",
        "LL3ACCJ22LA010419",
        "LL3ACCJ22LA010799",
        "LL3ACCJ22LA010804",
        "LL3ACCJ22LA011411",
        "LL3ACCJ23KA010735",
        "LL3ACCJ23KA010748",
        "LL3ACCJ23KA010749",
        "LL3ACCJ23KA010783",
        "LL3ACCJ23KA010797",
        "LL3ACCJ23KA010802",
        "LL3ACCJ23KA010845",
        "LL3ACCJ24KA010744",
        "LL3ACCJ24KA010789",
        "LL3ACCJ24KA010792",
        "LL3ACCJ24KA010808",
        "LL3ACCJ24KA010811",
        "LL3ACCJ24KA010819",
        "LL3ACCJ25JA011514",
        "LL3ACCJ25KA010736",
        "LL3ACCJ25KA010753",
        "LL3ACCJ25KA010754",
        "LL3ACCJ25KA010784",
        "LL3ACCJ25KA010796",
        "LL3ACCJ25KA010798",
        "LL3ACCJ25KA010803",
        "LL3ACCJ25LA011337",
        "LL3ACCJ26KA010745",
        "LL3ACCJ26KA010793",
        "LL3ACCJ26KA010809",
        "LL3ACCJ27JA011515",
        "LL3ACCJ27KA010737",
        "LL3ACCJ27KA010740",
        "LL3ACCJ27KA010751",
        "LL3ACCJ27KA010754",
        "LL3ACCJ27KA010785",
        "LL3ACCJ27KA010799",
        "LL3ACCJ27KA010804",
        "LL3ACCJ27LA010170",
        "LL3ACCJ28KA010746",
        "LL3ACCJ28KA010780",
        "LL3ACCJ28KA010794",
        "LL3ACCJ29KA010738",
        "LL3ACCJ29KA010741",
        "LL3ACCJ29KA010780",
        "LL3ACCJ29KA010786",
        "LL3ACCJ29KA010795",
        "LL3ACCJ29KA010805",
        "LL3ACCJ2XKA010733",
        "LL3ACCJ2XKA010747",
        "LL3ACCJ2XKA010750",
        "LL3ACCJ2XKA010781",
        "LL3ACCJ2XKA010795",
        "LL3ACCJ2XKA010800",
        "LL3ACCJ2XLA011384",
        "XY123456789888888"
    ],
    "福建省": [
        "LL3ABCJ20KA010806",
        "LL3ABCJ21LA010172",
        "LL3ABCJ21MA010801",
        "LL3ABCJ22KA011491",
        "LL3ABCJ27KA010737",
        "LL3ABCJ28KA010794",
        "LL3ABCJ28LA010170",
        "LL3ABCJ2XLA010171",
        "LL3ACCJ20KA010742",
        "LL3ACCJ20KA010787",
        "LL3ACCJ20KA010790",
        "LL3ACCJ20KA010806",
        "LL3ACCJ20LA010421",
        "LL3ACCJ20MA010730",
        "LL3ACCJ21KA010734",
        "LL3ACCJ21KA010748",
        "LL3ACCJ21KA010751",
        "LL3ACCJ21KA010773",
        "LL3ACCJ21KA010779",
        "LL3ACCJ21KA010782",
        "LL3ACCJ21KA010796",
        "LL3ACCJ21KA010801",
        "LL3ACCJ21KA010881",
        "LL3ACCJ22JA011664",
        "LL3ACCJ22KA010743",
        "LL3ACCJ22KA010788",
        "LL3ACCJ22KA010791",
        "LL3ACCJ22KA010807",
        "LL3ACCJ22KA010810",
        "LL3ACCJ22LA010412",
        "LL3ACCJ22LA010413",
        "LL3ACCJ22LA010419",
        "LL3ACCJ22LA010799",
        "LL3ACCJ22LA010804",
        "LL3ACCJ22LA011411",
        "LL3ACCJ23KA010735",
        "LL3ACCJ23KA010748",
        "LL3ACCJ23KA010749",
        "LL3ACCJ23KA010783",
        "LL3ACCJ23KA010797",
        "LL3ACCJ23KA010802",
        "LL3ACCJ23KA010845",
        "LL3ACCJ24KA010744",
        "LL3ACCJ24KA010789",
        "LL3ACCJ24KA010792",
        "LL3ACCJ24KA010808",
        "LL3ACCJ24KA010811",
        "LL3ACCJ24KA010819",
        "LL3ACCJ25KA010736",
        "LL3ACCJ25KA010753",
        "LL3ACCJ25KA010754",
        "LL3ACCJ25KA010784",
        "LL3ACCJ25KA010796",
        "LL3ACCJ25KA010798",
        "LL3ACCJ25KA010803",
        "LL3ACCJ26KA010745",
        "LL3ACCJ26KA010793",
        "LL3ACCJ26KA010809",
        "LL3ACCJ27JA011515",
        "LL3ACCJ27KA010737",
        "LL3ACCJ27KA010740",
        "LL3ACCJ27KA010751",
        "LL3ACCJ27KA010754",
        "LL3ACCJ27KA010785",
        "LL3ACCJ27KA010799",
        "LL3ACCJ27KA010804",
        "LL3ACCJ27LA010170",
        "LL3ACCJ28KA010746",
        "LL3ACCJ28KA010780",
        "LL3ACCJ28KA010794",
        "LL3ACCJ29KA010738",
        "LL3ACCJ29KA010741",
        "LL3ACCJ29KA010780",
        "LL3ACCJ29KA010786",
        "LL3ACCJ29KA010795",
        "LL3ACCJ29KA010805",
        "LL3ACCJ2XKA010733",
        "LL3ACCJ2XKA010747",
        "LL3ACCJ2XKA010750",
        "LL3ACCJ2XKA010781",
        "LL3ACCJ2XKA010795",
        "LL3ACCJ2XKA010800",
        "LL3ACCJ2XLA011384"
    ],
    "厦门市": [
        "LL3ABCJ20KA010806",
        "LL3ABCJ21LA010172",
        "LL3ABCJ21MA010801",
        "LL3ABCJ22KA011491",
        "LL3ABCJ27KA010737",
        "LL3ABCJ28KA010794",
        "LL3ABCJ28LA010170",
        "LL3ABCJ2XLA010171",
        "LL3ACCJ20KA010742",
        "LL3ACCJ20KA010787",
        "LL3ACCJ20KA010790",
        "LL3ACCJ20KA010806",
        "LL3ACCJ20LA010421",
        "LL3ACCJ20MA010730",
        "LL3ACCJ21KA010734",
        "LL3ACCJ21KA010748",
        "LL3ACCJ21KA010751",
        "LL3ACCJ21KA010773",
        "LL3ACCJ21KA010779",
        "LL3ACCJ21KA010782",
        "LL3ACCJ21KA010796",
        "LL3ACCJ21KA010801",
        "LL3ACCJ21KA010881",
        "LL3ACCJ22KA010743",
        "LL3ACCJ22KA010788",
        "LL3ACCJ22KA010791",
        "LL3ACCJ22KA010807",
        "LL3ACCJ22KA010810",
        "LL3ACCJ22LA010412",
        "LL3ACCJ22LA010413",
        "LL3ACCJ22LA010419",
        "LL3ACCJ22LA010799",
        "LL3ACCJ22LA010804",
        "LL3ACCJ22LA011411",
        "LL3ACCJ23KA010735",
        "LL3ACCJ23KA010748",
        "LL3ACCJ23KA010749",
        "LL3ACCJ23KA010783",
        "LL3ACCJ23KA010797",
        "LL3ACCJ23KA010802",
        "LL3ACCJ23KA010845",
        "LL3ACCJ24KA010744",
        "LL3ACCJ24KA010789",
        "LL3ACCJ24KA010792",
        "LL3ACCJ24KA010808",
        "LL3ACCJ24KA010811",
        "LL3ACCJ24KA010819",
        "LL3ACCJ25KA010736",
        "LL3ACCJ25KA010753",
        "LL3ACCJ25KA010754",
        "LL3ACCJ25KA010784",
        "LL3ACCJ25KA010796",
        "LL3ACCJ25KA010798",
        "LL3ACCJ25KA010803",
        "LL3ACCJ26KA010745",
        "LL3ACCJ26KA010793",
        "LL3ACCJ26KA010809",
        "LL3ACCJ27KA010737",
        "LL3ACCJ27KA010740",
        "LL3ACCJ27KA010751",
        "LL3ACCJ27KA010754",
        "LL3ACCJ27KA010785",
        "LL3ACCJ27KA010799",
        "LL3ACCJ27KA010804",
        "LL3ACCJ27LA010170",
        "LL3ACCJ28KA010746",
        "LL3ACCJ28KA010780",
        "LL3ACCJ28KA010794",
        "LL3ACCJ29KA010738",
        "LL3ACCJ29KA010741",
        "LL3ACCJ29KA010780",
        "LL3ACCJ29KA010786",
        "LL3ACCJ29KA010795",
        "LL3ACCJ29KA010805",
        "LL3ACCJ2XKA010733",
        "LL3ACCJ2XKA010747",
        "LL3ACCJ2XKA010750",
        "LL3ACCJ2XKA010781",
        "LL3ACCJ2XKA010795",
        "LL3ACCJ2XKA010800",
        "LL3ACCJ2XLA011384"
    ],
    "湖里区": [
        "LL3ABCJ20KA010806",
        "LL3ABCJ27KA010737",
        "LL3ACCJ20KA010806",
        "LL3ACCJ20LA010421",
        "LL3ACCJ21KA010734",
        "LL3ACCJ21KA010751",
        "LL3ACCJ21KA010779",
        "LL3ACCJ22KA010810",
        "LL3ACCJ22LA010412",
        "LL3ACCJ22LA010413",
        "LL3ACCJ22LA010419",
        "LL3ACCJ22LA010799",
        "LL3ACCJ22LA010804",
        "LL3ACCJ22LA011411",
        "LL3ACCJ23KA010735",
        "LL3ACCJ23KA010748",
        "LL3ACCJ23KA010749",
        "LL3ACCJ23KA010802",
        "LL3ACCJ24KA010744",
        "LL3ACCJ24KA010789",
        "LL3ACCJ24KA010792",
        "LL3ACCJ24KA010808",
        "LL3ACCJ24KA010811",
        "LL3ACCJ24KA010819",
        "LL3ACCJ25KA010736",
        "LL3ACCJ25KA010803",
        "LL3ACCJ26KA010793",
        "LL3ACCJ26KA010809",
        "LL3ACCJ27KA010737",
        "LL3ACCJ27KA010751",
        "LL3ACCJ27KA010799",
        "LL3ACCJ27KA010804",
        "LL3ACCJ29KA010780",
        "LL3ACCJ29KA010805",
        "LL3ACCJ2XKA010733",
        "LL3ACCJ2XKA010800",
        "LL3ACCJ2XLA011384"
    ],
    "广东省": [
        "LL3ABCJ20LA011300",
        "LL3ABCJ28LA011299",
        "LL3ACCJ25LA011337"
    ],
    "深圳市": [
        "LL3ABCJ20LA011300"
    ],
    "南山区": [
        "LL3ABCJ20LA011300"
    ],
    "浙江省": [
        "LL3ABCJ20LA011989",
        "LL3ABCJ23LA011985",
        "LL3ABCJ25LA011986",
        "LL3ABCJ26KA011350",
        "LL3ABCJ27LA011987",
        "LL3ABCJ29LA011988",
        "LL3ABCJ2XKA011349",
        "LL3ACCJ20JA011517",
        "LL3ACCJ25JA011514"
    ],
    "嘉兴市": [
        "LL3ABCJ20LA011989",
        "LL3ABCJ23LA011985",
        "LL3ABCJ25LA011986",
        "LL3ABCJ26KA011350",
        "LL3ABCJ27LA011987",
        "LL3ABCJ29LA011988",
        "LL3ABCJ2XKA011349",
        "LL3ACCJ20JA011517",
        "LL3ACCJ25JA011514"
    ],
    "嘉善县": [
        "LL3ABCJ20LA011989",
        "LL3ABCJ23LA011985",
        "LL3ABCJ25LA011986",
        "LL3ABCJ27LA011987",
        "LL3ABCJ29LA011988"
    ],
    "江苏省": [
        "LL3ABCJ20MA010083",
        "LL3ABCJ20MA010245",
        "LL3ABCJ20MA010780",
        "LL3ABCJ20MA010782",
        "LL3ABCJ20MA010827",
        "LL3ABCJ20MA010830",
        "LL3ABCJ21MA010819",
        "LL3ABCJ21MA010822",
        "LL3ABCJ22MA010084",
        "LL3ABCJ22MA010246",
        "LL3ABCJ22MA010490",
        "LL3ABCJ22MA010781",
        "LL3ABCJ22MA010828",
        "LL3ABCJ22MA010831",
        "LL3ABCJ23MA010823",
        "LL3ABCJ24LA010621",
        "LL3ABCJ24LA010690",
        "LL3ABCJ24MA010116",
        "LL3ABCJ24MA010247",
        "LL3ABCJ24MA010779",
        "LL3ABCJ24MA010782",
        "LL3ABCJ24MA010827",
        "LL3ABCJ24MA010829",
        "LL3ABCJ24MA010832",
        "LL3ABCJ24MA010881",
        "LL3ABCJ25MA010824",
        "LL3ABCJ26MA010492",
        "LL3ABCJ26MA010816",
        "LL3ABCJ26MA010833",
        "LL3ABCJ27LA011116",
        "LL3ABCJ27MA010825",
        "LL3ABCJ28LA010895",
        "LL3ABCJ28MA010087",
        "LL3ABCJ28MA010817",
        "LL3ABCJ28MA010820",
        "LL3ABCJ28MA010834",
        "LL3ABCJ29MA010499",
        "LL3ABCJ29MA010826",
        "LL3ABCJ2XMA010494",
        "LL3ABCJ2XMA010818",
        "LL3ABCJ2XMA010821",
        "LL3ABCJ2XMA010835"
    ],
    "无锡市": [
        "LL3ABCJ20MA010083",
        "LL3ABCJ20MA010780",
        "LL3ABCJ22MA010781",
        "LL3ABCJ24MA010116",
        "LL3ABCJ24MA010779",
        "LL3ABCJ24MA010782"
    ],
    "滨湖区": [
        "LL3ABCJ20MA010083"
    ],
    "苏州市": [
        "LL3ABCJ20MA010245",
        "LL3ABCJ20MA010782",
        "LL3ABCJ20MA010827",
        "LL3ABCJ20MA010830",
        "LL3ABCJ21MA010819",
        "LL3ABCJ21MA010822",
        "LL3ABCJ22MA010084",
        "LL3ABCJ22MA010246",
        "LL3ABCJ22MA010490",
        "LL3ABCJ22MA010828",
        "LL3ABCJ22MA010831",
        "LL3ABCJ23MA010823",
        "LL3ABCJ24LA010621",
        "LL3ABCJ24LA010690",
        "LL3ABCJ24MA010247",
        "LL3ABCJ24MA010827",
        "LL3ABCJ24MA010829",
        "LL3ABCJ24MA010832",
        "LL3ABCJ24MA010881",
        "LL3ABCJ25MA010824",
        "LL3ABCJ26MA010492",
        "LL3ABCJ26MA010816",
        "LL3ABCJ26MA010833",
        "LL3ABCJ27LA011116",
        "LL3ABCJ27MA010825",
        "LL3ABCJ28LA010895",
        "LL3ABCJ28MA010087",
        "LL3ABCJ28MA010817",
        "LL3ABCJ28MA010820",
        "LL3ABCJ28MA010834",
        "LL3ABCJ29MA010499",
        "LL3ABCJ29MA010826",
        "LL3ABCJ2XMA010494",
        "LL3ABCJ2XMA010818",
        "LL3ABCJ2XMA010821",
        "LL3ABCJ2XMA010835"
    ],
    "相城区": [
        "LL3ABCJ20MA010245",
        "LL3ABCJ20MA010782",
        "LL3ABCJ20MA010827",
        "LL3ABCJ20MA010830",
        "LL3ABCJ21MA010819",
        "LL3ABCJ21MA010822",
        "LL3ABCJ22MA010084",
        "LL3ABCJ22MA010246",
        "LL3ABCJ22MA010490",
        "LL3ABCJ22MA010828",
        "LL3ABCJ22MA010831",
        "LL3ABCJ23MA010823",
        "LL3ABCJ24LA010621",
        "LL3ABCJ24LA010690",
        "LL3ABCJ24MA010247",
        "LL3ABCJ24MA010827",
        "LL3ABCJ24MA010829",
        "LL3ABCJ24MA010832",
        "LL3ABCJ25MA010824",
        "LL3ABCJ26MA010492",
        "LL3ABCJ26MA010816",
        "LL3ABCJ26MA010833",
        "LL3ABCJ27LA011116",
        "LL3ABCJ27MA010825",
        "LL3ABCJ28LA010895",
        "LL3ABCJ28MA010087",
        "LL3ABCJ28MA010817",
        "LL3ABCJ28MA010820",
        "LL3ABCJ28MA010834",
        "LL3ABCJ29MA010499",
        "LL3ABCJ29MA010826",
        "LL3ABCJ2XMA010494",
        "LL3ABCJ2XMA010818",
        "LL3ABCJ2XMA010821",
        "LL3ABCJ2XMA010835"
    ],
    "锡山区": [
        "LL3ABCJ20MA010780",
        "LL3ABCJ22MA010781",
        "LL3ABCJ24MA010116",
        "LL3ABCJ24MA010779",
        "LL3ABCJ24MA010782"
    ],
    "思明区": [
        "LL3ABCJ21LA010172",
        "LL3ABCJ21MA010801",
        "LL3ABCJ28KA010794",
        "LL3ABCJ28LA010170",
        "LL3ABCJ2XLA010171",
        "LL3ACCJ20KA010742",
        "LL3ACCJ20KA010787",
        "LL3ACCJ20MA010730",
        "LL3ACCJ21KA010748",
        "LL3ACCJ21KA010773",
        "LL3ACCJ21KA010796",
        "LL3ACCJ21KA010801",
        "LL3ACCJ21KA010881",
        "LL3ACCJ22KA010743",
        "LL3ACCJ22KA010788",
        "LL3ACCJ22KA010791",
        "LL3ACCJ23KA010783",
        "LL3ACCJ23KA010797",
        "LL3ACCJ23KA010845",
        "LL3ACCJ25KA010753",
        "LL3ACCJ25KA010754",
        "LL3ACCJ25KA010784",
        "LL3ACCJ25KA010796",
        "LL3ACCJ25KA010798",
        "LL3ACCJ26KA010745",
        "LL3ACCJ27KA010740",
        "LL3ACCJ27KA010754",
        "LL3ACCJ27KA010785",
        "LL3ACCJ27LA010170",
        "LL3ACCJ28KA010746",
        "LL3ACCJ28KA010780",
        "LL3ACCJ28KA010794",
        "LL3ACCJ29KA010741",
        "LL3ACCJ29KA010786",
        "LL3ACCJ29KA010795",
        "LL3ACCJ2XKA010747",
        "LL3ACCJ2XKA010750",
        "LL3ACCJ2XKA010795"
    ],
    "湖南省": [
        "LL3ABCJ21LA011385",
        "LL3ABCJ23LA011386",
        "LL3ABCJ24LA011381",
        "LL3ABCJ25LA011387",
        "LL3ABCJ26LA011382",
        "LL3ABCJ28LA011383",
        "LL3ABCJ2XLA011384"
    ],
    "衡阳市": [
        "LL3ABCJ21LA011385",
        "LL3ABCJ23LA011386",
        "LL3ABCJ24LA011381",
        "LL3ABCJ25LA011387",
        "LL3ABCJ26LA011382",
        "LL3ABCJ28LA011383",
        "LL3ABCJ2XLA011384"
    ],
    "雁峰区": [
        "LL3ABCJ21LA011385",
        "LL3ABCJ23LA011386",
        "LL3ABCJ26LA011382",
        "LL3ABCJ28LA011383",
        "LL3ABCJ2XLA011384"
    ],
    "北京市（省）": [
        "LL3ABCJ21MA010495",
        "LL3ABCJ27MA010498"
    ],
    "北京市": [
        "LL3ABCJ21MA010495",
        "LL3ABCJ27MA010498"
    ],
    "大兴区": [
        "LL3ABCJ21MA010495"
    ],
    "海沧区": [
        "LL3ABCJ22KA011491"
    ],
    "内蒙古自治区": [
        "LL3ABCJ22LA010732"
    ],
    "鄂尔多斯市": [
        "LL3ABCJ22LA010732"
    ],
    "准格尔旗": [
        "LL3ABCJ22LA010732"
    ],
    "重庆市（省）": [
        "LL3ABCJ23MA010496",
        "LL3ABCJ24MA010491",
        "LL3ABCJ25MA010497",
        "LL3ABCJ28MA010493"
    ],
    "重庆市": [
        "LL3ABCJ23MA010496",
        "LL3ABCJ24MA010491",
        "LL3ABCJ25MA010497",
        "LL3ABCJ28MA010493"
    ],
    "渝北区": [
        "LL3ABCJ23MA010496",
        "LL3ABCJ24MA010491",
        "LL3ABCJ25MA010497",
        "LL3ABCJ28MA010493"
    ],
    "蒸湘区": [
        "LL3ABCJ24LA011381"
    ],
    "常熟市": [
        "LL3ABCJ24MA010881"
    ],
    "石鼓区": [
        "LL3ABCJ25LA011387"
    ],
    "桐乡市": [
        "LL3ABCJ26KA011350",
        "LL3ABCJ2XKA011349",
        "LL3ACCJ20JA011517",
        "LL3ACCJ25JA011514"
    ],
    "湖北省": [
        "LL3ABCJ26MA010248",
        "LL3ABCJ29LA011117",
        "LL3ABCJ29MA010244"
    ],
    "武汉市": [
        "LL3ABCJ26MA010248",
        "LL3ABCJ29LA011117",
        "LL3ABCJ29MA010244"
    ],
    "蔡甸区": [
        "LL3ABCJ26MA010248",
        "LL3ABCJ29LA011117",
        "LL3ABCJ29MA010244"
    ],
    "通州区": [
        "LL3ABCJ27MA010498"
    ],
    "珠海市": [
        "LL3ABCJ28LA011299"
    ],
    "金湾区": [
        "LL3ABCJ28LA011299"
    ],
    "翔安区": [
        "LL3ACCJ20KA010790",
        "LL3ACCJ21KA010782",
        "LL3ACCJ22KA010807",
        "LL3ACCJ29KA010738",
        "LL3ACCJ2XKA010781"
    ],
    "漳州市": [
        "LL3ACCJ22JA011664",
        "LL3ACCJ27JA011515"
    ],
    "龙海区": [
        "LL3ACCJ22JA011664",
        "LL3ACCJ27JA011515"
    ],
    "佛山市": [
        "LL3ACCJ25LA011337"
    ],
    "南海区": [
        "LL3ACCJ25LA011337"
    ],
    "上海市（省）": [
        "XY123456789888888"
    ],
    "上海市": [
        "XY123456789888888"
    ],
    "浦东新区": [
        "XY123456789888888"
    ]
}    
var position_to_car_vin_new = {'All':[]};   // 用来记录行政区域到vin的映射，省、市、区放在一个词典里，便于使用
var position_parent = {};

function carPositionRequest(){
    // car_position.clear();
    position_to_car_vin_new = {'All':[]}
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

                // var curPoint = new BMapGL.Point(filteredData[i]['Longitude'], filteredData[i]['Latitude']);

                car_point_arr.push(curPoint);
                car_position_vin_arr.push(filteredData[i]['Vin']);
            }

            position_index = 0;
            bdGEO();
        }
    });
}

function bdGEO(){	
    if(position_index >= car_point_arr.length){
        // console.log(car_position);
        createCircleData();
        return;
    }
    var pt = car_point_arr[position_index];
    geocodeSearch(pt);
}

function geocodeSearch(pt){
    myGeo.getLocation(pt, function(rs){
        var addComp = rs.addressComponents;
        curProvince = addComp.province;    // 防止直辖市混淆
        curCity = addComp.city;
        curDistrict = addComp.district;

        if(curProvince.indexOf('市') != -1){
            curProvince += '（省）'
        }

        if(!(curProvince in car_position)){
            car_position[curProvince] = {}
            position_to_car_vin_new[curProvince] = new Array();
        }
        if(!(curCity in car_position[curProvince])){
            car_position[curProvince][curCity] = {}
            position_to_car_vin_new[curCity] = new Array();
        }
        if(!(curDistrict in car_position[curProvince][curCity])){
            car_position[curProvince][curCity][curDistrict] = 0;
            position_to_car_vin_new[curDistrict] = new Array();
        }

        car_position[curProvince][curCity][curDistrict] += 1;

        var cur_vin = car_position_vin_arr[position_index]
        car_vin_to_district[cur_vin] = curDistrict;

        position_to_car_vin_new[curDistrict].push(cur_vin);
        position_to_car_vin_new[curCity].push(cur_vin);
        // 防止直辖市导致的重复
        if(position_to_car_vin_new[curProvince][position_to_car_vin_new[curProvince].length-1] != cur_vin){
            position_to_car_vin_new[curProvince].push(cur_vin);
        }
        position_to_car_vin_new['All'].push(cur_vin);

        position_parent[curDistrict] = curCity;
        position_parent[curCity] = curProvince;
        position_parent[curProvince] = 'All';
        
        position_index++;
        bdGEO();
    });
}

function createCircleData(){
    // console.log(car_position);
    console.log(position_to_car_vin)
    echartCircleData = [];
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
    // console.log(echartCircleData)

    position_to_car_vin = position_to_car_vin_new;

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
        confine: true,
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
            itemStyle: {
                shadowBlur: 10,
                // 深色底的情况下，原本的阴影不管用了
                shadowColor: 'rgba(25, 100, 150, 0.5)',
                shadowOffsetY: 5,
                color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                    offset: 0,
                    color: 'rgba(137, 189, 27, 0.3)'
                }, {
                    offset: 1,
                    color: 'rgba(137, 189, 27, 1)'
                }])
            }
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

            myChart3.hideLoading();
            myChart3.setOption(option_car_time, true);

        }
    });
}

carTimeScatterRequest()

// =========== 数据联动 =======================
myChart3.on('mouseover', {seriesIndex: 0}, function (params) {
    // console.log(params.data[3]+' mouseover myChart3');
    highlight_vin(params.data[3], true);
});

myChart3.on('mouseout', {seriesIndex: 0}, function (params) {
    // console.log(params.data[3]+' mouseout myChart3');
    downplay_vin(params.data[3]);
});

myChart3.on('click', {seriesIndex: 0}, function (params) {
    console.log(params.data[3]+' click myChart3');
    // console.log(params);
    focus_on_multiple_vin([params.data[3]], map);
});

myChart1_1.on('mouseover', {seriesIndex: 0}, function (params) {
    // console.log(option_global_mile_time['xAxis']['data'][params.dataIndex]+' mouseover myChart1_1');
    highlight_vin(option_global_mile_time['xAxis']['data'][params.dataIndex], true);
});

myChart1_1.on('mouseout', {seriesIndex: 0}, function (params) {
    // console.log(option_global_mile_time['xAxis']['data'][params.dataIndex]+' mouseout myChart1_1');
    downplay_vin(option_global_mile_time['xAxis']['data'][params.dataIndex]);
});

myChart1_1.on('click', {seriesIndex: 0}, function (params) {
    console.log(params.name+' click myChart1_1');
    // console.log(params);
    focus_on_multiple_vin([params.name], map);
});

myChart7_1.on('mouseover', function (params) {
    // console.log(params.name+' mouseout myChart7_1');
    highlight_multiple_vin(position_to_car_vin[params.name]);
});

myChart7_1.on('mouseout', function (params) {
    // console.log(params.name+' mouseout myChart7_1');
    downplay_multiple_vin(position_to_car_vin[params.name]);
});

var cur_area = 'All'
myChart7_1.on('click', function (params) {
    // console.log(params);
    var target_area = params.name;
    if(target_area == ''){  //点了返回键
        target_area = position_parent[cur_area];
    }

    cur_area = target_area;

    // console.log(target_area+' click myChart7_1');
    focus_on_multiple_vin(position_to_car_vin[target_area], map);
});

function highlight_vin(cur_vin, show_tip){
    // 高亮柱状图
    var bar_idx = 0;
    var bar_vin_arr = option_global_mile_time['xAxis']['data'];
    for(bar_idx = 0; bar_idx < bar_vin_arr.length; ++bar_idx){
        if(bar_vin_arr[bar_idx] == cur_vin){
            break;
        }
    }
    if(bar_idx < bar_vin_arr.length){
        myChart1_1.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: bar_idx
        });
        if(show_tip){
            myChart1_1.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: bar_idx
            });
        }
    }

    // 高亮散点图
    var scatter_idx = 0;
    var scatter_vin_arr = option_car_time['series'][0]['data'];
    for(scatter_idx = 0; scatter_idx < scatter_vin_arr.length; ++scatter_idx){
        if(scatter_vin_arr[scatter_idx][3] == cur_vin){
            break;
        }
    }
    if(scatter_idx < scatter_vin_arr.length){
        myChart3.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: scatter_idx
        });
        if(show_tip){
            myChart3.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: scatter_idx
            });
        }
    }

    // 高亮旭日图
    var sunburst_name = car_vin_to_district[cur_vin];
    if(sunburst_name != undefined){
        myChart7_1.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            name: sunburst_name
        });
        if(show_tip){
            myChart7_1.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                name: sunburst_name
            });
        }
    }
}

function downplay_vin(cur_vin){
    // 高亮柱状图
    var bar_idx = 0;
    var bar_vin_arr = option_global_mile_time['xAxis']['data'];
    for(bar_idx = 0; bar_idx < bar_vin_arr.length; ++bar_idx){
        if(bar_vin_arr[bar_idx] == cur_vin){
            break;
        }
    }
    if(bar_idx < bar_vin_arr.length){
        myChart1_1.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: bar_idx
        });
        myChart1_1.dispatchAction({
            type: 'hideTip',
            seriesIndex: 0,
            dataIndex: bar_idx
        });
    }

    // 高亮散点图
    var scatter_idx = 0;
    var scatter_vin_arr = option_car_time['series'][0]['data'];
    for(scatter_idx = 0; scatter_idx < scatter_vin_arr.length; ++scatter_idx){
        if(scatter_vin_arr[scatter_idx][3] == cur_vin){
            break;
        }
    }
    if(scatter_idx < scatter_vin_arr.length){
        myChart3.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: scatter_idx
        });
        myChart3.dispatchAction({
            type: 'hideTip',
            seriesIndex: 0,
            dataIndex: scatter_idx
        });
    }

    // 高亮旭日图
    var sunburst_name = car_vin_to_district[cur_vin];
    if(sunburst_name != undefined){
        myChart7_1.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            name: sunburst_name
        });
        myChart7_1.dispatchAction({
            type: 'hideTip',
            seriesIndex: 0,
            dataIndex: scatter_idx
        });
    }
}

function focus_on_multiple_vin(vin_arr, cur_map){
    console.log(vin_arr);
    console.log(cur_map);

    var cur_bPoints = [];
    for(var i = 0; i < vin_arr.length; ++i){
        if(vin_to_bdpoint[vin_arr[i]] != undefined){
            cur_bPoints.push(vin_to_bdpoint[vin_arr[i]]);
        }
    }

    console.log(cur_bPoints);

    var view = cur_map.getViewport(cur_bPoints);
    var mapZoom = view.zoom;
    var centerPoint = view.center;
    if(mapZoom > 19){
        mapZoom = 19;
    }
    cur_map.flyTo(centerPoint, mapZoom);
    cur_map.centerAndZoom(centerPoint, mapZoom);
}

function highlight_multiple_vin(vin_arr){
    // 旭日图中心返回按钮
    if(vin_arr == undefined || vin_arr.length == 0){
        return;
    }

    // 高亮柱状图
    var bar_idx_arr = [];
    var bar_vin_arr = option_global_mile_time['xAxis']['data'];
    for(var i = 0; i < bar_vin_arr.length; ++i){
        if(vin_arr.indexOf(bar_vin_arr[i]) != -1){
            bar_idx_arr.push(i);
        }
    }
    myChart1_1.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: bar_idx_arr
    });

    // 高亮散点图
    var scatter_idx_arr = [];
    var scatter_vin_arr = option_car_time['series'][0]['data'];
    for(var i = 0; i < scatter_vin_arr.length; ++i){
        if(vin_arr.indexOf(scatter_vin_arr[i][3]) != -1){
            scatter_idx_arr.push(i);
        }
    }
    myChart3.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: scatter_idx_arr
    });
}

function downplay_multiple_vin(vin_arr){
    // 旭日图中心返回按钮
    if(vin_arr == undefined){
        return;
    }

    var bar_idx_arr = [];
    var bar_vin_arr = option_global_mile_time['xAxis']['data'];
    for(var i = 0; i < bar_vin_arr.length; ++i){
        if(vin_arr.indexOf(bar_vin_arr[i]) != -1){
            bar_idx_arr.push(i);
        }
    }
    myChart1_1.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: bar_idx_arr
    });

    var scatter_idx_arr = [];
    var scatter_vin_arr = option_car_time['series'][0]['data'];
    for(var i = 0; i < scatter_vin_arr.length; ++i){
        if(vin_arr.indexOf(scatter_vin_arr[i][3]) != -1){
            scatter_idx_arr.push(i);
        }
    }
    myChart3.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: scatter_idx_arr
    });
}