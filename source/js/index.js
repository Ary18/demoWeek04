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
    response.json();
    const risultato = response.status;
    if (risultato === 201) {
      const span = document.createElement("span");
      const esito = document.getElementById("esitoPost");
      span.innerHTML = "Post creato con successo";
      span.style = "background-color:green";
      $(esito).html(span);
    } else {
      const esito = document.getElementById("esitoPost");
      const span = document.createElement("span");
      span.innerHTML = "Post non creato a causa di problemi di connessione";
      span.style = "background-color:red";
      $(esito).html(span);
    }
  });
});

window.addEventListener('load',function(){
    "use strict";
    pageLoad();
});

function pageLoad(){
    "use strict";
    getJsonPosts.then(function(post){
        for(let i = 0; i<post.length; i++){

            const section = document.getElementById('sezione');
            const article = document.createElement('article');

            const p = document.createElement('p'); // title
            const h4 = document.createElement('h4'); // postBody

            const content = post[i].body;
            const title = post[i].title;
            const userIdPost = post[i].userId;
            const idPost = post[i].id;

            const name = document.createElement('p'); // author
            const p1 = document.createElement('p');

            p.innerHTML = content; // body del post
            h4.innerHTML = title;
            
            addTitle(title,article);
            addAuthor(name,userIdPost);
            addPostNumber(idPost,article);
            
            article.appendChild(name);

            addButton(h4,p,article);
            section.appendChild(article);
        }
    });
}

function addTitle(title,divArticle){
    "use strict";
    const h2 = document.createElement('h2');
    h2.innerHTML = title;
    divArticle.appendChild(h2);
}
function addAuthor(p,userIdPost){
    "use strict";
    getJsonUsers.then(function(user){
        const userInfo = user.find(user=> user.id === userIdPost);
        p.innerHTML = `Scritto da: ${userInfo.name}`;
     });
}

function addPostNumber(idPost,divArticle){
    "use strict";
    const p = document.createElement('p');
    p.innerHTML = `Post numero: ${idPost}`;
    divArticle.appendChild(p);
}
function addButton(title,body,article){
    "use strict";
    const button = document.createElement('button');
    button.innerHTML = 'Visualizza';
    button.setAttribute('class','btn btn-success');
    button.setAttribute('data-toggle','modal');
    button.setAttribute('data-target','#modalContent');

    article.appendChild(button);

    button.addEventListener('click', function(event){
        body.style.display = 'block';
        $('.modal-title').html(title);
        $('.modal-body').html(body);
        addButtonElimina(article);
        addButtonModifica(body,$('.modal-body'));
    });
}

function addButtonElimina(article){
    "use strict";
    const eliminaBtn = document.createElement('button');
    eliminaBtn.innerHTML = 'Elimina';
    eliminaBtn.setAttribute('class','btn btn-danger');
    $('.modal-footer').html(eliminaBtn);
    eliminaBtn.addEventListener('click',function(){
        article.style.display ='none';
        $('#modalContent').modal('hide');
        
    });   
}

function addButtonModifica(content,modalBody){
    "use strict";
    const modificaBtn = document.createElement('button');
    modificaBtn.innerHTML = 'Modifica';
    modificaBtn.setAttribute('class', 'btn btn-primary');
    $('.modal-footer').prepend(modificaBtn);
    modificaBtn.addEventListener('click',function(){
        content.style.display = 'none';
        modificaBtn.style.display = 'none';

        const label = document.createElement('p');
        label.innerHTML = 'Modifica il post:';

        const textarea = document.createElement('textarea');
        textarea.setAttribute('id','text');
        const textContent = $('#text').val();
        addBtnSave(modalBody,textContent);

        modalBody.html(label);
        modalBody.append(textarea);
    });
}

function addBtnSave(modalBody,textContent){
    "use strict";
    const btnSave = document.createElement('button');
        btnSave.setAttribute('class','btn btn-success');
        btnSave.innerHTML = 'Salva';

        btnSave.addEventListener('click',function(){
            btnSave.disabled = true;
            const notif = document.createElement('h6');
                fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify({
                    body: textContent,
                    userId: 1
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(response => {
                console.log(response);
                response.json();
                if(response.status === 201){
                    notif.innerHTML = 'Post modificato con successo'
                } else {
                    notif.innerHTML = 'Impossibile modificare';
                }
                modalBody.append(notif);
            });
            });
    $('.modal-footer').prepend(btnSave);
}

const getJsonPosts = fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response =>response.json())
    .then(function(json){ return json;
});

const getJsonUsers = fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(function(json){ return json;
});