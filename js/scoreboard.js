var curAverageSpeed = 0

function getAverageSpeedState(speed){
    if(speed < 0){
        return '错误';
    }else if(speed == 0){
        return '停止';
    }else if(speed < 20){
        return '慢速';
    }else if(speed < 60){
        return '常速';
    }else if(speed < 80){
        return '高速';
    }else{
        return '超速';
    }
}

// ======== 平均车速 ===========
function requestAverageSpeed(){
    $.ajax({
        // 3
        url: server_ip+'api/avg_speed', //请求的url
        type: 'get', //请求的方式
        error: function (data) {
            console.log('requestAverageSpeed请求失败');
        },
        success: function (data) {
            // console.log('requestAverageSpeed请求成功');
            // console.log(data);

            curAverageSpeed = data.toFixed(1);
            $("#average_speed").html(curAverageSpeed.toString())
            $("#average_speed_state").html(getAverageSpeedState(curAverageSpeed))


            setTimeout(function(){
                requestAverageSpeed();
            }, 3000);
        }
    });
}


// ======== 注册车辆数 ===========
function requestRegisterCarNum(){
    $.ajax({
        // 3
        url: server_ip+'api/car_num', //请求的url
        type: 'get', //请求的方式
        error: function (data) {
            console.log('requestRegisterCarNum请求失败');
        },
        success: function (data) {

            curRegisterCar = data.toFixed(0);
            $("#register_car_num").html(curRegisterCar.toString())

            setTimeout(function(){
                requestAverageSpeed();
            }, 3000);
        }
    });
}

// ======== 累计安全行驶里程 ===========
function requestSystemTotalMileage(){
    $.ajax({
        // 3
        url: server_ip+'api/total_car_mileage', //请求的url
        type: 'get', //请求的方式
        error: function (data) {
            console.log('requestSystemTotalMileage请求失败');
        },
        success: function (data) {

            curRegisterCar = data.toFixed(1);
            $("#total_mileage").html('&nbsp;'+curRegisterCar.toString())

        }
    });
}