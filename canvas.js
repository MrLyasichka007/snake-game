var snakeVector = [[10,6],[10,5],[10,4]];
var previousTile = [10,3]
var mapSize = [21,21];
var cellSize = 800/mapSize[0];
var matrixMap = new Array();
const Dirction = {UP:"UP",DOWN:"DOWN",LEFT:"LEFT",RIGHT:"RIGHT"};
var curDirection = Dirction.RIGHT;

function drawTile(stage,mode,color,cords){
    tile = new createjs.Shape();
    if(mode) tile.graphics.beginFill(color).dr(cords[1]*cellSize,cords[0]*cellSize,cellSize,cellSize);
    else tile.graphics.s("gray").beginFill("white").dr(cords[1]*cellSize,cords[0]*cellSize,cellSize,cellSize);
    stage.addChild(tile);
    stage.update(event);
}

function keyDown(event){
    if (event.defaultPrevented) {
        return;
      }
      switch (event.key) {
        case "ArrowDown":{curDirection=Dirction.DOWN;break;}
        case "ArrowUp":{curDirection=Dirction.UP;break;}
        case "ArrowLeft":{curDirection=Dirction.LEFT;break;}
        case "ArrowRight":{curDirection=Dirction.RIGHT;break;}
        default:return;
      }
      event.preventDefault();
}

function initMap(stage){
    for(var i = 0;i<mapSize[0];i++){
        var line=new Array()
        for(var j = 0;j<mapSize[1];j++){
            line.push(0);
            drawTile(stage,0,null,[i,j]);
        }
        matrixMap.push(line);
    }
}

function drawSnake(stage){
    drawTile(stage,0,"none",previousTile);
    matrixMap[previousTile[0]][previousTile[1]]=0;
    for(var i =0;i<snakeVector.length;i++){
        if(i===0){
            drawTile(stage,1,"orange",snakeVector[i]);
            matrixMap[snakeVector[i][0]][snakeVector[i][1]]+=5;
        }
        else if(i===snakeVector.length-1){
            drawTile(stage,1,"pink",snakeVector[i]);
            matrixMap[snakeVector[i][0]][snakeVector[i][1]]=1;
        }
        else{
            drawTile(stage,1,"red",snakeVector[i]);
            matrixMap[snakeVector[i][0]][snakeVector[i][1]]=1;
        }
    }
}

function createFruit(stage){
    var fruitCords =[Math.floor(Math.random() * mapSize[0]),Math.floor(Math.random() * mapSize[1])]
    drawTile(stage,1,"green",fruitCords);
    matrixMap[fruitCords[0]][fruitCords[1]]=3;
}

function colliding(stage){

}

// function anim(stage,circle,maxScale){
//     var state=true;
//     var scale=1.0;
//     function tick(event) {
//         if(state){scale+=0.1;}
//         else {scale-=0.1;}
        
//         if(scale>=maxScale)state=false;
//         if(scale<=1.0)state=true;
        
//         circle.setTransform((scale-1)*-450,(scale-1)*-450,scale,scale,0,0,0,0,0);
// 	stage.update(event);
//     }
    
//     createjs.Ticker.framerate=60; //устанавливаем количество кадров в секунду
//     createjs.Ticker.addEventListener("tick", tick);
// }

function drawDiagonal() { 
    var stage = new createjs.Stage("canvas"); 
    
    initMap(stage);
    drawSnake(stage);
    createFruit(stage);


    console.log(matrixMap);


} 
window.addEventListener("load", keyDown, true);

window.addEventListener("load", drawDiagonal, true);