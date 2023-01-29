//fetch posts
fetch("./json/posts.json")
  .then(response => response.json())
  .then(json => {

  let posts = json.posts.reverse();

  let current = 0;

	//create 10 first posts
	for(let i = 0; i < 10 && current < posts.length; i++)
	{
		createPost();
	}

	//scroll effect
  let lastPos = 0;
  
  let tags = '@aloisleclet #breakdance #dev #fullstack #digitalart #movement #animalmovement #opensource #digitalgarden ';
  tags += tags;
  tags += tags;
  tags = tags.split("").reverse().join("");
  let i = 0;
  
  let bannerStr = tags;

	window.addEventListener("scroll", function()
	{
	  const distance = window.scrollY;
	
    if (distance > lastPos && distance - lastPos > 14)//scroll down
    {
      bannerStr = tags[i] + document.querySelector('#tags').innerHTML.slice(0, -1);
     
      i = i == tags.length - 1 ? 0 : i + 1;
    }
    else if (distance < lastPos && lastPos - distance > 14)//scroll up
    {
      bannerStr = document.querySelector('#tags').innerHTML.slice(1, bannerStr.length) + tags[i];

      i = i == 0 ? tags.length - 1 : i - 1;
    }
    
    //update dom
    document.querySelector('#tags').innerHTML = bannerStr;
	
    lastPos = distance;
	});
	
	//infinite scroll
	window.addEventListener('scroll', () => 
	{
	  const {scrollHeight, scrollTop, clientHeight} = document.documentElement;
	  
	  if (scrollTop + clientHeight > scrollHeight - 5)
	  {
		  for(let i = 0; i < 10 && current < posts.length; i++)
		  {
		  	createPost();
		  }

	  }
	
	});


  function urlToLink(text)
  {
    // Put the URL to variable $1 after visiting the URL
    let Rexp = /((https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g;
    // Replace the RegExp content by HTML element
    return text.replace(Rexp, "<a href='$1' target='_blank' referrer='noreferrer'>$1</a>");
  }

	function createPost()
	{
		if (current < 0 || current >= posts.length)
			return ;	

	  let post = document.createElement('div');
	  post.className = posts[current].img == '' ? 'post text-only' : 'post';
    post.id = posts.length - current;

    if (posts[current].img != "")
    {
	    let img = document.createElement('img');
	    img.src = posts[current].img;
	  
      post.appendChild(img);
    }
	
    if (posts[current].text != "")
    {
	    let text = document.createElement('div');
	    text.className = 'text';
	  

      content = posts[current].text;
      content = urlToLink(content)

	    let p = document.createElement('p');
	    p.innerHTML += content;

	    text.appendChild(p);
      post.appendChild(text);
    }
	
	  document.querySelector('.wrap').appendChild(post);

    setTimeout(function () {
      post.classList.add('active');
    }, 800);
	  current ++;
	};

});
