var bg,bgImg;
var player, shooterImg, shooter_shooting,playerimg,player2,atirando;
var cavernaimg,caverna
var chao
var zumbie,zombieimg,zumbieimg2
var vida,vidaimg,umavida,umavidaimg,duasvida,duasvidaimg
var vidas=3
var tiros=70
var tiro
var gameState="play"
var score=0
var pontuacao
var esquerda=false
var som1,som2,som3

function preload(){
  shooterImg=loadImage("./assets/shooter_2.png")
playerimg=loadImage("./assets/shooter_1.png")
  shooter_shooting=loadImage("./assets/shooter_3.png")
  bgImg=loadImage("./assets/fundo.png")
  cavernaimg=loadImage("./assets/caverna.png")
zombieimg=loadImage("./assets/zombie.png")
zombieimg2=loadImage("./assets/zombie_2.png")
  vidaimg=loadImage("./assets/heart_3.png")
  duasvidaimg=loadImage("./assets/heart_2.png")
  umavidaimg=loadImage("./assets/heart_1.png")
  player2=loadImage("./assets/shooter_4.png")
  atirando=loadImage("./assets/shooter_5.png")
 som1=loadSound("./assets/win.mp3")
 som2=loadSound("./assets/lose.mp3")
 som3=loadSound("./assets/explosion.mp3")
}

function setup() {

  
  
  createCanvas(1300,600);

  //adicionando a imagem de fundo
  bg = createSprite(600,300,1200,600)
  bg.addImage("fundo.png",bgImg)

  caverna=createSprite(960,520)
  caverna.addImage("caverna.png",cavernaimg)
  caverna.scale =0.6
  caverna.setCollider("rectangle",100,0,100,100);
  caverna.debug=false

  //criando o sprite do jogador
  player = createSprite(400,500,50,50);
  player.addImage("shooter_2.png",shooterImg)
  player.scale=0.3
  player.addImage("atirando",shooter_shooting)
  player.addImage("normal",shooterImg)
  player.addImage("esquerda",player2)
  player.changeImage("normal")
  player.addImage("atirando2",atirando)
  player.depth = caverna.depth

  chao = createSprite(600,600,5000,1);

vida=createSprite(1200,40,20,20)
vida.addImage("heart_3png",vidaimg)
vida.scale=0.3
vida.visible=true

duasvida=createSprite(1200,40,20,20)
duasvida.addImage("heart_2png",duasvidaimg)
duasvida.scale=0.3
duasvida.visible=false

umavida=createSprite(1200,40,20,20)
umavida.addImage("heart_1png",umavidaimg)
umavida.scale=0.3
umavida.visible=false

zombiegroup= new Group()

tirogroup=new Group()
}

function draw() {
  background(0); 

  if(gameState==="play"){

if(vidas===3){
  vida.visible=true
  duasvida.visible=false
  umavida.visible=false
}

if(vidas===2){
  umavida.visible=false
  duasvida.visible=true
  vida.visible=false
}

if(vidas===1){
  umavida.visible=true
  duasvida.visible=false
  vida.visible=false
}

if(vidas===0){
  umavida.visible=false
  duasvida.visible=false
  vida.visible=false
  gameOver()
  gameState="over"
  som2.play()
}

 //movendo o jogador para cima e para baixo e tornando o jogo compatível com dispositivos móveis usando toques
 if(player.y>490){
  if(keyDown("UP_ARROW")||touches.length>0){
    player.velocityY=-5

  }}
  player.velocityY = player.velocityY+0.8
player.collide(chao)



  if(keyDown("RIGHT_ARROW")||touches.length>0){
    player.x = player.x+10
    player.changeImage("normal") 
    esquerda=false
  }

  if(keyDown("LEFT_ARROW")||touches.length>0){
    player.x = player.x-10
    player.changeImage("esquerda") 
    esquerda=true
  }
  //solte balas e mude a imagem do atirador para a posição de tiro quando a tecla de espaço for pressionada
  if(keyWentDown("space")){
  if(esquerda===true){
    tiros-=1
    player.changeImage("atirando2") 
    tiro=createSprite(player.x+40,player.y-20,5,5)
    tiro.velocityX=-10
    tirogroup.add(tiro);
    console.log(tiro)
    som3.play()
  }
else{
    tiros-=1
    player.changeImage("atirando") 
    tiro=createSprite(player.x+40,player.y-20,5,5)
    tiro.velocityX=10
    tirogroup.add(tiro);
    console.log(tiro)
    som3.play()
}
  
  }
      else if(keyWentUp("space")){
    
    player.changeImage("normal")
     
       }
  //o jogador volta à imagem original quando pararmos de pressionar a barra de espaço

  player.overlap(zombiegroup, function(collector, collected) {
    collected.remove();
    vidas-=1
  });

  tirogroup.overlap(zombiegroup, function(collector, collected) {
    collected.remove();
    collector.remove()
    score+=2
  });

  if(tiros===0){
    gameOver2()
   gameState="over"
   som2.play()
  }


  if(player.isTouching(caverna) && score>=10){
    //win()
    camera.x = player.x
    //zombiegroup.setVelocityXEach(0)
    //tirogroup.setVelocityXEach(0)
    gameState = "over"
    win()
    som1.play()
  }

  
  spawzombi()
}

textSize(20) 
  fill("white")
   text("munição = " + tiros,1150,100)

   textSize(20) 
  fill("white")
   text("score = " + score,1150,150)


  drawSprites();
if(gameState==="over"){
    zombiegroup.remove()
tirogroup.remove()

}


}

function spawzombi() {
  //escrever código aqui para gerar zombi
  if (frameCount % 90 === 0) {
    var zombie = createSprite(1000,550,40,10);
    zombie.y = Math.round(random(500,550));
    zombie.addImage(zombieimg);
    zombie.scale = 0.15;
    zombie.velocityX = -3;
    
    
     //atribuir tempo de vida à variável
    //cloud.lifetime = 200;
    
    //ajustar a profundidade
    //cloud.depth = trex.depth;
    //trex.depth = trex.depth + 1;
    
    //acrescentar cada nuvem ao grupo
    zombiegroup.add(zombie);
  }
  if (frameCount % 110 === 0) {
    var zombie2 = createSprite(50,550,40,10);
     zombie2.y = Math.round(random(500,550));
      zombie2.addImage(zombieimg2);
      zombie2.scale = 0.15;
      zombie2.velocityX = +3;
    
    
     //atribuir tempo de vida à variável
    //cloud.lifetime = 200;
    
    //ajustar a profundidade
    //cloud.depth = trex.depth;
    //trex.depth = trex.depth + 1;
    
    //acrescentar cada nuvem ao grupo
  zombiegroup.add(zombie2);
    }
}




function gameOver() {
  swal({
    title: `Fim de Jogo`,
    text: "Os zombis te pegaram",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
    imageSize: "100x100",
    confirmButtonText: "Obrigado por jogar"
  });
}

function gameOver2() {
  swal({
    title: `Fim de Jogo`,
    text: "As munições acabaram",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
    imageSize: "100x100",
    confirmButtonText: "Obrigado por jogar"
  });
}

function win() {
  swal({
    title: `Você venceu`,
    text: "você se salvou com sucesso!",
    imageUrl:
      "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
    imageSize: "100x100",
    confirmButtonText: "Ok"
  });
}