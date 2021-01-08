var dog; 
var happyDog;
var database;
var foodS;
var foodStock;
var dognor;
var feed, addFood;
var fedTime, lastFed;
var foodObj; 
        
function preload()
{
  dognor = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();

  foodObj = new food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  dog = createSprite(250,300,250,250);
  dog.addImage(dognor);
  dog.scale = 0.15;

  
  feed = createButton("Feed the dog");
  feed.position(600,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(500,95);
  addFood.mousePressed(addFoods);
}


function draw()
 {
   background(46,139,87) ; 
  dog.display();
  foodObj.display();
  
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  fill(255,255,254);
  stroke("black");
  textSize(15);

  text("food remaning :"+foodS,170,200);
    
  if(lastFed>=12){
    text("Last Fed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Fed : 12 AM",350,30);
   }else{
     text("Last Fed : "+ lastFed + " AM", 350,30);
   }

   drawSprites();
}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
  }

  function feedDog(){
    dog.addImage(happyDog);
  
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
      Food:foodObj.getFoodStock(),
      FeedTime:hour()
    })
  }

  function addFoods(){
    foodS++;
    database.ref('/').update({
      Food:foodS
    })
  } 
