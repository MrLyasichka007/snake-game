var snakeVector = [[10,6],[10,5],[10,4]];
var grothTile = [10,3];
var prevTile = [10,2];
var backGrothTile = [10,3];
var backPrevTile = [10,2];
var mapSize = [21,21];
var cellSize = 800/mapSize[0];
var matrixMap = new Array();
var direction = "none";
var curDirection = "none";
var score = 0;
var fruitCords= [10,12]


function drawTile(stage,mode,color,cords){
    tile = new createjs.Shape();
    if(mode) tile.graphics.f(color).dr(cords[1]*cellSize,cords[0]*cellSize,cellSize,cellSize);
    else tile.graphics.s("gray").f("white").dr(cords[1]*cellSize,cords[0]*cellSize,cellSize,cellSize);
    stage.addChild(tile);
    stage.update(event);
}

function drawScene(stage){
    for(var i=0;i<mapSize[1];i++){
        for(var j=0;j<mapSize[0];j++){
            switch(matrixMap[i][j]){
                case 0:{drawTile(stage,0,"null",[i,j]);break;}
                case 1:{drawTile(stage,1,"black",[i,j]);break;}
                case 2:{drawTile(stage,1,"red",[i,j]);break;}
                case 3:{drawTile(stage,1,"orange",[i,j]);break;}
                case 6:{drawTile(stage,1,"green",[i,j]);break;}
        }
    }}
}

function keyDown(event){
    if (event.defaultPrevented) {
        return;
      }
      switch (event.key) {
        case "ArrowDown":{if(curDirection!=="up")direction="down";break;}
        case "ArrowUp":{if(curDirection!=="down")direction="up";break;}
        case "ArrowLeft":{if(curDirection!=="right" && direction!=="none")direction="left";break;}
        case "ArrowRight":{if(curDirection!=="left")direction="right";break;}
        default:return; // Quit when this doesn't handle the key event.
      }
      event.preventDefault();
}

function initMap(){//wall = 1, head collide wall = 4
    for(var i = 0;i<mapSize[0];i++){
        var line=new Array()
        for(var j = 0;j<mapSize[1];j++){
            if(i!==0 && i!==mapSize[1]-1 && j!==0 && j!==mapSize[0]-1)line.push(0);
            else line.push(1);
        }
        matrixMap.push(line);
    }
}

function initSnake(){//head = 3, tail = 2, head collide tail = 5 
    for(var i =0;i<snakeVector.length;i++){
        if(i===0)matrixMap[snakeVector[i][0]][snakeVector[i][1]]+=3;
        else matrixMap[snakeVector[i][0]][snakeVector[i][1]]=2;
    }
}

function createFruit(x,y){//fruit = 6, head collide fruit = 9
    fruitCords=[x,y];
    matrixMap[x][y] = 6;
}

function headCollide(stage){
    switch(matrixMap[snakeVector[0][0]][snakeVector[0][1]]){
        case 4:{alert("game over"); gameRestart(stage); break}
        case 5:{alert("game over"); gameRestart(stage); break}
        case 9:{
            score++;
            document.getElementById("score").textContent = score;
            console.log("grothTile="+grothTile+", prevTile="+prevTile+", backGrothTile="+backGrothTile+", backPrevTile="+backPrevTile)
            snakeVector.push([grothTile[0],grothTile[1]]);
            grothTile[0] = backGrothTile[0];
            grothTile[1] = backGrothTile[1];
            prevTile[0] = backPrevTile[0];
            prevTile[1] = backPrevTile[1];
            console.log("grothTile="+grothTile+", prevTile="+prevTile+", backGrothTile="+backGrothTile+", backPrevTile="+backPrevTile)
            fruitCords=[Math.floor(Math.random() * (mapSize[0]-2))+1,Math.floor(Math.random() * (mapSize[1]-2))+1]
            createFruit(fruitCords[0],fruitCords[1]);
            drawTile(stage,1,"green",fruitCords);
            break;}
        default:{backGrothTile[0]=grothTile[0]
            backGrothTile[1]=grothTile[1]
            backPrevTile[0]=prevTile[0];
            backPrevTile[1]=prevTile[1];break}
    }
    
}

function gameRestart(stage){
    score=0;
    document.getElementById("score").textContent = score;
    matrixMap[snakeVector[0][0]][snakeVector[0][1]]=1;
    drawTile(stage,1,"black",snakeVector[0]);
    for(var i=1;i<snakeVector.length;i++){
        matrixMap[snakeVector[i][0]][snakeVector[i][1]]=0;
        drawTile(stage,0,"null",snakeVector[i]);
    }
    drawTile(stage,0,"null",fruitCords)
    snakeVector=[[10,6],[10,5],[10,4]];
    grothTile = [10,3];
    createFruit(10,12);
    drawTile(stage,1,"green",fruitCords);
    direction = "none";
}

function snakeMove(stage){
    function tick(event) {
        curDirection=direction;
        if(direction==="none")return;
        prevTile[0]=grothTile[0];
        prevTile[1]=grothTile[1];
        drawTile(stage,0,"null",prevTile);
        grothTile[0]=snakeVector[snakeVector.length-1][0];
        grothTile[1]=snakeVector[snakeVector.length-1][1];
        drawTile(stage,0,"null",grothTile);

        for(var i=snakeVector.length-1;i>0;i--){
            matrixMap[snakeVector[i][0]][snakeVector[i][1]]=2;
            snakeVector[i][0]=snakeVector[i-1][0];
            snakeVector[i][1]=snakeVector[i-1][1];
            drawTile(stage,1,"red",snakeVector[i]);
        }
        matrixMap[grothTile[0]][grothTile[1]]=0;
        switch(curDirection) {
            case "up":{
                snakeVector[0][0]--;
                matrixMap[snakeVector[0][0]][snakeVector[0][1]]+=3;
                break;
            }
            case "down":{
                snakeVector[0][0]++;
                matrixMap[snakeVector[0][0]][snakeVector[0][1]]+=3;
                break;
            }
            case "left":{
                snakeVector[0][1]--;
                matrixMap[snakeVector[0][0]][snakeVector[0][1]]+=3;
                break;
            }
            case "right":{
                snakeVector[0][1]++;
                matrixMap[snakeVector[0][0]][snakeVector[0][1]]+=3;
                break;
            }
        }
        drawTile(stage,1,"orange",snakeVector[0]);
        stage.update(event);
        headCollide(stage);
        console.log("score="+score+", snakeVector=["+snakeVector+"], grothTile="+grothTile+", prevTile="+prevTile+", backGrothTile="+backGrothTile+", backPrevTile="+backPrevTile)
    }
    
    createjs.Ticker.framerate=5; //устанавливаем количество кадров в секунду
    createjs.Ticker.addEventListener("tick", tick);
}

function drawDiagonal() { 
    var stage = new createjs.Stage("canvas"); 
    
    initMap();
    initSnake();
    createFruit(fruitCords[0],fruitCords[1]);
    drawScene(stage);
    snakeMove(stage);
    
    console.log(matrixMap);
} 
window.addEventListener("load", drawDiagonal, true);
window.addEventListener("keydown", keyDown, true);