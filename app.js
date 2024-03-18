const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para servir archivos estáticos desde la carpeta 'assets'
app.use(express.static('assets'));

// Ruta raiz de la página
app.get('/', (req, res) => {
  res.send('Bienvenido a la página de inicio');
});

// Ruta para obtener información de usuarios en formato JSON
app.get('/abracadabra/usuarios', (req, res) => {
  res.json(usuarios);
});

// Arreglo de usuarios disponibles
const usuarios = ["Juan", "Jocelyn", "Astrid", "María", "Ignacia", "Javier", "Bryan"];

// Middleware para verificar si el usuario existe
app.use('/abracadabra/juego/:usuario', (req, res, next) => {
  const user = req.params.usuario;
  const isUser = usuarios.map((u) => u.toLowerCase()).includes(user.toLowerCase());
  isUser ? next(): res.sendFile(__dirname + '/assets/img/who.jpeg');
});

// Ruta para mostrar el juego a usuarios válidos
app.get('/abracadabra/juego/:usuario', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Ruta para mostrar imágenes aleatorias de conejo o voldemort según el número ingresado
app.get('/abracadabra/conejo/:n', (req, res) => {
  const n = parseInt(req.params.n);
  const numero = Math.floor(Math.random() * (5 - 1)) + 1;
  if (n === numero) {
    res.sendFile(__dirname + '/assets/img/conejito.jpg')
  } else {
    res.sendFile(__dirname + '/assets/img/voldemort.jpg')
  }
});

// Ruta para manejar cualquiero otra solicitud que no exista
app.get('*', (req, res) => {
  res.send("<center><h1>Esta página no existe</h1></center>");
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
