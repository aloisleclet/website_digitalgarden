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
	window.addEventListener("scroll", function()
	{
	  const distance = window.scrollY;
	
	  const height = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
//here	
	  document.querySelector("#tags_left").style.left = -height + distance * 0.05+'px';
	  document.querySelector("#tags_right").style.left = -height - distance * 0.05+'px';
	
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
    }, 600);
	  current ++;
	};

});
