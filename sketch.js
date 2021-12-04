let video;
let poseNet;
let pose;
let skeleton;

let dog;
let background_img;
let dog_x;
let dog_y;

let chosen_dog = Math.floor(Math.random() * 3) + 1;

let flowers;
let pond;
let bone;

let bee;
let bee_x;
let bee_y;

let beat_bees = false;
let active_bees = false;
let beat_pond = false;
let beat_doghouse = false;

let success_count = 0;

function preload() {
  // dog = loadImage("assets/dog" + chosen_dog + ".gif");
  dog = loadImage("assets/dog1.gif");
  dog_wet = loadImage("assets/dog_wet.png");
  background_img = loadImage('assets/backyard.png');
  bee = loadImage("assets/bees.gif");
  flowers = loadImage("assets/flowers.png");
  pond = loadImage("assets/pond.png");
  field_bone = loadImage("assets/fieldhiddenbone.png");
  pond_bone = loadImage("assets/pondhiddenbone.png");
  house_bone = loadImage("assets/doghousehiddenbone.png");
  bone = loadImage("assets/bone.png");
  success = loadImage("assets/success.gif");
  doghouse = loadImage("assets/enemydoghouse.png");
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
  image(dog, 0, 0, 300, 300);
  dog_x = 1500;
  dog_y = 1500;

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
  image(flowers, 50, -50, 1200, 1200);
  image(field_bone, 980, 400, 200, 200);
  image(pond, 1500, 750, 1000, 1000);
  image(pond_bone, 2000, 1320, 200, 200);
  image(doghouse, 2100, -50, 800, 800);
  image(house_bone, 2400, 580, 150, 150);
  image(dog, dog_x, dog_y, 300, 300);
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

    // Show bees if Roscoe enters the flower field
    if (beat_bees == false) {
      if (dog_x >= 200 && dog_x <= 1000 && dog_y >= 300 && dog_y <= 1000) {
        image(bee, bee_x, bee_y, 200, 200);
        // bee_x = pose.nose.x - 200;
        // bee_y = pose.nose.y - 150;
        bee_x = mouseX - 300;
        bee_y = mouseY - 150;
        document.getElementById("bees-tooltip").style.display = "block";
        active_bees = true;
      }
    }

    // Hide tooltip and set beat_bees to true if Roscoe touches the bone
    if (dog_x >= 850 && dog_x <= 1000 && dog_y >= 350 && dog_y <= 500) {
      beat_bees = true;
      document.getElementById("bees-tooltip").style.display = "none";
    }
    
    // Show the field success bone
    if (beat_bees) {
      image(bone, 2900, 50, 200, 200);
      success_count++;
    }

    // Show tooltip if Roscoe enters the pond
    if (beat_pond == false) {
      if (dog_x >= 1500 && dog_x <= 2000 && dog_y >= 750 && dog_y <= 1320) {
        document.getElementById("pond-tooltip").style.display = "block";
        // Make dog_wet appear
      }
    }

    // Hide tooltip and set beat_pond to true if Roscoe touches the bone
    if (dog_x >= 1700 && dog_x <= 1850 && dog_y >= 1100 && dog_y <= 1250) {
      beat_pond = true;
      document.getElementById("pond-tooltip").style.display = "none";
    }

    // Show the pond success bone
    if (beat_pond) {
      image(bone, 2900, 300, 200, 200);
      success_count++;
    }

    // Show tooltip if Roscoe enters the doghouse
    if (beat_doghouse == false) {
      if (dog_x >= 1800 && dog_x <= 2400 && dog_y >= 0 && dog_y <= 500) {
        document.getElementById("house-tooltip").style.display = "block";
      }
    }

    // Hide tooltip and set beat_doghouse to true if Roscoe touches the bone
    if (dog_x >= 2000 && dog_x <= 2150 && dog_y >= 500 && dog_y <= 600) {
      beat_doghouse = true;
      document.getElementById("house-tooltip").style.display = "none";
    }

    // Show the doghouse success bone
    if (beat_doghouse) {
      image(bone, 2900, 500, 200, 200);
      success_count++;
    }

    // Show the success gif if they collect all 3 bones
    if (success_count == 3) {
      image(success, 1500, 1500, 300, 300);
    }

    // Play again button? Can use location.reload()

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





    
    
    
    

  

