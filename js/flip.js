function turn_over() {
    console.log('trigger')

    var front_img = document.getElementById("front_img");
    var back_img = document.getElementById("back_img");

    front_img.classList.add("turn_back");
    back_img.classList.add("turn_front");
    front_img.classList.remove("fronted");
    // front_img.classList.add("backed");
    back_img.classList.remove("backed");
    // back_img.classList.add("fronted");

    setTimeout(function() {
        front_img.classList.remove("turn_back");
        back_img.classList.remove("turn_front");
    },3000);

    setTimeout(function() {
        front_img.classList.add("backed");
        back_img.classList.add("fronted");
    },2000);
}

function turn_all_to_back(){
    
    var front_sides = document.getElementsByClassName("flip_card_front_side");
    var back_sides = document.getElementsByClassName("flip_card_back_side");

    console.log(front_sides.length);
    console.log(back_sides.length);

    if(front_sides.length != back_sides.length){
        console.error("卡片反转数量不对");
        return;
    }else{
        console.log("卡片反转数量对");
    }

    for(var i = 0; i < front_sides.length; ++i){
        turn_to_back_process(front_sides[i]);
        turn_to_front_process(back_sides[i]);
    }
}

function turn_all_to_front(){
    
    var front_sides = document.getElementsByClassName("flip_card_front_side");
    var back_sides = document.getElementsByClassName("flip_card_back_side");

    console.log(front_sides.length);
    console.log(back_sides.length);

    if(front_sides.length != back_sides.length){
        console.error("卡片反转数量不对");
        return;
    }else{
        console.log("卡片反转数量对");
    }

    for(var i = 0; i < front_sides.length; ++i){
        turn_to_back_process(back_sides[i]);
        turn_to_front_process(front_sides[i]);
    }
}

function turn_to_front_process(cur_element){
    cur_element.classList.add("turn_to_front_first")
    setTimeout(function(){change_to_state(cur_element, ['turn_back_finish'], ['turn_front_middle'])},999);
    setTimeout(function(){change_to_state(cur_element, ['turn_to_front_first'], ['turn_to_front_second'])},1000);
    setTimeout(function(){change_to_state(cur_element, ['turn_front_middle'], ['turn_front_finish'])},1999);
    setTimeout(function(){change_to_state(cur_element, ['turn_to_front_second'], [])},2000);
}

function turn_to_back_process(cur_element){
    cur_element.classList.add("turn_to_back_first")
    setTimeout(function(){change_to_state(cur_element, ['turn_front_finish'], ['turn_back_middle'])},999);
    setTimeout(function(){change_to_state(cur_element, ['turn_to_back_first'], ['turn_to_back_second'])},1000);
    setTimeout(function(){change_to_state(cur_element, ['turn_back_middle'], ['turn_back_finish'])},1999);
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