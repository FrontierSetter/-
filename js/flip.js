// *display属性为none的时候echarts图表无法绘制
function init_card_side_display(){
    var front_sides = document.getElementsByClassName("flip_card_front_side");
    var back_sides = document.getElementsByClassName("flip_card_back_side");

    if(front_sides.length != back_sides.length){
        console.error("卡片反转数量不对");
        return;
    }

    for(var i = 0; i < front_sides.length; ++i){
        front_sides[i].classList.add("turn_front_finish");
        back_sides[i].classList.add("turn_back_finish");
    }
}

function turn_all_to_back(){
    
    var front_sides = document.getElementsByClassName("flip_card_front_side");
    var back_sides = document.getElementsByClassName("flip_card_back_side");

    if(front_sides.length != back_sides.length){
        console.error("卡片反转数量不对");
        return;
    }

    for(var i = 0; i < front_sides.length; ++i){
        turn_to_back_process(front_sides[i]);
        turn_to_front_process(back_sides[i]);
    }
}

function turn_all_to_front(){
    
    var front_sides = document.getElementsByClassName("flip_card_front_side");
    var back_sides = document.getElementsByClassName("flip_card_back_side");

    if(front_sides.length != back_sides.length){
        console.error("卡片反转数量不对");
        return;
    }

    for(var i = 0; i < front_sides.length; ++i){
        turn_to_back_process(back_sides[i]);
        turn_to_front_process(front_sides[i]);
    }
}

function turn_to_front_process(cur_element){
    cur_element.classList.add("turn_to_front_first")
    setTimeout(function(){change_to_state(cur_element, ['turn_back_finish'], ['turn_front_middle'])},1000);
    setTimeout(function(){change_to_state(cur_element, ['turn_to_front_first'], ['turn_to_front_second'])},1000);
    setTimeout(function(){change_to_state(cur_element, ['turn_front_middle'], ['turn_front_finish'])},2000);
    setTimeout(function(){change_to_state(cur_element, ['turn_to_front_second'], [])},2000);
}

function turn_to_back_process(cur_element){
    cur_element.classList.add("turn_to_back_first")
    setTimeout(function(){change_to_state(cur_element, ['turn_front_finish'], ['turn_back_middle'])},1000);
    setTimeout(function(){change_to_state(cur_element, ['turn_to_back_first'], ['turn_to_back_second'])},1000);
    setTimeout(function(){change_to_state(cur_element, ['turn_back_middle'], ['turn_back_finish'])},2000);
    setTimeout(function(){change_to_state(cur_element, ['turn_to_back_second'], [])},2000);
}

function change_to_state(cur_element, remove_states, add_states){
    for(var i = 0; i < remove_states.length; ++i){
        cur_element.classList.remove(remove_states[i]);
    }
    for(var i = 0; i < add_states.length; ++i){
        cur_element.classList.add(add_states[i]);
    }
}