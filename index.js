// import platform from './images/platform.png'
const canvas = document.querySelector('canvas');

const c = canvas.getContext("2d");
//getcontext da un objeto que permite manipular el canvas usando metodos como draw para dibujar en él

//para que el canvas ocupe la ventana entera
canvas.width= 1024;
canvas.height = 576;

console.log(c);

const gravity = 1.5;
//el jugador es una clase, el constructor da las variables iniciales, la posicion es un objeto con dos claves, la x y la y
class Player {
  constructor(){

    this.position = {
      x: 100,
      y: 100
    }
    this.velocity = {
      x:0,
      y:1
    }
    this.width = 30;
    this.height = 30;
  }

//el metodo de clase draw dibuja al personaje, llama al canvas y usa fill rect pasandole las propiedades del objeto para dibujarlo en él

  draw(){
    c.fillStyle="red"
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  //el metodo update va  aplicando la gravedad al personaje
  update(){
    
    this.draw()//al llamar a draw redibujamos el personaje con las nuevas posiciones
    this.position.y += this.velocity.y; //esto hará caer al Pj
    this.position.x += this.velocity.x; //esto va sumando a la posición x, al pulsar la tecla damos valor a velocity y eso luego se suma aquí

    if(this.position.y+this.height+this.velocity.y <= canvas.height){
      //el if aumenta la velocidad siempre que la posición (que empieza en lo alto del personaje)más la altura más la altura no estén por debajo del lienzo. El sumar velocidad impide que de una vuelta de más y quede solapado

    this.velocity.y += gravity; //al aumentar cada vuelta la gravedad creamos aceleración haciendo que cada vez caiga más rápido
    }else{
     
      this.velocity.y = 0;
    }

  }
}//FIN DE CLASE PLAYER

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
    // c.fillStyle = "blue";
    // c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

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
    // c.fillStyle = "blue";
    // c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

//la imagen que usan las plataformas, usa una función para con los argumentos crear distintas imagenes

function createImage(imageSrc){
const image = new Image();
image.src = imageSrc;
return image
}
const platform = './images/platform.png'

const platformImage =createImage(platform)

//instanciamos al jugador, llamamos al metodo draw para pintarlo en el canvas
const player = new Player();

const platforms =[
  new Platform({
    x:-2,
    y:475,
    image: platformImage
  }),
   new Platform({
    x:platformImage.width-3,// para que esté detrás de la otra
    y:475,
    image: platformImage
  })
]
const background = './images/background.png';
const hills = './images/hills.png'
const genericObjects = [
  new GenericObject({
    x:0,
    y:0,
    image: createImage(background)
  }),
  new GenericObject({
    x:0,
    y:0,
    image: createImage(hills)
  })
]

const keys = {
  right:{
    pressed: false
  },
  left:{
    pressed: false//en el event listener cambiamos esta propiedad y usamos esta propiedad para moverlo
  },
}
player.update();

let scrollOffset=0; //chequeamos la posición del jugador, cuando llegue a x punto decimos que ha ganado


//FUNCION ANIMATE------------------------------------------
function animate (){
  //esto crea una animación repintando el canvas usando la función que le pasar por parametro, le pasamos la propia función animar creando un bucle infinito 
  requestAnimationFrame(animate)
  c.fillStyle = 'white'
  c.fillRect(0,0,canvas.width, canvas.height);

  genericObjects.forEach(genericObject => {
    genericObject.draw();
  })
  
  platforms.forEach(platform => {
    platform.draw();
  })

  player.update()//al llamarlo dentro del bucle lo estamos repintando continuamente, tenemos que llamar a clearRect para que borre el cuadrado anterior y pinte el nuevo


  if(keys.right.pressed==true && player.position.x <400){
    player.velocity.x =5;
  }else if(keys.left.pressed==true && player.position.x > 100){
    player.velocity.x= -5;
  }else{//mover y parar
    player.velocity.x=0;
    if(keys.right.pressed){
      platforms.forEach(platform => {
        scrollOffset +=5;
        platform.draw();
        platform.position.x -= 5;
        
      })
    
      
    }else if(keys.left.pressed){
      scrollOffset -=5;
      platforms.forEach(platform => {
        platform.draw();
        platform.position.x += 5;
       
      })
   
    }
    
  }
 


//colision con las plataformas, sumamos height porque se comprueba la base de nuestro rectángulo
platforms.forEach(platform => {
  if(player.position.y + player.height <= platform.position.y &&
     player.position.y + player.height+ player.velocity.y >=platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x + player.width <= platform.position.x +platform.width+20
    ){
    //la segunda condicion hace que se toquen y que vuelva a caer si saltamos porque solo se aplica cuando estás cerquísima de la plataforma, con la anterior si estabas mas alto ya no caías nunca, la tercera hace que caigas si estas delante de la plataforma, la cuarta lo mismo pero por delante

    player.velocity.y =0;
  }
})
  if(scrollOffset >= 2000){
    console.log("ganaste")
  }
}//FIN DE ANIMATE

animate();

//listener para las teclas y moverse, al usar {}en el argumento del evento podemos recuperar solo la propiedad del evento que nos interesa, es como decirle que pase event.keyCode
window.addEventListener('keydown', ({keyCode}) => {

  switch(keyCode){
    case 65 ://dos casos para que acepte asdw y flechas
      case 37: 
      console.log("left")
      keys.left.pressed = true;
      break;
    case 83:
      case 40:
      console.log("down")
      break;
    case 68:
      case 39:
     console.log("right")
     keys.right.pressed = true;

    
     break;
    case 87:
      case 38: 
     console.log("up")
     player.velocity.y -= 20;
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
      break;
    case 83:
      case 40:
      console.log("down")
      break;
    case 68:
      case 39:
     console.log("right")
      keys.right.pressed = false;
     break;
    case 87:
      case 38: 
     console.log("up")
    //  player.velocity.y -= 20;
     break;
  }

})