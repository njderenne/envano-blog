
const getBlogPost = function() {
    const envanoApi = 'https://www.envano.com/wp-json/wp/v2/posts?_embed=true';
    fetch(envanoApi)
        .then(response => response.json())
        .then(data => {
            //this will need to change to be dynamic
            for (let i = 0; i<7;i++){
                let blogElement = document.getElementById(i);
                if(i===0) {
                    let title = document.createElement('h2');
                    let titleText = document.createTextNode(data[i].title.rendered);
                    title.appendChild(titleText);
                    blogElement.appendChild(title);

                    let postDate = document.createElement('h4');
                    let postDateText = document.createTextNode(data[i].date);
                    postDate.appendChild(postDateText);
                    blogElement.appendChild(postDate);

                    let excerpt = document.createElement("p");
                    let excerptText = document.createTextNode(data[i].excerpt.rendered);
                    excerpt.appendChild(excerptText);
                    blogElement.appendChild(excerpt);

                    let author = document.createElement("p");
                    let authorText = document.createTextNode(data[i]._embedded.author[0].name);
                    author.appendChild(authorText);
                    blogElement.appendChild(author);

                    let button = document.createElement('button');
                    let postLink = document.createElement("a");
                    postLink.href = data[0].link;
                    let postLinkText = document.createTextNode('READ MORE');
                    postLink.appendChild(postLinkText);
                    button.appendChild(postLinkText);
                    blogElement.appendChild(postLink);
                    blogElement.appendChild(button);

                    let authorImg = document.createElement("img");
                    authorImg.src = data[0]._embedded.author[0].mpp_avatar["48"];
                    blogElement.appendChild(authorImg);

                    let featuredImg = document.createElement('img');
                    featuredImg.src = data[0]._embedded['wp:featuredmedia']['0'].source_url;
                    blogElement.appendChild(featuredImg);
                } else {
                    let title = document.createElement('h3');
                    let titleText = document.createTextNode(data[i].title.rendered);
                    title.appendChild(titleText);
                    blogElement.appendChild(title);

                    let excerpt = document.createElement("p");
                    let excerptText = document.createTextNode(data[i].excerpt.rendered);
                    excerpt.appendChild(excerptText);
                    blogElement.appendChild(excerpt);

                    let button = document.createElement('button');
                    let buttonText = document.createTextNode('READ MORE');
                    button.appendChild(buttonText);
                    blogElement.appendChild(button);

                    let featuredImg = document.createElement('img');
                    featuredImg.src = data[i]._embedded['wp:featuredmedia']['0'].source_url;
                    blogElement.appendChild(featuredImg);
                }
            }
        })
        .catch(err => console.log(err));
};

document.querySelector('.test').addEventListener('click', getBlogPost);