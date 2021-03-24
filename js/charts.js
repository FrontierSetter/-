option_global_mile_time = {
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
        data: ["车1", "车2", "车3", "车4", "车5", "车6"],
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
        data: [13, 27, 34, 19, 32, 35],
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
        data: [26, 12, 35, 52, 35, 16],
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