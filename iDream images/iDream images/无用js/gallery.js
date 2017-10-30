window.onload=function(){
	let box=document.getElementsByClassName('img1');
	let img=document.getElementsByTagName('img')
	let zhezhao=document.querySelectorAll('.zhezhao');
	let btn=document.getElementsByTagName('button');
	let a=document.querySelectorAll('btn>a')
	console.log(a)


for(let i=0;i<box.length;i++){
	box[i].onmouseover=function(){
		
       img[i].style.transform='scale(1.2, 1.2)'
     }

	box[i].onmouseout=function(){
		img[i].style.transform='scale(1, 1)';
	}
  }

  for(let j=0;j<btn.length;j++){
  	btn[j].onclick=function(){
  		btn[j].style.border='1px solid red';
  		a[j].style.color='red';
  	}

  }
}