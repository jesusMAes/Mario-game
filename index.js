// import platform from './images/platform.png'
const canvas = document.querySelector('canvas');

const c = canvas.getContext("2d");
//getcontext da un objeto que permite manipular el canvas usando metodos como draw para dibujar en él

//para que el canvas ocupe la ventana entera
canvas.width= 1024;
canvas.height = 576;


//imagenes de sprite-----------------------------------------
const inactivo = './images/Idle.png';
const saltar = './images/Jump.png';
const correr = './images/Run.png';
const correrIzquierda = './images/run-left.png'
const caer = './images/Fall.png'
const murciela = './images/Flight.png';
const vidas = createImage('images/hearts_hud.png')

//----------------------------------------------------------
console.log(c);
let framed =0;

const gravity = 1.5;
//el jugador es una clase, el constructor da las variables iniciales, la posicion es un objeto con dos claves, la x y la y
class Player {
  constructor(){
    this.vidas = 3;
    this.speed = 10
    this.saltos = 0
    this.position = {
      x: 100,
      y: 100
    }
    this.velocity = {
      x:0,
      y:1
    }
    this.width = 231;
    this.height = 140;

    this.image = createImage(inactivo);
    this.frames = 0;
    this.sprites = {
      stand: {
        right: createImage(inactivo)
      },
      run: {
        right:  createImage(correr),
        left: createImage(correrIzquierda)
      },
      jump:createImage(saltar),
      fall: createImage(caer)
    },
    

    this.currentSprite = this.sprites.stand.right;
  }

//el metodo de clase draw dibuja al personaje, llama al canvas y usa fill rect pasandole las propiedades del objeto para dibujarlo en él

  draw(){
    for(let i =0;i<this.vidas;i++){
      c.drawImage(vidas,50+i*15,50);
    }
    c.drawImage(
      this.currentSprite,
      231 * this.frames,
      0,
      231,
      190,
      this.position.x,
      this.position.y,
      this.width, 
      this.image.height)
  }

  //el metodo update va  aplicando la gravedad al personaje
  update(){
    if(this.currentSprite == this.sprites.stand.right){
      if(framed % 10 ==0){
       this.frames++
      
       }
      }else if(this.currentSprite == this.sprites.run.right){
        if(framed % 8==0){
          this.frames++
          }
      }else if(this.currentSprite == this.sprites.run.left){
        if(framed % 8==0){
          this.frames++
          }
      }else if(this.currentSprite == this.sprites.jump){
        if(framed % 8==0){
          this.frames++
          }
      }


    if(this.currentSprite==this.sprites.stand.right && this.frames > 5){
      this.frames =0;
    }else if(this.currentSprite== this.sprites.run.right && this.frames > 7){
      this.frames = 0;
    }else if(this.currentSprite== this.sprites.run.left && this.frames > 7){
      this.frames = 0;
    }else if(this.currentSprite== this.sprites.jump && this.frames > 1){
      this.frames = 0;
    }
    this.draw()//al llamar a draw redibujamos el personaje con las nuevas posiciones
    this.position.y += this.velocity.y; //esto hará caer al Pj
    this.position.x += this.velocity.x; //esto va sumando a la posición x, al pulsar la tecla damos valor a velocity y eso luego se suma aquí

    if(this.position.y+this.height+this.velocity.y <= canvas.height){
      //el if aumenta la velocidad siempre que la posición (que empieza en lo alto del personaje)más la altura más la altura no estén por debajo del lienzo. El sumar velocidad impide que de una vuelta de más y quede solapado

    this.velocity.y += gravity; //al aumentar cada vuelta la gravedad creamos aceleración haciendo que cada vez caiga más rápido
    }else{
    
    }

  }
}//FIN DE CLASE PLAYER


//clase enemigo
class Enemy {
  constructor(x,y,sprite){
    this.velocity =1;
    this.frames=0;
    this.framed=0;
    this.imagen = createImage(sprite)
    this.width = 150;
    this.height= 150;
    this.position={
    x,
    y
    }
   
  }
  //metodos
  draw(){
      c.drawImage(
        this.imagen,
        150 * this.frames,
        0,
        150,
        150,
        this.position.x,
        this.position.y,
        this.width, 
        this.height)
    

  }
  update(){
   if(this.framed %3 ==0){
    this.frames++
   }
    if(this.frames >7){
      this.frames=0;
    }
    this.draw();
    this.position.x +=this.velocity;
    
    // this.position.x +=this.velocity;

  }
}
class Platform {
  constructor({x,y, image}){
    this.position = {//como x: x e y: y son la misma letra puedes poner en posición solo x e y
      x,
      y
    }
    this.image = image
    this.width=image.width;
    this.height= image.height;
   
  }
  draw(){
    c.drawImage(this.image, this.position.x, this.position.y)
    
  }
}//FIN CLASE PLATAFORMA

