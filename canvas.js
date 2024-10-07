var snakeVector = [[10,6],[10,5],[10,4]]
var mapSize = [21,21]
var cellSize = 800/mapSize[0]
var matrixMap = new Array();

function keyDown(event){
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
      }
      switch (event.key) {
        case "ArrowDown":console.log("down");break;
        case "ArrowUp":console.log("up");break;
        case "ArrowLeft":console.log("left");break;
        case "ArrowRight":console.log("right");break;
        default:return; // Quit when this doesn't handle the key event.
      }
      event.preventDefault();
}

function initMap(stage){
    for(var i = 0;i<mapSize[0];i++){
        var line=new Array()
        for(var j = 0;j<mapSize[1];j++){
            line.push(0);
            tile = new createjs.Shape();
            tile.graphics.s("gray").drawRect(j*cellSize,i*cellSize,cellSize,cellSize);
            stage.addChild(tile);
            stage.update(event);
        }
        matrixMap.push(line);
    }
}



function initSnake(stage){
    for(var i =0;i<snakeVector.length;i++){
        matrixMap[snakeVector[i][0]][snakeVector[i][1]]=1;
        tile = new createjs.Shape();
        tile.graphics.f("red").dr(snakeVector[i][1]*cellSize,snakeVector[i][0]*cellSize,cellSize,cellSize);
        stage.addChild(tile);
        stage.update(event);
    }
}

function createFruit(stage){
    var fruitCords =[Math.floor(Math.random() * mapSize[0]),Math.floor(Math.random() * mapSize[1])]
    tile = new createjs.Shape();
    tile.graphics.f("green").dr(fruitCords[1]*cellSize,fruitCords[0]*cellSize,cellSize,cellSize);
    stage.addChild(tile);
    stage.update(event);
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

// function initCircle(stage,circle,size,color){
//     circle.graphics.beginFill(color).drawCircle(450, 450, size);
//     stage.addChild(circle);
//     stage.update(event);
// }


function drawDiagonal() { 
    var stage = new createjs.Stage("canvas"); 
    
    initMap(stage);
    initSnake(stage);
    createFruit(stage);
    console.log(matrixMap);


} 
window.addEventListener("load", keyDown, true);

window.addEventListener("load", drawDiagonal, true);