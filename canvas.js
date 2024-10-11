var snakeVector = [[10,6],[10,5],[10,4]];
var previousTile = [10,3];
var mapSize = [21,21];
var cellSize = 800/mapSize[0];
var matrixMap = new Array();
var direction = "right";

function drawTile(stage,mode,color,cords){
    tile = new createjs.Shape();
    if(mode) tile.graphics.beginFill(color).dr(cords[1]*cellSize,cords[0]*cellSize,cellSize,cellSize);
    else tile.graphics.s("gray").beginFill("white").dr(cords[1]*cellSize,cords[0]*cellSize,cellSize,cellSize);
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
        case "ArrowDown":{if(direction!=="up")direction="down";break;}
        case "ArrowUp":{if(direction!=="down")direction="up";break;}
        case "ArrowLeft":{if(direction!=="right")direction="left";break;}
        case "ArrowRight":{if(direction!=="left")direction="right";break;}
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

function createFruit(){//fruit = 6, head collide fruit = 9 
    var fruitCords =[Math.floor(Math.random() * (mapSize[0]-2))+1,Math.floor(Math.random() * (mapSize[1]-2))+1]
    matrixMap[fruitCords[1]][fruitCords[0]] = 6;
}

function headCollide(){
    console.log(matrixMap[snakeVector[0][0]][snakeVector[0][1]])
    switch(matrixMap[snakeVector[0][0]][snakeVector[0][1]]){
        case 4:{alert("game over"); break}
        case 5:{alert("game over"); break}
        case 9:{alert("1"); break}
    }
}

function snakeMove(stage){
    var state=true;
    function tick(event) {
        previousTile[0]=snakeVector[snakeVector.length-1][0];
        previousTile[1]=snakeVector[snakeVector.length-1][1];
        matrixMap[previousTile[0]][previousTile[1]]=0
        drawTile(stage,0,"null",previousTile);

        for(var i=snakeVector.length-1;i>0;i--){
            matrixMap[snakeVector[i][0]][snakeVector[i][1]]=2;
            snakeVector[i][0]=snakeVector[i-1][0];
            snakeVector[i][1]=snakeVector[i-1][1];
            drawTile(stage,1,"red",snakeVector[i]);
        }
        
        switch(direction) {
            case "up":{
                matrixMap[snakeVector[0][0]][snakeVector[0][1]]+=3;
                snakeVector[0][0]--;break;
            }
            case "down":{
                matrixMap[snakeVector[0][0]][snakeVector[0][1]]+=3;
                snakeVector[0][0]++;break;
            }
            case "left":{
                matrixMap[snakeVector[0][0]][snakeVector[0][1]]+=3;
                snakeVector[0][1]--;break;
            }
            case "right":{
                matrixMap[snakeVector[0][0]][snakeVector[0][1]]+=3;
                snakeVector[0][1]++;break;
            }
        }
        drawTile(stage,1,"orange",snakeVector[0]);
        headCollide();
        stage.update(event);
    }
    
    createjs.Ticker.framerate=1; //устанавливаем количество кадров в секунду
    createjs.Ticker.addEventListener("tick", tick);
}

function drawDiagonal() { 
    var stage = new createjs.Stage("canvas"); 
    
    initMap(stage);
    drawSnake(stage);
    createFruit(stage);
    drawScene(stage);
    snakeMove(stage);
    console.log(matrixMap);


} 
window.addEventListener("load", drawDiagonal, true);
window.addEventListener("keydown", keyDown, true);