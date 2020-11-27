/**
    * @Auther : Gokul J S (youovideo.com, greenpark809@gmail.com) 
    ** Don't change this comment.
*/

var a = document.createElement('table');
document.getElementById('game-location').appendChild(a);

for(let i = 1; i <= 8; i++){

    var b = document.createElement('tr'); b.setAttribute('id', 'r-'+i); a.appendChild(b);

    for(let j = 1; j <= 8; j++){
        var c = document.createElement('td'); c.setAttribute('id', i + '-' + j); c.setAttribute('style', 'height: 20px; width: 20px;'); b.appendChild(c);
    }

}

var game_mode = "Start", box_ids, direction, pre_direction, food_score = 10, winning_score = 100, object_speed = 500, food_speed = 3000;

init_objects();

function init_objects(){

    document.getElementById('6-2').style.backgroundColor = "#000000";
    document.getElementById('6-3').style.backgroundColor = "#000000";
    document.getElementById('6-4').style.backgroundColor = "#000000";
    box_ids = [ '6-4', '6-3', '6-2' ];
    direction = 'N';
    pre_direction = 'E';
    startInterval();

}

var interval, food_interval, row_id = [ 1, 2, 3, 4, 5, 6, 7, 8 ], col_id = [ 1, 2, 3, 4, 5, 6, 7, 8 ];

function startInterval(){
    if(game_mode === "Start"){
        interval = setInterval(move, object_speed);
        food_interval = setInterval(place_food, food_speed);
    }
}

