//fetch posts


let {json, current} = fetch("./json/posts.json")
  .then(response => response.json())
  .then(json => {
    j.post.length;
    return {'json': j, 'length': j.length};
  });


//dark mode
let darkmode = false;

document.querySelector('.bubble.darkmode').onclick = function ()
{
  let body = document.querySelector('body');
  
  if (!darkmode)
    body.classList.add('darkmode');
  else
    body.classList.remove('darkmode');

  darkmode = !darkmode;  
  document.querySelector('.bubble .label').innerHTML = darkmode ? 'LIGHT' : 'DARK';


};

//scroll effect
window.addEventListener("scroll", function()
{
  const distance = window.scrollY;

  const height = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

  document.querySelector("#tags_left").style.left = -height + distance * 0.05+'px';
  document.querySelector("#tags_right").style.left = -height - distance * 0.05+'px';

});

//infinite scroll
window.addEventListener('scroll', () => 
{
  const {scrollHeight, scrollTop, clientHeight} = document.documentElement;
  
  if(scrollTop + clientHeight > scrollHeight - 5)
  {
  	setTimeout(getPost, 2000);
  }

});

function getPost()
{
  current -= 1;
  let post = document.createElement('div');
  post.className = 'post';

  let img = document.createElement('img');
  img.src = json.posts[current].img;

  let text = document.createElement('div');
  text.className = 'text';

  let p = document.createElement('p');
  p.innerHTML += json.posts[current].text;

  text.appendChild(p);

  post.appendChild(img);
  post.appendChild(text);

  document.querySelector('.wrap').appendChild(post);

};


