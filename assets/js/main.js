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
            //runs a check to verify the data returned has data to display
            if(data.length===0 ||data===undefined) {
                let blogElement = document.getElementById("0");
                let errorText = document.createTextNode("There are no blog posts at this time! Please check back later.");
                blogElement.appendChild(errorText);
            }

            let blogLength = data.length;
            let lastPage = Math.ceil(blogLength/7);
            let pageLimit = 7;
            //hides or shows next/prev button based on current page
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
                //loops through the data to fill the page with posts based on current page
                for (let i = (currentPage-1)*pageLimit; i<pageLimit*(currentPage);i++){
                    let blogElement = document.getElementById(i-(7*(currentPage-1)));
                    //stops the loop if there are no more posts to display
                    if(blogLength-(pageLimit*(currentPage-1))<pageLimit){
                        if(blogLength<=i){
                            return;
                        }
                    }
                    //runs for the first element to be displayed on the page
                    if(i%7===0) {
                        //creates and fills title element
                        let title = document.createElement('h2');
                        let titleText = document.createTextNode(data[i].title.rendered);
                        title.appendChild(titleText);
                        blogElement.appendChild(title);
    
                        //creates and fills date element
                        let postDate = document.createElement('h4');
                        let postDateText = document.createTextNode(readableDate(data[i].date));
                        postDate.appendChild(postDateText);
                        blogElement.appendChild(postDate);

                        //creates and fills post excerpt element
                        let excerpt = document.createElement("p");
                        excerpt.innerHTML = (data[i].excerpt.rendered);
                        blogElement.appendChild(excerpt);
    
                        //creates and fills author element
                        let author = document.createElement("h5");
                        let authorText = document.createTextNode(data[i]._embedded.author[0].name);
                        author.appendChild(authorText);
                        blogElement.appendChild(author);
    
                        //creates and fills button element for link
                        let button = document.createElement('button');
                        let postLink = document.createElement("a");
                        postLink.href = data[0].link;
                        let postLinkText = document.createTextNode('READ MORE');
                        button.appendChild(postLinkText);
                        postLink.appendChild(button);
                        blogElement.appendChild(postLink);
    
                        //creates and fills author img element
                        let authorImg = document.createElement("img");
                        authorImg.classList.add("author-img");
                        authorImg.src = data[i]._embedded.author[0].mpp_avatar["48"];
                        blogElement.appendChild(authorImg);
    
                        //creates and fills featured img element
                        let featuredImg = document.createElement('img');
                        featuredImg.classList.add("featured-img")
                        featuredImg.src = data[i]._embedded['wp:featuredmedia']['0'].source_url;
                        blogElement.appendChild(featuredImg);
                    }
                    //runs for the last 6 posts to load onto the page 
                    else {
                        //creates and fills title element
                        let title = document.createElement('h3');
                        let titleText = document.createTextNode(data[i].title.rendered);
                        title.appendChild(titleText);
                        title.classList.add('title')
                        blogElement.appendChild(title);
    
                        //creates and fills post excerpt element
                        let excerpt = document.createElement("p");
                        excerpt.innerHTML = (data[i].excerpt.rendered);
                        excerpt.classList.add('excerpt');
                        blogElement.appendChild(excerpt);

                        //creates and fills button element for link
                        let button = document.createElement('button');
                        let postLink = document.createElement("a");
                        postLink.href = data[i].link;
                        let postLinkText = document.createTextNode('READ MORE');
                        button.appendChild(postLinkText);
                        postLink.appendChild(button);
                        postLink.classList.add('post-link');
                        blogElement.appendChild(postLink);
    
                        //creates and fills featured img element
                        let featuredImg = document.createElement('img');
                        featuredImg.src = data[i]._embedded['wp:featuredmedia']['0'].source_url;
                        featuredImg.classList.add('sub-img');
                        blogElement.appendChild(featuredImg);
                    }
                }

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
