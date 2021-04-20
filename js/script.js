//fetch posts
fetch("./json/posts.json")
  .then(response => response.json())
  .then(json => {
	
  let current = 0;

	//create 10 first posts
	for(let i = 0; i < 10 && current < json.posts.length; i++)
	{
		createPost();
	}


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
  let lastPos = 0;
  
  let tags = '@aloisleclet #breakdance #dev #fullstack #digitalart #movement #animalmovement #opensource #digitalgarden '.split("").reverse().join("");
  let i = 0;
  
  let bannerStr = tags;

	window.addEventListener("scroll", function()
	{
	  const distance = window.scrollY;
<<<<<<< HEAD
	
    if (distance > lastPos && distance - lastPos > 14)//scroll down
    {
      bannerStr = tags[i] + document.querySelector('#tags_left').innerHTML.slice(0, -1);
     
      i = i == tags.length - 1 ? 0 : i + 1;
    }
    else if (distance < lastPos && lastPos - distance > 14)//scroll up
    {
      bannerStr = document.querySelector('#tags_left').innerHTML.slice(1, bannerStr.length) + tags[i];

      i = i == 0 ? tags.length - 1 : i - 1;
    }
    
    //update dom
    document.querySelector('#tags_left').innerHTML = bannerStr;
    document.querySelector('#tags_right').innerHTML = bannerStr;
	
    lastPos = distance;
>>>>>>> ff02fa55bd04f16462abf891814ef06bab00063a
	});
	
	//infinite scroll
	window.addEventListener('scroll', () => 
	{
	  const {scrollHeight, scrollTop, clientHeight} = document.documentElement;
	  
	  if (scrollTop + clientHeight > scrollHeight - 5)
	  {
		  for(let i = 0; i < 10 && current < json.posts.length; i++)
		  {
		  	createPost();
		  }

	  }
	
	});

	
	function createPost()
	{
		if (current < 0 || current >= json.posts.length)
			return ;	

	  let post = document.createElement('div');
	  post.className = json.posts[current].img == '' ? 'post text-only' : 'post';
	
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

    setTimeout(function() {
      post.classList.add('active');
    }, 1000);
	  current ++;
	};

});
