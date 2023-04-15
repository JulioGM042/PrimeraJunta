const contenedorHTML = document.querySelector('.Contenedor-tarjetas')
  fetch("./db/database.json")
    .then(response => response.json())
    .then(data => {
        for(product of data){
            contenedorHTML.innerHTML += `
            <div class="cardbody">
              <h4>${product.titulo}</h4>
              <img src="${product.imagen}"/>
              <p>${product.descripcion}</p>
              <p>Ubicacion: <strong>${product.ubicación}</strong></p>
            `
        }
    })
    .catch(error => console.log(error))