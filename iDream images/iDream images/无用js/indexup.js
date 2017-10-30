window.onload=function(){
	let uls=document.getElementsByClassName('fuwu')[0];
	let lis=uls.getElementsByTagName('li');
	let up=document.getElementsByClassName('up')[0];
	 console.log(up)

	   //服务项目点击
	for(let i=0;i<lis.length;i++){
		lis[i].onclick=function(){
           window.location='gallery.html';
		}
	}

   //向上返回
	window.onscroll=function(){
	  let scrollTop=document.body.scrollTop;
		if(scrollTop>700){
			up.style.display='block';		
	  }
	else{
		up.style.display='none';
	}
    up.onclick=function(){
       	animate(document.body,{scrollTop:0})
       } 
	}

}