function move() {
    
    switch (direction){

        case 'E':
            if(typeof(box_ids) === "object"){
                if(pre_direction === "N"){
                    var row = parseInt(box_ids[0].substring(0, 1));
                    var pre_col = parseInt(box_ids[0].substring(2));
                }else if(pre_direction === "S"){
                    var row = parseInt(box_ids[0].substring(0, 1));
                    var pre_col = parseInt(box_ids[0].substring(2));
                }else{
                    clearInterval(interval); clearInterval(food_interval);
                    alert('Trying to move an invalid direction');
                }

                // empty the previous boxes
                document.getElementById(box_ids[0]).style.backgroundColor = "";
                document.getElementById(box_ids[1]).style.backgroundColor = "";
                document.getElementById(box_ids[2]).style.backgroundColor = "";

                // first box id
                box_ids[0] = getBoxIdsEast(box_ids[0], row, pre_col);

                // determine food infront of face
                var food_id;
                if(box_ids[0].substring(2) === "8"){
                    food_id = box_ids[0].substring(0, 1) + '-1';
                }else{
                    food_id = box_ids[0].substring(0, 1) + '-' + (parseInt(box_ids[0].substring(2)) + 1);
                }

                // set the score
                set_score(document.getElementById(food_id).class);

                // second box id
                box_ids[1] = getBoxIdsEast(box_ids[1], row, pre_col);

                // third box id
                box_ids[2] = getBoxIdsEast(box_ids[2], row, pre_col);

                // set the box background
                document.getElementById(box_ids[0]).style.backgroundColor = "#000000";
                document.getElementById(box_ids[1]).style.backgroundColor = "#000000";
                document.getElementById(box_ids[2]).style.backgroundColor = "#000000";

            }

            break;

        case 'W':
            if(typeof(box_ids) === "object"){
                if(pre_direction === "N"){
                    var row = parseInt(box_ids[0].substring(0, 1));
                    var pre_col = parseInt(box_ids[0].substring(2));
                }else if(pre_direction === "S"){
                    var row = parseInt(box_ids[0].substring(0, 1));
                    var pre_col = parseInt(box_ids[0].substring(2));
                }else{
                    clearInterval(interval); clearInterval(food_interval);
                    alert('Trying to move an invalid direction');
                }

                // empty the previous boxes
                document.getElementById(box_ids[0]).style.backgroundColor = "";
                document.getElementById(box_ids[1]).style.backgroundColor = "";
                document.getElementById(box_ids[2]).style.backgroundColor = "";

                // first box id
                box_ids[0] = getBoxIdsWest(box_ids[0], row, pre_col);

                // determine food infront of face
                var food_id;
                if(box_ids[0].substring(2) === "1"){
                    food_id = box_ids[0].substring(0, 1) + '-8';
                }else{
                    food_id = box_ids[0].substring(0, 1) + '-' + (parseInt(box_ids[0].substring(2)) - 1);
                }
                
                // set the score
                set_score(document.getElementById(food_id).class);

                // second box id
                box_ids[1] = getBoxIdsWest(box_ids[1], row, pre_col);

                // third box id
                box_ids[2] = getBoxIdsWest(box_ids[2], row, pre_col);
                
                // set the box background
                document.getElementById(box_ids[2]).style.backgroundColor = "#000000";
                document.getElementById(box_ids[1]).style.backgroundColor = "#000000";
                document.getElementById(box_ids[0]).style.backgroundColor = "#000000";

            }

            break;

        case 'N':
            if(typeof(box_ids) === "object"){

                // set the coloumn number
                if(pre_direction === "E"){
                    var col = parseInt(box_ids[0].substring(2));
                    var pre_row = parseInt(box_ids[0].substring(0, 1));
                }else if(pre_direction === "W"){
                    var col = parseInt(box_ids[0].substring(2));
                    var pre_row = parseInt(box_ids[0].substring(0, 1));
                }else{
                    clearInterval(interval); clearInterval(food_interval);
                    alert('Trying to move an invalid direction');
                }

                // empty the previous boxes
                document.getElementById(box_ids[0]).style.backgroundColor = "";
                document.getElementById(box_ids[1]).style.backgroundColor = "";
                document.getElementById(box_ids[2]).style.backgroundColor = "";

                // first box id
                box_ids[0] = getBoxIdsNorth(box_ids[0], col, pre_row);

                // determine food infront of face
                var food_id;
                if(box_ids[0].substring(0, 1) === "1"){
                    food_id = '8-' + box_ids[0].substring(2);
                }else{
                    food_id = (parseInt(box_ids[0].substring(0, 1)) - 1) + '-' + box_ids[0].substring(2); 
                }
                
                // set the score
                set_score(document.getElementById(food_id).class);

                // second box id
                box_ids[1] = getBoxIdsNorth(box_ids[1], col, pre_row);

                // third box id
                box_ids[2] = getBoxIdsNorth(box_ids[2], col, pre_row);

                // set the box background
                document.getElementById(box_ids[0]).style.backgroundColor = "#000000";
                document.getElementById(box_ids[1]).style.backgroundColor = "#000000";
                document.getElementById(box_ids[2]).style.backgroundColor = "#000000";

            }

            break;

        case 'S':
            if(typeof(box_ids) === "object"){
                
                // set the column number
                if(pre_direction === "E"){
                    var col = parseInt(box_ids[0].substring(2));
                    var pre_row = parseInt(box_ids[0].substring(0, 1));
                }else if(pre_direction === "W"){
                    var col = parseInt(box_ids[0].substring(2));
                    var pre_row = parseInt(box_ids[0].substring(0, 1));
                }else{
                    clearInterval(interval); clearInterval(food_interval);
                    alert('Trying to move an invalid direction');
                }

                // empty the previous boxes
                document.getElementById(box_ids[0]).style.backgroundColor = "";
                document.getElementById(box_ids[1]).style.backgroundColor = "";
                document.getElementById(box_ids[2]).style.backgroundColor = "";

                // first box id
                box_ids[0] = getBoxIdsSouth(box_ids[0], col, pre_row);

                // determine food infront of face
                var food_id;
                if(box_ids[0].substring(0, 1) === "8"){
                    food_id = '1-' + box_ids[0].substring(2);
                }else{
                    food_id = (parseInt(box_ids[0].substring(0, 1)) + 1) + '-' + box_ids[0].substring(2);
                }
                
                // set the score
                set_score(document.getElementById(food_id).class);

                // second box id
                box_ids[1] = getBoxIdsSouth(box_ids[1], col, pre_row);

                // third box id
                box_ids[2] = getBoxIdsSouth(box_ids[2], col, pre_row);

                // set the box background
                document.getElementById(box_ids[0]).style.backgroundColor = "#000000";
                document.getElementById(box_ids[1]).style.backgroundColor = "#000000";
                document.getElementById(box_ids[2]).style.backgroundColor = "#000000";

            }

            break;

        default:
            // console.log(false);
            break;

    }

}

