var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particle;
var plinkos = [];
var divisions = [];

var divisionHeight=200;
var score =0;

var gameState=0;
var turn=5;
function setup() {
  createCanvas(300, 500);
  engine = Engine.create();
  world = engine.world;
  ground = new Rectangle(width/2,height,width,20);
  wallL=new Rectangle(0,height/2,1,height);
  wallR=new Rectangle(width,height/2,1,height);


   for (var k = 0; k <=width; k = k + 60) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 5, divisionHeight));
   }


    for (var j = 25; j <=width; j=j+40) 
    {
       plinkos.push(new Plinko(j,70));
    }

    for (var j = 12; j <=width; j=j+40) 
    {
       plinkos.push(new Plinko(j,110));
    }

     for (var j = 25; j <=width; j=j+40) 
    {
       plinkos.push(new Plinko(j,150));
    }

     for (var j = 12; j <=width; j=j+40) 
    {
       plinkos.push(new Plinko(j,190));
    }

    for (var j = 25; j <=width; j=j+40) 
    {
       plinkos.push(new Plinko(j,230));
    }
    
}

function draw() {
  background("black");
  textSize(20);
  textAlign(CENTER);

  fill(255);
  text("Score: "+score,50,30);
  text("Turns remaining: "+turn,200,30);
  textSize(15);
  text("250",30,330);
  text("300",90,330);
  text("100",150,330);
  text("500",210,330);
  text("250",270,330);

  Engine.update(engine);

  wallL.display();
  wallR.display();
  
  for (var i = 0; i < plinkos.length; i++) {
     plinkos[i].display();
  }

  for (var k = 0; k < divisions.length; k++) {
    divisions[k].display();
  }
     
  ground.display();

  if(particle!=null){
    particle.display();
    if(particle.body.position.y>340){
      if(particle.body.position.x<60){
        score+=250;
        particle=null;
      }
    }
  }
  if(particle!=null){
    particle.display();
    if(particle.body.position.y>340){
      if(particle.body.position.x>60 && particle.body.position.x<120){
        score+=300;
        particle=null;
      }
    }
  }
  if(particle!=null){
    particle.display();
    if(particle.body.position.y>340){
      if(particle.body.position.x>120 && particle.body.position.x<180){
        score+=100;
        particle=null;
      }
    }
  }
  if(particle!=null){
    particle.display();
    if(particle.body.position.y>340){
      if(particle.body.position.x>180 && particle.body.position.x<240){
        score+=500;
        particle=null;
      }
    }
  }
  if(particle!=null){
    particle.display();
    if(particle.body.position.y>340){
      if(particle.body.position.x>240){
        score+=250;
        particle=null;
      }
    }
  }
  if(turn===0){
    gameState=1;
  }
  if(gameState===1 && particle===null){
    fill("yellow");
    text("Your Score: "+score,160,290);
    text("Click to restart",160,310);
    textSize(30);
    text("Game Over",160,260);
  }
}

function mousePressed(){
  if(gameState!=1 && mouseY<100){
    particle=new Particle(mouseX,mouseY, 10,10);
    turn--;
  }
  if(gameState===1 && particle===null){
    turn=5;
    score=0;
    gameState=0;
  }
}