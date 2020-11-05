
const apiKey = "KMaWB006ywFHGWQNh1WYxwL4YqSx0bse8YhmgX6cPOU"
const count = 5;
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
const imageContainer = document.getElementById("image-container")
const loader = document.getElementById('loader')
let photos = []
let totalImg =0
let readtoLoad=false;
let imageLoad = 0

const setAtt=(ele, attribute)=>{
    for(let key in attribute){
        ele.setAttribute(key, attribute[key])
    }
}

function imageLoaded(){
    imageLoad++
    if(imageLoad === totalImg){
        readtoLoad = true
        loader.hidden = true;
    } 
}

const showImage =() =>{
    totalImg= photos.length
    imageLoad=0;
    photos.forEach(photo=>{
        const itemContainer = document.createElement('div')
        itemContainer.classList.add('container')
        const heart = document.createElement('span')
        heart.classList.add('heart')
        heart.textContent= `Likes: ${photo.likes}`
        const item = document.createElement('a')
      
setAtt(item, {
    href:photo.links.html,
    target:"__blank"
})
const img = document.createElement('img');
        setAtt(img,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description
        })
        img.addEventListener('load',imageLoaded)
        item.appendChild(img)
        itemContainer.appendChild(heart)
        itemContainer.appendChild(item)
        imageContainer.appendChild(itemContainer)
    })
}

async function getImage(){
    try{
   const response = await fetch(apiUrl);
    photos= await response.json()
    console.warn(photos)
   showImage()
    }catch(err){
        console.error(err)
    }
}

window.addEventListener('scroll',()=>{
    if(window.scrollY+window.innerHeight>= document.body.offsetHeight-800 && readtoLoad){
        getImage()
        readtoLoad = false
    }
})

getImage()

