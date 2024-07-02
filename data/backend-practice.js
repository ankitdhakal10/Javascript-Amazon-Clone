const xhr =  new XMLHttpRequest();

xhr.addEventListener('load', (event)=> {
  console.log(xhr.response);
})

xhr.open('GET', 'https://supersimplebackend.dev');
xhr.send();