function set_score(score_elem){
    if(score_elem === "food-elem"){
        var score = parseInt(document.getElementById('score').innerText.substring(7)) + food_score;
        document.getElementById('score').innerText = ''; 
        document.getElementById('score').innerText = 'Score: ' + score;
        if(score === winning_score){
            clearInterval(interval); clearInterval(food_interval);
            alert('You win the game.');
            document.getElementById('gameplay').innerText = 'Restart';
        } 
    }
}

var pre_food_elem;
function place_food(){
    if(parseInt(box_ids[0].substring(0, 1)) === 8){
        row_id[parseInt(box_ids[0].substring(0, 1)) - 1] = 1;
    }else{
        row_id[parseInt(box_ids[0].substring(0, 1)) - 1] = parseInt(box_ids[0].substring(0, 1)) + 1;
    }

    if(parseInt(box_ids[0].substring(2)) === 8){
        col_id[parseInt(box_ids[0].substring(2)) - 1] = 1;
    }else{
        col_id[parseInt(box_ids[0].substring(2)) - 1] = parseInt(box_ids[0].substring(2)) + 1;
    }
    
    var food_row = random_id('row');
    var food_col = random_id('col');

    if(typeof(pre_food_elem) === "undefined"){
        document.getElementById(food_row + '-' + food_col).style.backgroundColor = '#FFC300'; 
        document.getElementById(food_row + '-' + food_col).class = 'food-elem'; 
        pre_food_elem = food_row + '-' + food_col;
    }

    if(typeof(pre_food_elem) === "string"){
        document.getElementById(pre_food_elem).style.backgroundColor = "";
        document.getElementById(pre_food_elem).class = "";
        document.getElementById(food_row + '-' + food_col).style.backgroundColor = "#FFC300";
        document.getElementById(food_row + '-' + food_col).class = "food-elem";
        pre_food_elem = food_row + '-' + food_col;
    }
    
}

function getBoxIdsEast(box_id, row, pre_col){
    if(parseInt(box_id.substring(0, 1)) === row){
        if(box_id.substring(2) === "8"){
            return box_id.substring(0, 1) + '-1';
        }else{
            return box_id.substring(0, 1) + '-' + (parseInt(box_id.substring(2)) + 1);
        }
    }else{
        var cur_row;
        if(pre_direction === "N"){
            cur_row = row + 1;
            if(row === 8){
                if(box_id.substring(0, 1) === "8"){
                    return box_id.substring(0, 1) + '-' + (parseInt(box_id.substring(2)) + 1);
                }
                
                if(box_id.substring(0, 1) === "1"){
                    return '8-' + box_id.substring(2);
                }
            }

            if(row === 7){
                if(box_id.substring(0, 1) === "7"){
                    return box_id.substring(0, 1) + '-' + (parseInt(box_id.substring(2)) + 1);
                }

                if(box_id.substring(0, 1) === "8"){
                    return (parseInt(box_id.substring(0, 1)) - 1) + '-' + box_id.substring(2);
                }

                if(box_id.substring(0, 1) === "1"){
                    return '8-' + box_id.substring(2);
                }
            }
        }else if(pre_direction === "S"){
            cur_row = row - 1;
            if(row === 1){
                if(box_id.substring(0, 1) === "1"){
                    return box_id.substring(0, 1) + '-' + (parseInt(box_id.substring(2)) + 1);
                }
                
                if(box_id.substring(0, 1) === "8"){
                    return '1-' + box_id.substring(2);
                }
            }

            if(row === 2){
                if(box_id.substring(0, 1) === "2"){
                    return box_id.substring(0, 1) + '-' + (parseInt(box_id.substring(2)) + 1);
                }

                if(box_id.substring(0, 1) === "1"){
                    return (parseInt(box_id.substring(0, 1)) + 1) + '-' + box_id.substring(2);
                }

                if(box_id.substring(0, 1) === "8"){
                    return '1-' + box_id.substring(2);
                }
            }
        }else{
            console.log('Trying to move an invalid direction');
        }

        if(parseInt(box_id.substring(2)) > pre_col && parseInt(box_id.substring(0, 1)) === cur_row){
            return box_id.substring(0, 1) + '-' + (parseInt(box_id.substring(2)) - 1);
        }else{
            if(pre_direction === "N"){
                return (parseInt(box_id.substring(0, 1)) - 1) + '-' + box_id.substring(2);
            }else if(pre_direction === "S"){
                return (parseInt(box_id.substring(0, 1)) + 1) + '-' + box_id.substring(2);
            }else{
                clearInterval(interval); clearInterval(food_interval);
                alert('Trying to move an invalid direction');
            }
        }
    }
}

