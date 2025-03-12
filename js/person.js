
const url="https://dragonball-api.com/api/characters?page=1&limit=58";

fetch(url)
 .then(resultado => resultado.json())
 .then(response => {
    console.log(response)
     // Procesar los datos y agregarlos al elemento HTML
     const muñecos = response.items || [];

     muñecos.forEach(caracter => {
      
       const muñecosContainer = document.createElement('div');
       muñecosContainer.classList.add('caracter');
 
        
       const nameElement = document.createElement('h2');
       nameElement.textContent = caracter.name;
       muñecosContainer.appendChild(nameElement);
 
       
       const imageElement = document.createElement('img');
       imageElement.src = caracter.image;
       muñecosContainer.appendChild(imageElement);

       const ki = document.createElement('p');
       ki.textContent = caracter.ki
       muñecosContainer.appendChild(ki);
 
       
       muñecosContainer.addEventListener('click', () => {
        getCharacterTransformacion(caracter.id);
      });
      
       document.body.appendChild(muñecosContainer);
     });    
 })
 .catch(error => {
    console.log('Error:', error);
  });

 // Modal 
const modal = document.getElementById("miModal");
const transformacioncuadro = document.getElementById("transformacionContainer");

function getCharacterTransformacion(id) {
  const url = `https://dragonball-api.com/api/characters/${id}`; 
  fetch(url)
    .then(res => res.json())
    .then(response => {
      console.log(response)
      
      transformacioncuadro.innerHTML = "";

      // Verificar si el personaje tiene transformaciones
      if (response.transformations && response.transformations.length > 0) {
        response.transformations.forEach(transformation => {
         
          const transformaciondiv = document.createElement('div');
          transformaciondiv.classList.add('transformation');

          const transformacionnombre = document.createElement('h3');
          transformacionnombre.textContent = transformation.name;
          transformaciondiv.appendChild(transformacionnombre);

    
          const transformacionimagen = document.createElement('img');
          transformacionimagen.src = transformation.image;
          transformaciondiv.appendChild(transformacionimagen);

          // Agregar la transformación al contenedor principal
          transformacioncuadro.appendChild(transformaciondiv);
        });
      } else {
        // Si no tiene transformaciones, mostrar un mensaje
        transformacioncuadro.innerHTML = "Este personaje no tiene transformaciones disponibles.";
      }

      // Mostrar el modal
      modal.style.display = "block";
    })
    .catch(error => {
      console.log('Error al obtener las transformaciones:', error);
    });
}

// Función para cerrar el modal cuando el usuario hace clic en el botón de cerrar


// Función para cerrar el modal si el usuario hace clic fuera del contenido del modal
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = "none";  // Ocultar el modal si se hace clic fuera de él
  }
});
