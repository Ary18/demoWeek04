/*global $ */
// jshint esversion:6
$("#Send").click(function() {
  "use strict";

  console.log("hai cliccato");
  var name = $("#exampleInputName").val();
  var email = $("#exampleInputEmail").val();
  var titolo = $("#exampleInputTitle").val();
  var textarea = $("#exampleInputText").val();

  var post = {
    name: name,
    email: email,
    titolo: titolo,
    textarea: textarea
  };

  // POST adds a random id to the object sent
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      post: post,
      userId: 1
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  }).then(response => {
    console.log(response);
    // se response.status è 201 allora la risorsa è stata creata
    // sul server. Qui puoi riempire uno span e poi decidi cosa fare
    response.json();
    const risultato = response.status;
    if (risultato === 201) {
      const span = document.createElement("span");
      const esito = document.getElementById("esitoPost");
      span.innerHTML = "Post creato con successo";
      span.style = "background-color:green";
      esito.appendChild(span);
    } else {
      const esito = document.getElementById("esitoPost");
      const span = document.createElement("span");
      span.innerHTML = "Post non creato a causa di problemi di connessione";
      span.style = "background-color:red";
      esito.appendChild(span);
    }
  });
});