function getBoxIdsWest(box_id, row, pre_col){
    if(parseInt(box_id.substring(0, 1)) === row){
        if(box_id.substring(2) === "1"){
            return box_id.substring(0, 1) + '-8';
        }else{
            return box_id.substring(0, 1) + '-' + (parseInt(box_id.substring(2)) - 1);
        }
    }else{
        var cur_row;
        if(pre_direction === "N"){
            cur_row = row + 1;
            if(row === 8){
                if(box_id.substring(0, 1) === "8"){
                    return box_id.substring(0, 1) + '-' + (parseInt(box_id.substring(2)) - 1);
                }
                
                if(box_id.substring(0, 1) === "1"){
                    return '8-' + box_id.substring(2);
                }
            }

            if(row === 7){
                if(box_id.substring(0, 1) === "7"){
                    return box_id.substring(0, 1) + '-' + (parseInt(box_id.substring(2)) - 1);
                }

                if(box_id.substring(0, 1) === "8"){
                    return (parseInt(box_id.substring(0, 1)) - 1) + '-' + box_id.substring(2);
                }

                if(box_id.substring(0, 1) === "1"){
                    return '8-' + box_id.substring(2);
                }
            }
        }else if(pre_direction === "S"){
            cur_row = row - 1;
            if(row === 1){
                if(box_id.substring(0, 1) === "1"){
                    return box_id.substring(0, 1) + '-' + (parseInt(box_id.substring(2)) - 1);
                }
                
                if(box_id.substring(0, 1) === "8"){
                    return '1-' + box_id.substring(2);
                }
            }

            if(row === 2){
                if(box_id.substring(0, 1) === "2"){
                    return box_id.substring(0, 1) + '-' + (parseInt(box_id.substring(2)) - 1);
                }

                if(box_id.substring(0, 1) === "1"){
                    return (parseInt(box_id.substring(0, 1)) + 1) + '-' + box_id.substring(2);
                }

                if(box_id.substring(0, 1) === "8"){
                    return '1-' + box_id.substring(2);
                }
            }
        }else{
            console.log('Trying to move an invalid direction');
        }

        if(parseInt(box_id.substring(2)) < pre_col && parseInt(box_id.substring(0, 1)) === cur_row){
            return box_id.substring(0, 1) + '-' + (parseInt(box_id.substring(2)) + 1);
        }else{
            if(pre_direction === "N"){
                return (parseInt(box_id.substring(0, 1)) - 1) + '-' + box_id.substring(2);
            }else if(pre_direction === "S"){
                return (parseInt(box_id.substring(0, 1)) + 1) + '-' + box_id.substring(2);
            }else{
                clearInterval(interval); clearInterval(food_interval);
                alert('Trying to move an invalid direction');
            }
        }
    }
}

