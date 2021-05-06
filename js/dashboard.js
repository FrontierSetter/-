// 全部车辆数量
var totalCarNum = 0

function requestTotalCarNum(){
    $.ajax({
        // 3
        url: server_ip+'api/car_num', //请求的url
        type: 'get', //请求的方式
        error: function (data) {
            console.log('requestTotalCarNum请求失败');
        },
        success: function (data) {
            // console.log('requestTotalCarNum请求成功');
            // console.log(data);

            totalCarNum = data;

            var curOption = myChart6_1.getOption();
            curOption['series'][0]['data'][0]['value'] = totalCarNum;
            curOption['series'][0]['data'][1]['value'] = 0;
            //? 不知道为什么title是个数组
            curOption['title'][0]['text'] = '车辆总数\n'+totalCarNum.toString()+'辆';
            // console.log(curOption)

            myChart6_1.setOption(curOption, true);


            setTimeout(function(){
                requestTotalCarNum();
            }, 3000);
        }
    });
}

// 上线车辆数量
var onCarNum = 0

function requestOnCarNum(){
    $.ajax({
        // 3
        url: server_ip+'api/on_cars_num', //请求的url
        type: 'get', //请求的方式
        error: function (data) {
            console.log('requestOnCarNum请求失败');
        },
        success: function (data) {
            // console.log('requestOnCarNum请求成功');
            // console.log(data);

            onCarNum = data;

            var offCarNum = totalCarNum-onCarNum;

            if(offCarNum < 0){
                setTimeout(function(){
                    requestOnCarNum();
                }, 1000);
            }else{
                var curOption = myChart6_2.getOption();
                curOption['series'][0]['data'][0]['value'] = onCarNum;
                curOption['series'][0]['data'][1]['value'] = offCarNum;
                //? 不知道为什么title是个数组
                curOption['title'][0]['text'] = '在线车辆\n'+onCarNum.toString()+'辆';

                myChart6_2.setOption(curOption, true);

                setTimeout(function(){
                    requestTotalCarNum();
                }, 3000);
            }
        }
    });
}