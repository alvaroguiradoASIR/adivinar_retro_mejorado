$(function () {
    
    
        // poner el select a la opción por defecto, en nuestro caso el value="1"
        
        $("#intentos").val('1');  

        // evento change para el select http://api.jquery.com/change/
    
        $("#intentos").change(muestra_lista);
    
        // Llamamos a la función comparar cuando se produce el evento click sobre el boton con id=boton
    
        $("#boton").click(comparar);
    
        // Escondemos el botón reset al cargar la página para sólo mostrarlo cuando sea necesario 
    
        $("#reset").hide();
        

        // Esta función llamará a la función elegir_dificultad() cada vez que el usuario cambie (change) la dificultad en la lista desplegable
    
        $('select').on('change', function() {
    
        var intentos_indice = $("#intentos option:selected").index();
        elegir_dificultad(intentos_indice);     
    
        });
    
    
        
    

      });


/****************************************************************************************************/


// Esta función muestra el número de intentos/dificultad que ha elegido el usuario

function muestra_lista(){
    
$("#resultado").html("Se ha seleccionado la dificultad " + $("#intentos option:selected").text());
     
}

/****************************************************************************************************/

// Función para generar un número aleatorio entre 1 y 100

function aleatorio(){

    
var aleatorio = Math.floor((Math.random() * 100) + 1);;   
    
        
return aleatorio;
    
}



// Es muy importante asignar el valor a la variable numero que contiene el numero aleatorio fuera de la función que compara los números pues si la introducimos al tomarla como variable local y no global generaría un número aleatorio distinto cada vez que llamamos a la función

var numero = aleatorio();

/****************************************************************************************************/


// Creamos una variable llamada contador que será comparada con el número de intentos, de modo que cuando el contador "alcance" al número de intentos elegido por el usuario no pueda seguir intentando adivinar el número 

var contador = 0;


/****************************************************************************************************/


// Función que esconde la lista desplegable para evitar que durante el número de intentos consecutivos el usuario tenga opción de arrepentirse o aprovechar esta ventaja para cambiar el número de intentos a su favor

function esconder_Select(){
    
    $('#intentos').hide();
}

/****************************************************************************************************/


// Función que esconde la entrada para elegir número y evitar que el usuario pueda seguir usándolo

function esconder_Input(){
    
    $('#numero').hide();
    
}


/****************************************************************************************************/


// Creamos una función que valida si la entrada es correcta, en caso de no serla se redirige al usuario a una página de error


function validar(entrada){
      
    
if(isNaN(entrada) || (entrada < 1 || entrada > 100)){
        
	window.open("gameover.html","_self");
        
    } else {
        
        // Si no se cumplen ninguno de los errores saltamos a un else sin código que indica que no haría nada (un else de continuidad)
    }    
     
}


/****************************************************************************************************/


// Se trata de una función que muestra una imagen en función de la dificultad elegida, para elegirla usamos el índice de cada option de nuestra lista desplegable

function elegir_dificultad(eleccion){
    
 //var eleccion = $("#intentos option:selected").index();
    
 if(eleccion == 0){
     
 $("#imagen").attr('src','gifs/poderoso.gif');   
     
 }else if(eleccion == 1){
     
 $("#imagen").attr('src','gifs/boss.gif'); 
     
 }else if(eleccion == 2){
     
 $("#imagen").attr('src','gifs/dificil.gif');     
     
 }else if(eleccion == 3){
     
 $("#imagen").attr('src','gifs/vikingo.gif');    
     
 }else if(eleccion == 4){
     
 $("#imagen").attr('src','gifs/gaviota.gif');      
     
 }  
       
    
}

/****************************************************************************************************/


// Creamos una función para recargar la página

function refrescar(){
   
// Creamos una función que recarga la página pero una vez hayan pasado 2 segundos (2000 milisegundos)
    
setTimeout(function() {
    
    window.open("index.html","_self");
    
  
  }, 2000);    
   
    
}

/****************************************************************************************************/

// Creamos el sonido powerup que activaremos cuando el usuario haga click en el botón reset

