const fs = require('fs'); //llama a node.js
const marked = require('marked'); //llama a libreia marked instalada, crea nuevas instancias (links)
const FileHound = require('filehound'); // libreria filehound recorre y lee directorios
//de node, lee los archivos, pasa una ruta y un callback(error y data)
//conesto estamos leyendo una ruta aca es la prueba.md

let dir = process.argv[2];
console.log(process.argv[2],process.argv[3]);

//filehound encuentra archivo md de un directorio

const seeDirectories = (path) => {
 return new Promise((resolve, reject)=> {
  FileHound.create()
  .paths(path)
  .ext('md')
  .find()
  .then(res=>{
    res.forEach(file => {
      readlinks(file)
      .then(res=>{
        resolve(res)
      })
      .catch(err=>{
        reject(err)
      })
    })
})
 })
};

//AQUI LEE LOS ARCHIVOS Y CREA EL ARRAY

//let path = './prueba.md'
const readlinks = (path) => {
  
  return new Promise((resolve, reject) => {

  fs.readFile(path,'utf8', (err, content) => {
    err ? reject(err) : resolve(content); 

    //if(err) {
      //reject(err)
    //}
   /* if (err) {//si error es true, lanza error(throw) utf8 es para el lenguaje humano
      throw err; 
    }*/
//Renderer = metodo crea otro arreglo y lo pusheamos abajo
//new = crea una nueva instancia
let links =[];
const renderer = new marked.Renderer();
renderer.link = function (href,title,text){
  links.push({
    href:href,
    text:text,
    file:path
  })
}
marked(content,{renderer:renderer});
console.log(links)
//resolve(links);
  })
})
}

seeDirectories(dir)
.then(res=>{
  console.log(res);
})
.catch(err=>{
  console.log(err);
})
//readlinks('./prueba.md');

module.exports.readlinks = readlinks;
module.exports.seeDirectories = seeDirectories;