function getBoxIdsNorth(box_id, col, pre_row){
    if(parseInt(box_id.substring(2)) === col){
        if(box_id.substring(0, 1) === "1"){
            return '8-' + col;
        }else{
            return (parseInt(box_id.substring(0, 1)) - 1) + '-' + col;
        }
    }else{
        var cur_col;
        if(pre_direction === "E"){
            cur_col = col - 1;
            if(col === 1){
                if(box_id.substring(2) === "1"){
                    return (parseInt(box_id.substring(0, 1)) - 1) + '-' + box_id.substring(2); 
                }

                if(box_id.substring(2) === "8"){
                    return box_id.substring(0, 1) + '-1';
                }
            }

            if(col === 2){
                if(box_id.substring(2) === "2"){
                    return (parseInt(box_id.substring(0, 1)) - 1) + '-' + box_id.substring(2);
                }

                if(box_id.substring(2) === "1"){
                    return box_id.substring(0, 1) + '-' + (parseInt(box_id.substring(2)) + 1);
                }

                if(box_id.substring(2) === "8"){
                    return box_id.substring(0, 1) + '-1';
                }
            }
        }else if(pre_direction === "W"){
            cur_col = col + 1;
            if(col === 8){
                if(box_id.substring(2) === "8"){
                    return (parseInt(box_id.substring(0, 1)) - 1) + '-' + box_id.substring(2);
                }

                if(box_id.substring(2) === "1"){
                    return box_id.substring(0, 1) + '-8'; 
                }
            }

            if(col === 7){
                if(box_id.substring(2) === "7"){
                    return (parseInt(box_id.substring(0, 1)) - 1) + '-' + box_id.substring(2);
                }

                if(box_id.substring(2) === "8"){
                    return box_id.substring(0, 1) + '-' + (parseInt(box_id.substring(2)) - 1);
                }

                if(box_id.substring(2) === "1"){
                    return box_id.substring(0, 1) + '-8';
                }
            }
        }else{
            console.log('Trying to move an invalid direction');
        }

        if(parseInt(box_id.substring(0, 1)) < pre_row && parseInt(box_id.substring(2)) === cur_col){
            return (parseInt(box_id.substring(0, 1)) + 1) + '-' + box_id.substring(2);
        }else{
            if(pre_direction === "E"){
                return box_id.substring(0, 1) + '-' + (parseInt(box_id.substring(2)) + 1);
            }else if(pre_direction === "W"){
                return box_id.substring(0, 1) + '-' + (parseInt(box_id.substring(2)) - 1);
            }else{
                clearInterval(interval); clearInterval(food_interval);
                alert('Trying to move an invalid direction');
            }
        }
    }
}

function getBoxIdsSouth(box_id, col, pre_row){
    if(parseInt(box_id.substring(2)) === col){
        if(box_id.substring(0, 1) === "8"){
            return '1-' + col;
        }else{
            return (parseInt(box_id.substring(0, 1)) + 1) + '-' + col;
        }
    }else{
        var cur_col;
        if(pre_direction === "E"){
            cur_col = col - 1;
            if(col === 1){
                if(box_id.substring(2) === "1"){
                    return (parseInt(box_id.substring(0, 1)) + 1) + '-' + box_id.substring(2); 
                }

                if(box_id.substring(2) === "8"){
                    return box_id.substring(0, 1) + '-1';
                }
            }

            if(col === 2){
                if(box_id.substring(2) === "2"){
                    return (parseInt(box_id.substring(0, 1)) + 1) + '-' + box_id.substring(2);
                }

                if(box_id.substring(2) === "1"){
                    return box_id.substring(0, 1) + '-' + (parseInt(box_id.substring(2)) + 1);
                }

                if(box_id.substring(2) === "8"){
                    return box_id.substring(0, 1) + '-1';
                }
            }
        }else if(pre_direction === "W"){
            cur_col = col + 1;
            if(col === 8){
                if(box_id.substring(2) === "8"){
                    return (parseInt(box_id.substring(0, 1)) + 1) + '-' + box_id.substring(2);
                }

                if(box_id.substring(2) === "1"){
                    return box_id.substring(0, 1) + '-8';
                }
            }

            if(col === 7){
                if(box_id.substring(2) === "7"){
                    return (parseInt(box_id.substring(0, 1)) + 1) + '-' + box_id.substring(2);
                }

                if(box_id.substring(2) === "8"){
                    return box_id.substring(0, 1) + '-' + (parseInt(box_id.substring(2)) - 1);
                }

                if(box_id.substring(2) === "1"){
                    return box_id.substring(0, 1) + '-8';
                }
            }
        }else{
            console.log('Trying to move an invalid direction');
        }

        if(parseInt(box_id.substring(0, 1)) > pre_row && parseInt(box_id.substring(2)) === cur_col){
            return (parseInt(box_id.substring(0, 1)) - 1) + '-' + box_id.substring(2);
        }else{
            if(pre_direction === "E"){
                return box_id.substring(0, 1) + '-' + (parseInt(box_id.substring(2)) + 1);
            }else if(pre_direction === "W"){
                return box_id.substring(0, 1) + '-' + (parseInt(box_id.substring(2)) - 1);
            }else{
                clearInterval(interval); clearInterval(food_interval);
                alert('Trying to move an invalid direction');
            }
        }
    }
}

