var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particle;
var plinkos = [];
var divisions = [];

var divisionHeight=250;
var score =0;

var gameState=0;
var turn=5;
function setup() {
  createCanvas(900, 600);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);


   for (var k = 0; k <=width; k = k + 90) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }


    for (var j = 25; j <=width; j=j+40) 
    {
       plinkos.push(new Plinko(j,50));
    }

    for (var j = 50; j <=width-10; j=j+40) 
    {
       plinkos.push(new Plinko(j,90));
    }

     for (var j = 25; j <=width; j=j+40) 
    {
       plinkos.push(new Plinko(j,130));
    }

     for (var j = 50; j <=width-10; j=j+40) 
    {
       plinkos.push(new Plinko(j,170));
    }

    for (var j = 25; j <=width-10; j=j+40) 
    {
       plinkos.push(new Plinko(j,210));
    }
    
}

function draw() {
  background("black");
  textSize(20);
  textAlign(CENTER);

  fill(255);
  text("Score : "+score,60,30);
  text("Turns remaining: "+turn,800,30);
  textSize(15);
  text("Random",45,370);
  text("Random",135,370);
  text("Random",225,370);
  text("Random",315,370);
  text("Random",405,370);
  text("Random",495,370);
  text("Random",585,370);
  text("Random",675,370);
  text("Random",765,370);
  text("Random",855,370);

  Engine.update(engine);
  
  for (var i = 0; i < plinkos.length; i++) {
     plinkos[i].display();
  }

  for (var k = 0; k < divisions.length; k++) {
    divisions[k].display();
  }
     
  ground.display();

  if(particle!=null){
    particle.display();
    if(particle.body.position.y>350){
      score+=(Math.round(random(1,10)))*50;
      particle=null;
    }
  }
  
  if(turn===0){
    gameState=1;
  }
  if(gameState===1 && particle===null){
    fill("yellow");
    text("Your Score: "+score,450,320);
    textSize(35);
    text("Game Over",450,270);
  }
}

function mousePressed(){
  if(gameState!=1 && mouseY<100){
    particle=new Particle(mouseX,mouseY, 10,10);
    turn--;
  }
}