class GenericObject {
  constructor({x,y, image}){
    this.position = {//como x: x e y: y son la misma letra puedes poner en posición solo x e y
      x,
      y
    }
    this.image = image
    this.width=image.width;
    this.height= image.height;
   
  }
  draw(){
    c.drawImage(this.image, this.position.x, this.position.y)
    
  }
}

//la imagen que usan las plataformas, usa una función para con los argumentos crear distintas imagenes

function createImage(imageSrc){
const image = new Image();
image.src = imageSrc;
return image
}
let platform = './images/platform.png'

let platformImage =createImage(platform)

//instanciamos al jugador, llamamos al metodo draw para pintarlo en el canvas
let player = new Player();
let murcielago = new Enemy(200, 400, murciela);
let platforms =[

]
//imagenes assets..............................................
let background = './images/background.png';
let hills = './images/hills.png'
let cielo = './images/sky.png'
let cieloAbajo = './images/CieloAbajo.png'
let monte = './images/far-grounds.png';

let anchoCielo =  112;
let altoCielo = 304;
let posicionCielo = 0
let nubes = './images/clouds.png'
//...........................................................
let genericObjects = [

]

let keys = {
  right:{
    pressed: false
  },
  left:{
    pressed: false//en el event listener cambiamos esta propiedad y usamos esta propiedad para moverlo
  },
}


let scrollOffset=0; //chequeamos la posición del jugador, cuando llegue a x punto decimos que ha ganado

let Numerocielo = 100;
 let PintarCielo =[];
 let pintarCieloAbajo=[];
 let posicionNube = 544;
 let Arraynubes=[];
 let arrayMonte = [];
 let arrayCesped = [];
function init(){


 platform = './images/platform.png'
let platformSmall = './images/platformSmallTall.png'
let plataformaBase = './images/plataformaBase.png'
let llana = './images/plataformaLlana.png'
let cesped = './images/cesped.png'
let plataformaFlotante = createImage('./images/plataformaFlotante.png')
let plataformaLlana = createImage(llana)
let cespedLlano = createImage(cesped)
 platformImage =createImage(platform)
 
 let anchoPlataforma = cespedLlano.width;
 let PosicionPlataforma = anchoPlataforma;

//instanciamos al jugador, llamamos al metodo draw para pintarlo en el canvas

 player = new Player();
murcielago = new Enemy(300, 300, murciela);
for(let i=0;i<500;i++){
 if(i<=5){
  arrayCesped.push(new Platform({
    x: 10*i,
    y:490,
    image: cespedLlano
  }));
 }
 if(i==25){
  arrayCesped.push(new Platform({
    x: PosicionPlataforma+= anchoPlataforma*2,
    y:490,
    image: cespedLlano
  }));
 }
 if(i==50){
  arrayCesped.push(new Platform({
    x: PosicionPlataforma+= anchoPlataforma*3,
    y:490,
    image: cespedLlano
  }));
 }
 if(i==75){
  arrayCesped.push(new Platform({
    x: PosicionPlataforma+= anchoPlataforma*4+200,
    y:490,
    image: cespedLlano
  }));
 }
 if(i==99){
  arrayCesped.push(new Platform({
    x: PosicionPlataforma+anchoPlataforma*3,
    y:360,
    image: plataformaFlotante
  }));
 }
 if(i==100){
  arrayCesped.push(new Platform({
    x: PosicionPlataforma += anchoPlataforma*4+300,
    y:490,
    image: cespedLlano
  }));
 }
 if(i>=107&& i<=109){
  arrayCesped.push(new Platform({
    x: PosicionPlataforma + anchoPlataforma*4+i*2,
    y:360+i/2,
    image: plataformaFlotante
  }));
 }
 if(i==110){
  arrayCesped.push(new Platform({
    x: PosicionPlataforma += anchoPlataforma*5+300,
    y:490,
    image: cespedLlano
  }));
 }
  arrayCesped.push(new Platform({
    x: PosicionPlataforma+= anchoPlataforma,
    y:490,
    image: cespedLlano
  }));
}
//  platforms =[
  
//   new Platform({
//     x:0,
//     y:490,
//     image: plataformaLlana
//   }),new Platform({
//     x: PosicionPlataforma+= anchoPlataforma-20,
//     y:490,
//     image: cespedLlano
//   }),new Platform({
//     x: PosicionPlataforma+= anchoPlataforma,
//     y:490,
//     image: cespedLlano
//   })
//   ,new Platform({
//     x: PosicionPlataforma+= anchoPlataforma,
//     y:490,
//     image: cespedLlano
//   }),new Platform({
//     x: PosicionPlataforma+= anchoPlataforma,
//     y:490,
//     image: cespedLlano
//   }),new Platform({
//     x: PosicionPlataforma+= anchoPlataforma,
//     y:490,
//     image: cespedLlano
//   }),new Platform({
//     x: PosicionPlataforma+= anchoPlataforma,
//     y:490,
//     image: cespedLlano
//   }),new Platform({
//     x: PosicionPlataforma+= anchoPlataforma,
//     y:490,
//     image: cespedLlano
//   }),new Platform({
//     x: PosicionPlataforma+= anchoPlataforma-15,
//     y:490,
//     image: cespedLlano
//   })
//]
 background = './images/background.png';
 hills = './images/hills.png'

 //arrays background
 for(let i= 0; i<Numerocielo;i++){
  if(i<3){
    PintarCielo.push(new GenericObject({
      x: 1,
      y: -2,
      image: createImage(cielo)
    }))
  }
  PintarCielo.push(new GenericObject({
    x: posicionCielo +=anchoCielo,
    y: -2,
    image: createImage(cielo)
  }))
 }
  posicionCielo=0
  posicionNube=0
  for(let i=0; i<25;i++){
    Arraynubes.push(new GenericObject({
      x: posicionNube ,
      y: 350,
      image: createImage(nubes)}))
      posicionNube+=540
   }
 for(let i= 0; i<Numerocielo;i++){
  
  if(i<3){
    pintarCieloAbajo.push(new GenericObject({
      x: 1,
      y: altoCielo-3,
      image: createImage(cieloAbajo)
    }))
  }
  pintarCieloAbajo.push(new GenericObject({
    x: posicionCielo +=anchoCielo,
    y: altoCielo-3,
    image: createImage(cieloAbajo)
  }))
 }
 arrayMonte = [
  new GenericObject({
    x: 850,
    y:335,
    image: createImage(monte)
  })
]

arrayCesped.forEach(plataforma =>{
  plataforma.draw()
})
 genericObjects = [
 
]


 scrollOffset=0; //chequeamos la posición del jugador, cuando llegue a x punto decimos que ha ganado

}//FUNCION INIT------------------------------


