const fs = require('fs'); //llama a node.js
const marked = require('marked'); //llama a libreia marked instalada, crea nuevas instancias (links)
const FileHound = require('filehound');
const nodepath = require('path');
const fetch = require('node-fetch');// libreria filehound recorre y lee directorios
//de node, lee los archivos, pasa una ruta y un callback(error y data)
//conesto estamos leyendo una ruta aca es la prueba.md



//console.log(process.argv[2],process.argv[3]);
//route2 = path.resolve(route);
//filehound encuentra archivo md de un directorio

//para llamar a la funcion archivo o directorio
const mdLinks = (path,options) => {
if(options && options.validate){
  return new Promise ((resolve, reject) => {

    seeDirectories(path)

    .then((path2)=> {
      Promise.all(path2.map((entrydirectory)=>{
        return readlinks(entrydirectory);

      })).then((linkInsideDirectory)=>{
        Promise.all(linkInsideDirectory.map((linkInsideDirectory) =>{
          return validation(linkInsideDirectory);

        })).then((validation)=>{
          resolve(validation);
        
        
      })
    });
  }).catch(()=>{
    readlinks(path)
    .then((links)=>{
      resolve(validation(links));
    })
  })
})
}
  else{

    return new Promise ((resolve, reject) => {
      try{
        seeDirectories(path)
        .then(res => {
          resolve(Promise.all(res.map(file=>{
            return readlinks(file);
          })))
        })

        .catch(()=>{
          resolve(readlinks(path));
        })

      }catch(err){
          reject(err);
        }
      })
  }

}
 


//validación

const validation = (links) =>{

  return Promise.all(links.map(validationLinks =>{
    return new Promise((resolve) =>{
      fetch(validationLinks.href)

      .then(res=>{
        validationLinks.status = res.status;
        validationLinks.statusText = res.statusText;
        resolve(validationLinks);
      })

      .catch((err)=>{
        validationLinks.status = 0;
        validationLinks.statusText = err.code;
        resolve(validationLinks);
      })
    })
  }))
}
//AQUI LEE LOS ARCHIVOS Y CREA EL ARRAY

//let path = './prueba.md'
const readlinks = (path) => {
  //extnameobtiene la extension de una ruta del archivo
  //tryseñala bloque de instrucciones a intentar, si no es try, es catch
  return new Promise((resolve, reject) => {
    try{
    if(nodepath.extname(path)!=".md"){
      throw(new Error("Extensión incorrecta"));
    }

  fs.readFile(path,'utf8', (err, content) => {
    //err ? reject(err) : resolve(content); 

    if(err) {
      reject(err)
    }

    else{

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
//console.log(links)
resolve(links);
  }
})
}

catch(error){
  reject(error);
}
  })
}
//readlinks('./prueba.md');


const seeDirectories = (path) => {
  return FileHound.create()
   .paths(path)
   .ext('md')
   .find();
   
 }
module.exports= {mdLinks,validation}