function powerup(){
    
      var embed = $('<embed id="powerup">');
      embed.attr('src','sonidos/powerup.mp3');
      embed.attr('autostart','true');
      embed.attr('width','0');    
      embed.attr('height','0');    
      embed.appendTo('#reset'); 
    
}



/****************************************************************************************************/

function comparar(){
    
      

var intentos = $("#intentos option:selected").val();
intentos = parseInt(intentos);


    
// Pasamos el filtro de la función validar a la entrada del usuario para comprobar que cumple los requisitos    
    
var entrada = $("#numero").val();
validar(entrada);
entrada = parseInt(entrada); 
    
// Dejamos unos console.log para comprobar el funcionamiento del programa, en la práctica esto no lo haríamos ya que el usuario simplemente pulsando f12 sabría de que número aleatorio se trata    
    
console.log("aleatorio: " + numero);
console.log("entrada: " + entrada);



console.log("");
console.log("");
console.log("");
    
 // En caso de que el contador haya "alcanzado" al número de intentos ejecutaremos una serie de pasos:
 //
 // 1.- Primero mostramos un mensaje indicando que se han agotado los intentos
 // 2.- Escondemos el input
 // 3.- Mostramos el botón reset escondido hasta el momento
 // 4.- Refrescamos la página cuando se clique en dicho botón

 if(contador == intentos){
 
 // Indicamos que el usuario ha agotado sus intentos y cuantos intentos ha realizado     
     
  $("#resultado").html("Agotaste el numero de intentos en " + (contador) + " intentos");
  
  // Llamamos a la función esconder_Input() para que el usuario no pueda introducir más números una vez hayan finalizado su número de intentos      
  esconder_Input();
     
  // Mostramos el botón reset que estaba escondido con la función contraria a hide() que es show()     
     
  $("#reset").show();
  $("#reset").click(powerup);
  $("#reset").click(refrescar);
     
 }else if(contador <= intentos){
     
      // Hacemos una llamada a la función esconder_Select() para que una vez entre a comparar se de por hecho que el usuario ya ha escogido el número de intentos y no pueda modificarlo sobre la marcha
     
      esconder_Select();

     
      // Bloque de comparaciones principal entre la entrada y el número generado aleatoriamente
      
      if(entrada < numero){
           
      $("#resultado").html("El número introducido es muy pequeño ");
      
          
      }else if(entrada > numero){
          
      $("#resultado").html("El número introducido es muy grande ");    
         
          
      }else if(numero == entrada){
          
      $("#resultado").html("¡HAS ACERTADO! en " + (contador + 1) + " intentos");
      
      // Cuando acierte el número "machacamos" el input para que quede más limpio      
          
      $("#entrada2").html(""); 
  
      // Llamamos a la función esconder_Input() para que el usuario no pueda introducir más números una vez hayan finalizado su número de intentos  
          
      esconder_Input();  
          
          
      // Mostramos un gif a partir de un elemento <img> creado desde el propio código y fijarlo junto a nuestro div "Final"    
         
      var img = $('<img id="imagen4">');
      img.attr('src', 'gifs/pizza.gif');
      img.appendTo('#Final');
       
      // Añadimos una etiqueta embed para que cuando acierte el usuario el número se cree de forma automática y se inicie      
          
      var embed = $('<embed id="clear">');
      embed.attr('src','sonidos/stageclear.mp3');
      embed.attr('autostart','true');
      embed.attr('width','0');    
      embed.attr('height','0');    
      embed.appendTo('#Final');        
      
      
      // Del mismo modo que antes, cuando finaliza el programa (O se acaban los intentos o se acierta el número), mostramos el botón para refrescar la página y damos la opción de poder refrescarla al clicar en ese botón 
          
      $("#reset").show();
      $("#reset").click(powerup);
      $("#reset").click(refrescar);      
            
      }  
    
      // console.log() orientativos
    
      contador++;
      console.log("Contador: " + contador);
      console.log("Intentos: " + intentos);
      console.log("");
      console.log("");   
        
    }
    
    
}