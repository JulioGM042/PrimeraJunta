const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/guardar-producto') {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
    });
    req.on('end', () => {
      try {
        const producto = JSON.parse(data);
        guardarProducto(producto, () => {
          res.statusCode = 201;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ mensaje: 'Producto guardado exitosamente.' }));
        });
      } catch (error) {
        console.error(error);
        res.statusCode = 400;
        res.end('Error al guardar el producto.');
      }
    });
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Página no encontrada.');
  }
});

function guardarProducto(producto, callback) {
  fs.readFile('./db/databasepj.json', 'utf8', (err, data) => {
    if (err) throw err;

    const productos = JSON.parse(data);

    productos.push(producto);

    fs.writeFile('./db/databasepj.json', JSON.stringify(productos), callback);
  });
}

server.listen(3001, () => {
  console.log('Servidor escuchando en el puerto 3001.');
});
