window.onload=function(){
	let ul=document.getElementsByTagName('ul')[0];
	let li=ul.getElementsByTagName('li');
	let a=ul.getElementsByTagName('a');
	console.log(a)

	for(let i=0;i<li.length;i++){
		li[i].onmouseover=function(){
           a[i].style.color='grey';
           a[i].style.borderBottom='1px solid grey';
		}
		li[i].onmouseout=function(){
           a[i].style.color='white';
           a[i].style.borderBottom='none';
		}
	}
}