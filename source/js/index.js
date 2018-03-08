/* jshint esversion :6 */
/* global $ */

window.addEventListener('load',function(){
    "use strict";
    pageLoad();
});

function pageLoad(){
    
    getJsonPosts.then(function(post){
        for(let i = 0; i<post.length; i++){

            const section = document.getElementById('sezione');
            const article = document.createElement('article');
            const h2 = document.createElement('h2');
            const p = document.createElement('p');
            const h4 = document.createElement('h4');
            const content = post[i].body;
            const title = post[i].title;
            const userIdPost = post[i].userId;

            const name = document.createElement('p');

            h2.innerHTML = title;

            p.innerHTML = content; // body del post
            h4.innerHTML = title;
            getJsonUsers.then(function(user){
                const userInfo = user.find(user=> user.id === userIdPost);
                name.innerHTML = `Scritto da: ${userInfo.name}`;
             });

            const button = document.createElement('button');
            button.innerHTML = 'Visualizza';
            button.setAttribute('class','btn btn-success');
            button.setAttribute('data-toggle','modal');
            button.setAttribute('data-target','#modalContent');
            button.setAttribute('value', post[i].id);

            button.addEventListener('click', function(event){
                $('.modal-title').html(h4);
                $('.modal-body').html(p);
            });
            
            article.appendChild(h2);
            article.appendChild(name);

            article.appendChild(button);
            section.appendChild(article);
        }
    });
}
   
const getJsonPosts = fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(function(json){return json;
});

const getJsonUsers = fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(function(json){ return json;
});