//FUNCION ANIMATE------------------------------------------
function animate (){
  framed++;
  murcielago.framed++
  //esto crea una animación repintando el canvas usando la función que le pasar por parametro, le pasamos la propia función animar creando un bucle infinito 
  requestAnimationFrame(animate)
  c.fillStyle = 'white'
  c.fillRect(0,0,canvas.width, canvas.height);

//llenar el background
  PintarCielo.forEach(genericObject => {
    genericObject.draw()
  })
  

  pintarCieloAbajo.forEach(genericObject => {
    genericObject.draw();
  })
  arrayMonte.forEach(monte =>{
    monte.draw()
  })
  Arraynubes.forEach(nube =>{
    nube.draw()
  } );
  arrayCesped.forEach(plataforma =>{
    plataforma.draw()
  })
   genericObjects = [
   
  ]
  
 
  

  
 
  genericObjects.forEach(genericObject => {
   
    genericObject.draw();
    
  })
  //fin background--------------------------------------------

  platforms.forEach(platform => {
    platform.draw();
  })


  player.update()//al llamarlo dentro del bucle lo estamos repintando continuamente, tenemos que llamar a clearRect para que borre el cuadrado anterior y pinte el nuevo
  murcielago.update()

  if(keys.right.pressed==true && player.position.x <400){
    player.velocity.x =player.speed;
  }else if((keys.left.pressed==true && player.position.x > 100) || (keys.left.pressed && scrollOffset ===0 && player.position.x >0)){
    player.velocity.x= -player.speed;
  }else{//mover y parar

    player.velocity.x=0;

    if(keys.right.pressed){
      scrollOffset +=player.speed;
      platforms.forEach(platform => {
        platform.position.x -= player.speed;
      })
      arrayCesped.forEach(platform => {
        platform.position.x -= player.speed;
        
      })
      Arraynubes.forEach(genericObject => {
        genericObject.position.x -= player.speed * 0.66;
      })
       arrayMonte.forEach(genericObject => {
         genericObject.position.x -= player.speed * 0.66;
       })
       murcielago.position.x -= 2
    
      
    }else if(keys.left.pressed && scrollOffset >0){
      scrollOffset -=player.speed;
      platforms.forEach(platform => {
        platform.position.x += player.speed;

      })
      arrayCesped.forEach(platform => {
        platform.position.x += player.speed;
        
      })
      arrayMonte.forEach(genericObject => {
        genericObject.position.x += player.speed * 0.66;
      })
      genericObjects.forEach(genericObject => {
        genericObject.position.x += player.speed * 0.66;
      })
   
    }
    
  }
 


//colision con las plataformas, sumamos height porque se comprueba la base de nuestro rectángulo
platforms.forEach(platform => {
  if(player.position.y + player.height+2 <= platform.position.y &&
     player.position.y + player.height+2+ player.velocity.y >=platform.position.y &&
      player.position.x + player.width/2 >= platform.position.x &&
      player.position.x + player.width/2.8 <= platform.position.x +platform.width
    ){
    //la segunda condicion hace que se toquen y que vuelva a caer si saltamos porque solo se aplica cuando estás cerquísima de la plataforma, con la anterior si estabas mas alto ya no caías nunca, la tercera hace que caigas si estas delante de la plataforma, la cuarta lo mismo pero por delante

    player.velocity.y =0;
    player.saltos=0;
    if(player.velocity.y == 0 && keys.right.pressed ==false && keys.left.pressed ==false ){
      player.currentSprite = player.sprites.stand.right;
    }else if(player.velocity.y == 0 && keys.right.pressed ==true && keys.left.pressed ==false){
      player.currentSprite = player.sprites.run.right;
    }else if(player.velocity.y == 0 && keys.right.pressed ==false && keys.left.pressed ==true){
      player.currentSprite = player.sprites.run.left;
    }
    
  }
})

//colision con murcielago
// console.log(player.position.y);
// console.log(murcielago.position.y)
if(player.position.x+player.width/2 >murcielago.position.x &&
player.position.x <murcielago.position.x &&
  (player.position.y > murcielago.position.y-10 &&
  player.position.y < murcielago.position.y+10)
  ){
  console.log("moriste");
  console.log(player.position.x);
  console.log(murcielago.position.x)
  player.vidas --;
  player.velocity.x -=200
}
//colision con las plataformas, sumamos height porque se comprueba la base de nuestro rectángulo
arrayCesped.forEach(platform => {
  if(player.position.y + player.height+2 <= platform.position.y &&
     player.position.y + player.height+2+ player.velocity.y >=platform.position.y &&
      player.position.x + player.width/2 >= platform.position.x &&
      player.position.x + player.width/2.8 <= platform.position.x +platform.width
    ){
    //la segunda condicion hace que se toquen y que vuelva a caer si saltamos porque solo se aplica cuando estás cerquísima de la plataforma, con la anterior si estabas mas alto ya no caías nunca, la tercera hace que caigas si estas delante de la plataforma, la cuarta lo mismo pero por delante

    player.velocity.y =0;
    player.saltos=0;
    if(player.velocity.y == 0 && keys.right.pressed ==false && keys.left.pressed ==false ){
      player.currentSprite = player.sprites.stand.right;
    }else if(player.velocity.y == 0 && keys.right.pressed ==true && keys.left.pressed ==false){
      player.currentSprite = player.sprites.run.right;
    }else if(player.velocity.y == 0 && keys.right.pressed ==false && keys.left.pressed ==true){
      player.currentSprite = player.sprites.run.left;
    }
    
  }
})


  //win condition
  if(scrollOffset >= 2000){
    console.log("ganaste")
  }

  //lose condition
  if(player.position.y > canvas.height|| player.vidas==0){

   init ()//función que reinicia el juego
  }
}//FIN DE ANIMATE

