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

// * 状态转换函数

function backToBackground(){
    console.log("backToBackground");
    menuGlobal();
    turn_all_to_front()
    setTimeout(function(){myChart1_1.resize();}, 3005);
    setTimeout(function(){myChart2_1.resize();}, 3005);
    setTimeout(function(){myChart7_1.resize();}, 3005);
}

function enterSingle(){
    console.log("enterSingle");
    menuSingle();
    turn_all_to_back();
    // setTimeout(function(){myChart1_2.resize();}, 3005);
    setTimeout(function(){myChart2_2.resize();}, 3005);
    setTimeout(function(){myChart7_2.resize();}, 3005);
}

// * 右键菜单
var menu_all = new BMapGL.ContextMenu();
var txtMenuItem_all = [
    {
        text:'返回全局模式',
        callback:function(){backToBackground();},
        mode:'single'
    },
    {
        text:'进入单车模式',
        callback:function(){enterSingle();},
        mode:'global'
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













