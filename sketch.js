let video;
let poseNet;
let pose;
let skeleton;

let dog;
let background_img;
let dog_x;
let dog_y;

let chosen_dog = Math.floor(Math.random() * 3) + 1;

let bone1; 
let bone2; 
let bone3;

let flowers;
let pond;
let doghouse;

let bee;
let bee_x;
let bee_y;

let beat_bees = false;

function preload() {
  // dog = loadImage("assets/dog" + chosen_dog + ".gif");
  dog = loadImage("assets/dog1.gif");
  dog_wet = loadImage("assets/dog_wet.png");
  background_img = loadImage('assets/backyard.png');
  bee = loadImage("assets/bees.gif");
  bone1= loadImage("assets/bone.png")
  bone2= loadImage("assets/bone.png")
  bone3= loadImage("assets/bone.png")
  flowers = loadImage("assets/flowers.png");
  pond = loadImage("assets/pond.png");
  doghouse = loadImage("assets/enemydoghouse.png")
}

function setup() {
  
  // createCanvas(1800, 1000);
  createCanvas(windowWidth, windowHeight);
  
  // PoseNet setup
  video=createCapture(VIDEO);
  video.hide();
  video.size(windowWidth, windowHeight);

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);

  dog_current = dog; 
  
  // Add dog gif
  image(dog, 0, 0, 500, 500);
  dog_x = 50;
  dog_y = 50;

  // Add dog_wet
  image(dog_wet, 0, 0, 300, 300);
  // tint(0, 0, 0, 0);
  dog_wet_x = 50;
  dog_wet_y = 50;

  // Add bee image
  image(bee, 0, 0, 100, 100);
  bee_x = 50;
  bee_y = 50;

  
}

function gotPoses(poses) {
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function modelLoaded() {
  console.log('poseNet ready');
}

function draw() {
  background(background_img);
  //image(video, 0, 0, windowWidth, windowHeight);
  
  // x, y, width, height
  image(bone1, 400, 400, 300, 300);
  image(flowers, 100, 100, 1200, 1200);
  image(pond, 1500, 600, 1200, 1200);
  image(dog, dog_x, dog_y, 300, 300);
  image(doghouse, 3000, 100, 1200, 1200);


  tint(255, 0);
  image(dog_wet, dog_wet_x, dog_wet_y, 300, 300);
  image(bee, bee_x, bee_y, 200, 200);
  tint(255, 255);
  
  if(pose) {
    
    // Hide game info on left wrist position
    // if (pose.leftWrist.x >= 1200 && pose.leftWrist.x >= 2000 && 
    //   pose.leftWrist.y >= 1300 && pose.leftWrist.y >= 1520) {
    //   var game_info = document.getElementById("game-details");
    //   game_info.style.display = "none";
    // }

    if (mouseX >= 1200 && mouseX <= 2000 && 
      mouseY >= 1300 && mouseY <= 1520) {
      var game_info = document.getElementById("game-details");
      game_info.style.display = "none";
    }

    // if(pose.rightWrist.x - pose.leftWrist.x <= 10 && pose.rightWrist.y - pose.leftWrist.y <= 10) {
    //   dog_x = pose.nose.x - 150;
    //   dog_y = pose.nose.y - 150;
    //   dog_wet_x = pose.nose.x - 150;
    //   dog_wet_y = pose.nose.y - 150;
    // }

    // testing with mouse
    dog_x = mouseX - 150;
    dog_y = mouseY - 150;
    dog_wet_x = mouseX - 150;
    dog_wet_y = mouseY - 150;

    // Show bees if dog hits a certain coordinate
    if (dog_x >= 200 && dog_x <= 1000 && dog_y >= 300 && dog_y <= 1000) {
      image(bee, bee_x, bee_y, 200, 200);

      // bee_x = pose.nose.x - 200;
      // bee_y = pose.nose.y - 150;

      bee_x = mouseX - 200;
      bee_y = mouseY - 150;

      document.getElementById("bees-tooltip").style.display = "block";
    }
    
    // Display Skeleton
    for (let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      strokeWeight(2);
      stroke(255);
      line(a.position.x, a.position.y,b.position.x,b.position.y);      
    }

    // Display Pose Points
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      fill(255,255,255);
      ellipse(x,y,10,10);
    }
    
  }

}





    
    
    
    

  

