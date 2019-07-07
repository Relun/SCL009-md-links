#!/usr/bin/env node

/*module.exports = () => {
  // ...
};*/

const mdLinks = require('./md-links');



if((process.argv[3]==="validate"));
mdLinks.mdLinks(process.argv[2],{validate:true})
.then((links) => {
  links=links.flat();
  links.forEach(function(link) {
     console.log(`${(link.file)} ${(link.href)} ${link.status} ${link.statusText} ${(link.text.substring(0,50))} `);
    
  });
})
.catch(console.error);
//let route = process.argv[2];
//flat crea un nuevo arreglo con los elementos concatenado
/*mdLinks.mdLinks(process.argv[2])
.then((links) => {
  links=links.flat();
  links.forEach(function(link) {
     console.log(`${(link.file)} ${(link.href)} ${(link.text.substring(0,50))} `);
    
  });
})
.catch(console.error);*/
