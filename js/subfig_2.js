var dataLine_1 = new Array();
var dataLine_2 = new Array();

var myChart2_2

option2_2 = {
    tooltip: {//鼠标指上时的标线
        trigger: 'axis',
        formatter: function (params) {
            params = params[0];
            // var date = new Date(params.name);
            var data_tem = params.name.split(' ');
            return data_tem[3]+'-'+data_tem[1]+'-'+data_tem[2]+' '+data_tem[4]+' '+params.value[1]; 
            // return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
            // return data.getFullYear()+'-'+(date.getMonth() + 1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()+'.'+date.getMinutes()+' '+params.value[1];
        },
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
        data: ['速度', '电量'],
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
        type: 'time',
        boundaryGap: false,
        axisLine: {
            lineStyle: {
                color: '#57617B'
            }
        },
        axisLabel: {
            textStyle: {
                color:'#fff',
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
                color:'#fff',
            },
        },
        splitLine: {
            lineStyle: {
                color: 'rgba(255,255,255,.2)',
				type:'dotted',
            }
        }
    }],
    dataZoom: [
        {   // 这个dataZoom组件，也控制x轴。
            type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
            start: 0,      // 左边在 10% 的位置。
            end: 100         // 右边在 60% 的位置。
        }
    ],
    series: [{
        name: '速度',
        type: 'line',
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
        itemStyle: {
            normal: {
                color: 'rgb(137,189,27)'
            }
        },
        data: dataLine_1
    }, {
        name: '电量',
        type: 'line',
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
        itemStyle: {
            normal: {
                color: 'rgb(0,136,212)'
            }
        },
        data: dataLine_2
    }]
};

function requestSingleCarSpeed(){
    console.log("requestSingleCarSpeed")
    $.ajax({
        url: 'http://202.120.60.31:4000/query/single/history', //请求的url
        type: 'get', //请求的方式
        data: 'car_VIN='+curCarVin+'&type='+'velocity'+'&limit='+queryLimit,
        error: function (data) {
            console.log('requestSingleCarHistory请求失败');
        },
        success: function (data) {
            console.log('requestSingleCarHistory success '+data.length);
            dataLine_1 = new Array();

            for(var i = 0; i < data.length; ++i){
                var d = new Date();
                d.setTime(Date.parse(data[i]['create_time']));
                dataLine_1.push({
                    name: d.toString(),
                    // [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('/')
                    value: [
                        d.getTime(),
                        data[i]['speed']
                    ]
                })
            }
            console.log('requestSingleCarHistory: '+dataLine_1.length+' '+data.length);

            myChart2_2.setOption({
                // title:{
                //     text:curCarType+' of '+curCarVin,
                //     textStyle: { //图例文字的样式
                //         color: color_legend,
                //     },
                // },
                series: [{
                    data: dataLine_1
                },
                {
                    data: dataLine_2
                }]
            });
        }
    });

}

function init_subfig_2_2(){
    console.log('init_subfig_2_2')
    myChart2_2 = echarts.init(document.getElementById('main2_2'));
    myChart2_2.setOption(option2_2);
}