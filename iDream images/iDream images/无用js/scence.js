window.onload=function(){
	ul=document.getElementsByTagName('ul')[1];
	ullist=document.getElementsByTagName('ul')[2];
	li=ul.getElementsByTagName('li');
	lilist=ullist.getElementsByTagName('li');
	img2=ul.getElementsByClassName('img2');
	img4=ullist.getElementsByClassName('img4');


	for(let i=0;i<li.length;i++){
		li[i].onmouseover=function(){
          img2[i].style.display='block'
		}
		li[i].onmouseout=function(){
          img2[i].style.display='none'
		}
		li[i].onclick=function(){
           window.location='detail.html'
		}
	}

	for(let i=0;i<lilist.length;i++){
		lilist[i].onmouseover=function(){
          img4[i].style.display='block'
		}
		lilist[i].onmouseout=function(){
          img4[i].style.display='none'
		}
		lilist[i].onclick=function(){
           window.location='detail.html'
		}
	}
}