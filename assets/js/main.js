const previousPageElement = document.getElementById("previous-page");
const nextPageElement = document.getElementById("next-page");

let currentPage = 1;

const readableDate = function(createdAtVal) {
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    firstFormat = new Date(createdAtVal).toLocaleString().split(",")[0];
    return months[(firstFormat.split("/")[0]-1)] + " " + firstFormat.split("/")[1] + ", " + firstFormat.split("/")[2]
};

const getBlogPost = function() {
    const envanoApi = 'https://www.envano.com/wp-json/wp/v2/posts?_embed=true';
    fetch(envanoApi)
        .then(response => response.json())
        .then(data => {
            //this will need to change to be dynamic
            let blogLength = data.length;
            let lastPage = Math.ceil(blogLength/7);
            let pageLimit = 7;
            
            if(currentPage===1) {
                previousPageElement.classList.add("hidden");
            }
            if(currentPage>1){
                previousPageElement.classList.remove("hidden");
            }
            if(currentPage===lastPage){
                nextPageElement.classList.add("hidden");
            }
            if(currentPage<lastPage){
                nextPageElement.classList.remove("hidden");
            }
            if(currentPage<=lastPage && currentPage>=1){

                for (let i = (currentPage-1)*pageLimit; i<pageLimit*(currentPage);i++){
                    let blogElement = document.getElementById(i-(7*(currentPage-1)));

                    if(blogLength-(pageLimit*(currentPage-1))<pageLimit){
                        if(blogLength<=i){
                            return;
                        }
                    }

                    if(i%7===0) {
                        let title = document.createElement('h2');
                        let titleText = document.createTextNode(data[i].title.rendered);
                        title.appendChild(titleText);
                        blogElement.appendChild(title);
    
                        let postDate = document.createElement('h4');
                        let postDateText = document.createTextNode(readableDate(data[i].date));
                        postDate.appendChild(postDateText);
                        blogElement.appendChild(postDate);

                        let excerpt = document.createElement("p");
                        excerpt.innerHTML = (data[i].excerpt.rendered);
                        blogElement.appendChild(excerpt);
    
                        let author = document.createElement("h5");
                        let authorText = document.createTextNode(data[i]._embedded.author[0].name);
                        author.appendChild(authorText);
                        blogElement.appendChild(author);
    
                        let button = document.createElement('button');
                        let postLink = document.createElement("a");
                        postLink.href = data[0].link;
                        let postLinkText = document.createTextNode('READ MORE');
                        button.appendChild(postLinkText);
                        postLink.appendChild(button);
                        blogElement.appendChild(postLink);
    
                        let authorImg = document.createElement("img");
                        authorImg.classList.add("author-img");
                        authorImg.src = data[i]._embedded.author[0].mpp_avatar["48"];
                        blogElement.appendChild(authorImg);
    
                        let featuredImg = document.createElement('img');
                        featuredImg.classList.add("featured-img")
                        featuredImg.src = data[i]._embedded['wp:featuredmedia']['0'].source_url;
                        blogElement.appendChild(featuredImg);
                    } else {
                        let title = document.createElement('h3');
                        let titleText = document.createTextNode(data[i].title.rendered);
                        title.appendChild(titleText);
                        blogElement.appendChild(title);
    
                        let excerpt = document.createElement("p");
                        excerpt.innerHTML = (data[i].excerpt.rendered);
                        blogElement.appendChild(excerpt);

                        let button = document.createElement('button');
                        let postLink = document.createElement("a");
                        postLink.href = data[i].link;
                        let postLinkText = document.createTextNode('READ MORE');
                        button.appendChild(postLinkText);
                        postLink.appendChild(button);
                        blogElement.appendChild(postLink);
    
                        let featuredImg = document.createElement('img');
                        featuredImg.src = data[i]._embedded['wp:featuredmedia']['0'].source_url;
                        blogElement.appendChild(featuredImg);
                    }
                }

            } else {
                console.log('There are no more pages to this blog!');
            }
        })
        .catch(err => console.log(err));
};

const nextPage = function(){
    currentPage+=1
    for(i=0;i<7;i++){
        document.getElementById(i).innerHTML = "";
    }
    getBlogPost();
};

const previousPage = function(){
    currentPage-=1
    for(i=0;i<7;i++){
        document.getElementById(i).innerHTML = "";
    }
    getBlogPost();
};

getBlogPost();

nextPageElement.addEventListener("click", nextPage);
previousPageElement.addEventListener("click", previousPage);
