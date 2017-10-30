window.onload=function(){
	let ul1=document.getElementsByTagName('ul')[1];
	let li1=ul1.getElementsByTagName('li');

	for(let i=0;i<li1.length;i++){
		li1[i].onclick=function(){
           window.location='detail.html'
		}
	}
}