init()
animate();

//listener para las teclas y moverse, al usar {}en el argumento del evento podemos recuperar solo la propiedad del evento que nos interesa, es como decirle que pase event.keyCode

window.addEventListener('keydown', ({keyCode}) => {

  switch(keyCode){
    case 65 ://dos casos para que acepte asdw y flechas
      case 37: 
      console.log("left")
      keys.left.pressed = true;
      player.currentSprite = player.sprites.run.left;
      break;
    case 83:
      case 40:
      console.log("down")
      break;
    case 68:
      case 39:
     console.log("right")
     keys.right.pressed = true;
     player.currentSprite = player.sprites.run.right;

    
     break;
    case 87:
      case 38: 
     console.log("up")
     if(player.saltos<=1){//con esto evitariamos los doble saltos
   player.currentSprite = player.sprites.jump;
     player.velocity.y -= 25;
     player.saltos++
 
     }
     break;
  }

})

//event listener para cuando suelta la tecla deje de dar velocidad
window.addEventListener('keyup', ({keyCode}) => {

  switch(keyCode){
    case 65 ://dos casos para que acepte asdw y flechas
      case 37: 
      console.log("left")
      keys.left.pressed = false;
      player.currentSprite = player.sprites.stand.right;
      break;
    case 83:
      case 40:
      console.log("down")
      break;
    case 68:
      case 39:
     console.log("right")
      keys.right.pressed = false;
      player.currentSprite = player.sprites.stand.right;
     break;
    case 87:
      case 38: 
     console.log("up")
     player.currentSprite = player.sprites.fall;

     break;
  }

})