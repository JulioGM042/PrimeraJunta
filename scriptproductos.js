const formulario = document.getElementById('formulario');

formulario.addEventListener('submit', function(event) {
  event.preventDefault();

  const titulo = document.getElementById('titulo').value;
  const varietal = document.getElementById('varietal').value;
  const bodega = document.getElementById('bodega').value;
  const precio = document.getElementById('precio').value;
  const imagen = document.getElementById('imagen').value;

  const producto = {
    titulo: titulo,
    varietal: varietal,
    bodega: bodega,
    precio: precio,
    imagen: imagen
  };

  fetch('http://localhost:3001/guardar-producto', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(producto)
  })
  .then(response => {
    if (response.ok) {
      console.log('Producto guardado exitosamente!');
      formulario.reset(); // resetear el formulario
    } else {
      console.error('Error al guardar el producto.');
    }
  })
  .catch(error => {
    console.error('Error al guardar el producto:', error);
  });
});
