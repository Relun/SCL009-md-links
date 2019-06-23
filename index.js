/*module.exports = () => {
  // ...
};*/
const fs = require('fs'); //llama a node
const marked = require('marked'); //llamamos a la libreia marked que instalamos
//const FileHound = require('filehound');
//de node, lee los archivos, pasa una ruta y un callback(error y data)
//conesto estamos leyendo una ruta aca es la prueba.md
/*
fs.readFile('./prueba.md','utf8', (err, data) => {
  if (err) {//si error es true, lanza error(throw) utf8 es para el lenguaje humano
  throw err;
}
//sino hay error manda console
  console.log(data);
});*/

//const directories = (paths) =>{
/* FileHound.create()
  .paths('/SCL009-md-links')
  .ext('md')
  .find()
  .then(files => {
  files.forEach(file => console.log('Found file', file));

});*/



//esta const no deberia estar en index si en md-links

const links = (path) => {
  fs.readFile(path,'utf8', (err, data) => {
    if (err) {//si error es true, lanza error(throw) utf8 es para el lenguaje humano
      throw err; 
    }
let links =[];
//esto crea otro arreglo y lo pusheamos abajo
const renderer = new marked.Renderer();
renderer.link = function (href,title,text){
  links.push({
    href:href,
    text:text,
    file:path
  })
}

marked(data,{renderer:renderer});
console.log(links)


  })
}
console.log(links('./prueba.md'))
