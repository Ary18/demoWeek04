/*global $ */
// jshint esversion:6
$('#Send').click(function(){
    'use strict';
    console.log('hai cliccato');
    var name = $('#exampleInputName').val();
    var email = $('#exampleInputEmail').val();
    var titolo = $('#exampleInputTitle').val();
    var textarea = $('#exampleInputText').val();

    var post = {
    "name" : name,
    "email": email,
    "titolo": titolo,
    "textarea": textarea,
    };

    // POST adds a random id to the object sent
fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      post: post,
      userId: 1
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json())
  .then(json => console.log(json));
  alert(`Grazie per aver inserito il tuo post! Riassunto: nome:${name},email:${email},titolo:${titolo},post:${textarea}`);
});
