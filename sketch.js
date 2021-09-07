const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var base1,base2;

var bridge, jointPoint;

var jointLink;

var stones = [];
var stone;

var zombie,zombieImg;

var bgImg;

var edges;

var breakButton;

function preload() {
  zombieImg = loadImage("./assets/zombie.png");

  bgImg = loadImage("./assets/background.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  base1 =  new Base (200, height/2 + 50, 500, 100, true);
  base2 = new Base (width - 250, height/2 + 50, 700, 100, true);
  
  bridge = new Bridge(12, { x: width/2 - 300, y: height/2 });
  jointPoint = new Base(width - 600, height / 2 + 10, 40, 20, color, true);
  Matter.Composite.add(bridge.body, jointPoint);
  jointLink = new Link (bridge, jointPoint);

  zombie = createSprite(width/2, height - 110);
  zombie.addImage(zombieImg);
  zombie.scale = 0.1;
  zombie.velocityX = 10;

  breakButton = createButton("Break");
  breakButton.position(width - 585, height/2 - 0);
  breakButton.class("breakbutton");
  breakButton.mouseClicked(handleButttonPress);

  for(var i = 0; i <= 8; i++) {
    var x = random(width/2 - 200, width/2 + 100);
    var y = random(-10, 140);
    stone = new Stone(x,y, 50, 50);
    stones.push(stone);
  }

  imageMode(CENTER);
}

function draw() {
  background(51);
  image(bgImg,width/2,height/2,windowWidth,windowHeight);
  Engine.update(engine);

  edges = createEdgeSprites();
  zombie.bounceOff(edges);

  base1.show();
  base2.show();
  bridge.show();

  for(var stone of stones) {
    stone.show();
  }
  drawSprites();
}

function handleButttonPress() {
  jointLink.detach();
  setTimeout(() => {
    bridge.break();
  }, 1500);
}