document.onkeydown = changeDirection;

function changeDirection(e) {
    var code;
    if(typeof(e) === "object"){
        code = e.keyCode;
    }else{
        code = e;
    }

    if(game_mode === "Start"){
        switch (code){

            // North
            case 38:
                if(direction === "E" || direction === "W"){
                    clearInterval(interval); clearInterval(food_interval);
                    pre_direction = direction; direction = "N";
                    startInterval();
                }else{
                    console.log('Trying to move an invalid direction');
                }

                break;

            // South
            case 40:
                if(direction === "E" || direction === "W"){
                    clearInterval(interval); clearInterval(food_interval);
                    pre_direction = direction; direction = "S";
                    startInterval();
                }else{
                    console.log('Trying to move an invalid direction');
                }

                break;
            
            // East
            case 39:
                if(direction === "N" || direction === "S"){
                    clearInterval(interval); clearInterval(food_interval);
                    pre_direction = direction; direction = "E";
                    startInterval();
                }else{
                    console.log('Trying to move an invalid direction');
                }

                break;

            // West
            case 37:
                if(direction === "N" || direction === "S"){
                    clearInterval(interval); clearInterval(food_interval);
                    pre_direction = direction; direction = "W";
                    startInterval();
                }else{
                    console.log('Trying to move an invalid direction');
                }

                break;

            default:
                console.log('Invalid key pressed');
                break;
        }
    }
}

function changeMove(event, code){
    event.preventDefault();
    if(typeof(parseInt(code)) === "number"){
        changeDirection(parseInt(code));
    }
}

function random_id(pos){
    switch (pos){
        case 'row':
            return row_id[Math.floor(Math.random() * row_id.length)];
            break;

        case 'col':
            return col_id[Math.floor(Math.random() * col_id.length)]
            break;

        default:
            return 1;
            break;
    }
    
}

function changeCond(event, elem){
    event.preventDefault();

    switch (elem.innerText) {
        case 'Pause':
            clearInterval(interval); clearInterval(food_interval);
            elem.innerText = "Start";
            game_mode = "Pause";
            break;

        case 'Start':
            game_mode = "Start";
            startInterval();
            elem.innerText = "Pause";
            break;

        case 'Restart':
            game_mode = "Start";
            elem.innerText = 'Pause';
            document.getElementById('score').innerText = 'Score: 0';
            startInterval();
            break;

        default:
            return false;
            break;
    }
}

function change_food_score(event, elem){
    event.preventDefault();
    if(typeof(parseInt(elem.value)) === "number"){
        food_score = parseInt(elem.value);
    }
}

function change_winning_score(event, elem){
    event.preventDefault();
    if(typeof(parseInt(elem.value)) === "number"){
        winning_score = parseInt(elem.value);
    }
}

function change_speed(event, elem){
    event.preventDefault();
    if(typeof(parseInt(elem.value)) === "number"){
        if(game_mode === "Start"){
            clearInterval(interval); clearInterval(food_interval);
            object_speed = parseInt(elem.value);
            food_speed = object_speed * 6;
            startInterval();
        }

        if(game_mode === "Pause"){
            clearInterval(interval); clearInterval(food_interval);
            object_speed = parseInt(elem.value);
            food_speed = object_speed * 6;
        }
    }
}
