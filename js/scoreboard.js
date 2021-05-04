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

function requestAverageSpeed(){
    $.ajax({
        // 3
        url: 'http://202.120.60.31:7199/api/avg_speed', //请求的url
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