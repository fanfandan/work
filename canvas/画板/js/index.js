
let canvas = document.querySelector('canvas');
let cts = canvas.getContext("2d");
let xp = document.querySelector('.xp');
let zhe = document.querySelector('.zhe');
class Palette{
	constructor(canvas,cts,zhe,xp){
		this.xp = xp;
		this.zhe  = zhe;
		this.canvas = canvas;
		this.cts = cts;
		this.lineWidth = 5;
		this.style = 'stroke';
		this.cw = this.canvas.width;
		this.ch = this.canvas.height;
		// this.strokeStyle = '#000';
		this.history = [];
		this.strokeStyle = '#000';
		this.fillStyle = '#000';
		this.temp = null;
		// this.strokeStyle = value;
	}
	line(ox,oy,cx,cy){
		this.cts.setLineDash([3,0]);
		this.cts.beginPath();
		this.cts.moveTo(ox, oy);
		this.cts.lineTo(cx, cy);
		this.cts.closePath();
		this.cts.strokeStyle = this.strokeStyle;
		this.cts.stroke();
	}
	dash(ox,oy,cx,cy){
		this.cts.beginPath();
		this.cts.moveTo(ox, oy);
		this.cts.lineTo(cx, cy);
		this.cts.setLineDash([3,3]);
		this.cts.stroke();
	}
	circle(ox,oy,cx,cy){
		let r = Math.sqrt(Math.pow(ox-cx,2)+Math.pow(oy-cy,2));
		this.cts.beginPath();
		this.cts.arc(ox, oy, r, 0, Math.PI*2);
		this.cts[this.style]();
	}
	rect(ox,oy,cx,cy){
		this.cts.strokeRect(ox, oy, Math.abs(ox-cx), Math.abs(oy-cy));
	} 
	poly(ox,oy,cx,cy,n){
		let rad = Math.PI*2/n;
		let r = Math.sqrt(Math.pow(ox-cx,2)+Math.pow(oy-cy,2));
		this.cts.beginPath();
		this.cts.moveTo(ox+r,oy);
		for(let i=0;i<n;i++){
			let x = ox+Math.cos(rad*i)*r;
			let y = oy+Math.sin(rad*i)*r;
			this.cts.lineTo(x,y);
		}
		this.cts.closePath();
		this.cts[this.style]();
	}
	polyJ(ox,oy,cx,cy,n){
		let rad = Math.PI/n;
		let r = Math.sqrt(Math.pow(ox-cx,2)+Math.pow(oy-cy,2));
		this.cts.beginPath();
		this.cts.moveTo(ox+r,oy);
		for(let i=0;i<2*n;i++){
			let r1 = i%2==0?r:r/2;
			let x = ox+Math.cos(rad*i)*r1;
			let y = oy+Math.sin(rad*i)*r1;
			this.cts.lineTo(x,y);
		}
		this.cts.closePath();
		this.cts[this.style]();
	}
	pen(){
		this.canvas.onmousedown = function(e){
			let ox = e.offsetX,oy=e.offsetY;
	        this.cts.moveTo(ox,oy);
	        this.canvas.onmousemove = function(e){
	        	this.cts.clearRect(0,0,this.cw,this.ch);
	        	if(this.history.length){
	        		this.cts.putImageData(this.history[this.history.length-1],0,0);
	        	}
	       		this.cts.lineTo(e.offsetX,e.offsetY);
	            this.cts.stroke();
	        }.bind(this);
		    this.canvas.onmouseup = function(){
		    	this.history.push(this.cts.getImageData(0,0,this.cw,this.ch));
		        this.canvas.onmousemove = null;
		        this.canvas.onmouseup = null;
	    	}.bind(this);
  	 	}.bind(this)
	}
	xiangpi(){
		this.zhe.onmousedown = function(e){
			let ox = e.offsetX,oy = e.offsetY;
			this.zhe.onmousemove = function(e){
				let cx = e.offsetX,cy = e.offsetY;
				this.xp.style.display = 'block';
				this.xp.style.left = `${cx-25}px`;
				this.xp.style.top = `${cy-25}px`;
				this.cts.clearRect(cx,cy,50,50);
			}.bind(this);
			this.zhe.onmouseup = function(){
				this.history.push(this.cts.getImageData(0,0,this.cw,this.ch));
				this.xp.style.display = 'none';
				this.zhe.onmousemove = null;
				this.zhe.onmouseup = null;
			}.bind(this);
		}.bind(this);
	}
	ys(){
		let that = this;
		let scolor = document.querySelector('.strokecolor');
		scolor.onblur = function(){
			that.strokeStyle = scolor.value;
		}
	}
	ys2(){
		let that = this;
		let scolor = document.querySelector('.fillcolor');
		scolor.onblur = function(){
			
			that.fillStyle = scolor.value;
			console.log(that.fillStyle);
			console.log(2);
		}
	}
	tianchong(){
		this.style = 'fill';
	}
	miaobian(){
		this.style = 'stroke';
	}
	clip(cai){
		let that = this;
		let minX,minY,w,h;
		this.zhe.onmousedown = function(e){
			that.zhe.onmousedown = null;
			let ox = e.offsetX,oy = e.offsetY;
			cai.style.width =0;
			cai.style.height = 0;
			cai.style.display = 'block';
			that.zhe.onmousemove= function(e){
				
				let cx=e.offsetX,cy = e.offsetY;
				minX = cx>ox?ox:cx; 
				minY = cy>oy?oy:cy;
				w = Math.abs(cx-ox);
				h = Math.abs(cy-oy);
				cai.style.width = `${w}px`;
				cai.style.height = `${h}px`;
				cai.style.left = `${minX}px`;
				cai.style.top = `${minY}px`;
			}
			that.zhe.onmouseup =function(){
				that.temp = that.cts.getImageData(minX,minY,w,h);
				
				that.cts.clearRect(minX,minY,w,h);
				that.history.push(that.cts.getImageData(0,0,that.cw,that.ch));
				that.cts.putImageData(that.temp,minX,minY);
				// cai.style.display = 'none';
				that.zhe.onmousemove = null;
				that.zhe.onmouseup = null;
				that.drag(minX,minY,cai);
			}
		}
	}
	drag(x,y,obj){
		let that = this;
		this.zhe.onmousedown = function(e){
			let cx = e.offsetX,cy=e.offsetY;
			that.zhe.onmousemove = function(e){
				let ox = e.offsetX,oy = e.offsetY;
				let lefts = x + ox-cx ;
				let tops = y + oy-cy;
				that.cts.clearRect(0,0,that.cw,that.ch)
				if(that.history.length){
					that.cts.putImageData(that.history[that.history.length-1],0,0)
				}
				obj.style.left = `${lefts}px`;
				obj.style.top = `${tops}px`;
				that.cts.putImageData(that.temp,lefts,tops);
			}
			that.zhe.onmouseup = function(){
				that.history.push(that.cts.getImageData(0,0,that.cw,that.ch))
				that.temp = null;
				obj.style.display = 'none';
				that.zhe.onmousemove = null;
				that.zhe.onmouseup = null;
			}
		}

	}
	chexiao(){
		if(!this.history.length){
    		return;
    	}
    	this.cts.clearRect(0,0,this.cw,this.ch);
    	this.history.pop();
    	this.cts.putImageData(this.history[this.history.length-1],0,0)
	}
	font(){
		let that = this;
		let tops = 0,lefts = 0;
		this.zhe.onmousedown = function(e){
			let ox = e.offsetX,oy=e.offsetY;
			that.zhe.onmousedown = null;
			let divs = document.createElement('div');
			divs.contentEditable = true;
			divs.style.cssText = `width:150px;height:30px;
			border:1px solid #ccc;position:absolute;left:${ox}px;top:${oy}px; cursor:move;line-height:30px;
			`;
			this.appendChild(divs);
			divs.onmousedown = function(e){
				let left = divs.offsetLeft;
				let top = divs.offsetTop;
				let top2 = e.clientY,left2 = e.clientX;
				divs.onmousemove= function(e){
					let top1 = e.clientY,left1 = e.clientX;
					tops =top +top1-top2;
					lefts = left+left1-left2;
					divs.style.left = `${lefts}px`;
					divs.style.top = `${tops}px`;
				}
				divs.onmouseup = function(){
					divs.onmousemove = null;
					divs.onmouseup = null;
				}
			}
			divs.onblur = function(){
				let value = divs.innerText;
				that.zhe.removeChild(divs);
				that.cts.font = 'bold 40px sans-serif';
				that.cts.textAlign = 'center';
				that.cts.textBaseLine = 'middle';
				that.cts.fillText(value,lefts,tops);
				that.history.push(that.cts.getImageData(0,0,that.cw,that.ch));

			}
		}

	}
	draw(type,num){
		this.zhe.onmousedown = function(e){
			let ox = e.offsetX,oy=e.offsetY;
			this.zhe.onmousemove = function(e){
				let cx = e.offsetX,cy = e.offsetY;
				this.cts.clearRect(0,0,this.cw,this.ch);
				if(this.history.length){
					this.cts.putImageData(this.history[this.history.length-1],0,0)
				}
				this[type](ox,oy,cx,cy,num);
			}.bind(this);
			this.zhe.onmouseup = function(){
				this.history.push(this.cts.getImageData(0,0,this.cw,this.ch));
				this.zhe.onmousemove = null;
				this.zhe.onmouseup = null;
			}.bind(this)
		}.bind(this)
	}

   clearAll(){
   	  this.cts.clearRect(0,0,this.cw,this.ch);
   	  this.history.push(this.cts.getImageData(0,0,this.cw,this.ch));
   	  //页面发生变化，需要保存
   }
   reverse(){
   	  let imgdata=this.cts.getImageData(0,0,this.cw,this.ch);
   	   for(let i=0;i<imgdata.data.length;i=i+4){
   	   	 imgdata.data[i]=255-imgdata.data[i];
   	   	 imgdata.data[i+1]=255-imgdata.data[i+1];
   	   	 imgdata.data[i+2]=255-imgdata.data[i+2];
   	   }
   	   this.cts.putImageData(imgdata,0,0)
   }

}

let lis=document.querySelectorAll('li')
let scolor = document.querySelector('.strokecolor');
let fcolor = document.querySelector('.fillcolor');

let huabu = new Palette(canvas,cts,zhe,xp,scolor);

let zhixian = document.querySelector('.zhixian');
let dash = document.querySelector('.dash');
let yuan = document.querySelector('.yuan');
let poly = document.querySelector('.poly');
let polyJ = document.querySelector('.polyJ');
let pen = document.querySelector('.pen');
let xiangpi = document.querySelector('.xiangpi');
let rect = document.querySelector('.rect');
let tianchong = document.querySelector('.tianchong');
let miaobian = document.querySelector('.miaobian');
let chexiao = document.querySelector('.chexiao');
let newall=document.querySelector('.newall');
let clearAll=document.querySelector('.clearAll');

let save=document.querySelector('.save');
let btn=document.querySelectorAll('.fill , .stroke');
let reverse=document.querySelector('.reverse');
let font = document.querySelector('.font');
let clip = document.querySelector('.clip');
let clips = document.querySelector('#clip');
huabu.draw('line')
zhixian.onclick = function(){
	huabu.draw('line');
	for(let i=0;i<lis.length;i++){
       	lis[i].style.border='1px solid #ccc';
       }
		zhixian.style.border='1px solid #ff6700';
}
dash.onclick = function(){
	huabu.draw('dash');
	for(let i=0;i<lis.length;i++){
       	lis[i].style.border='1px solid #ccc';
       }
		dash.style.border='1px solid #ff6700';
}
yuan.onclick = function(){
	huabu.draw('circle');
	for(let i=0;i<lis.length;i++){
       	lis[i].style.border='1px solid #ccc';
       }
		yuan.style.border='1px solid #ff6700';
}
poly.onclick = function(){
	let num = prompt('请输入边数',5);
	huabu.draw('poly',num);
	for(let i=0;i<lis.length;i++){
       	lis[i].style.border='1px solid #ccc';
       }
		poly.style.border='1px solid #ff6700';
}
polyJ.onclick = function(){
	let num = prompt('请输入角数',5);
	huabu.draw('polyJ',num);
	for(let i=0;i<lis.length;i++){
       	lis[i].style.border='1px solid #ccc';
       }
		polyJ.style.border='1px solid #ff6700';
}
pen.onclick = function(){
	huabu.pen();
	for(let i=0;i<lis.length;i++){
       	lis[i].style.border='1px solid #ccc';
       }
		pen.style.border='1px solid #ff6700';
}
xiangpi.onclick = function(){
	huabu.xiangpi();
	for(let i=0;i<lis.length;i++){
       	lis[i].style.border='1px solid #ccc';
       }
		xiangpi.style.border='1px solid #ff6700';
}
rect.onclick = function(){
	huabu.draw('rect');
		for(let i=0;i<lis.length;i++){
       	lis[i].style.border='1px solid #ccc';
       }
		rect.style.border='1px solid #ff6700';
}
chexiao.onclick = function(){
	huabu.chexiao();
	for(let i=0;i<lis.length;i++){
       	lis[i].style.border='1px solid #ccc';
       }
		chexiao.style.border='1px solid #ff6700';
}
scolor.onclick = function(){
	huabu.ys();
	for(let i=0;i<lis.length;i++){
       	lis[i].style.border='1px solid #ccc';
       }
		scolor.style.border='1px solid #ff6700';
}
font.onclick = function(){
	huabu.font();
	for(let i=0;i<lis.length;i++){
       	lis[i].style.border='1px solid #ccc';
       }
		font.style.border='1px solid #ff6700';
}
fcolor.onclick =function(){
	huabu.ys2();
}
tianchong.onclick = function(){
	huabu.tianchong();
}
miaobian.onclick = function(){
	huabu.miaobian();
}
clip.onclick = function(){
	console.log(1)
	huabu.clip(clips);
	for(let i=0;i<lis.length;i++){
       	lis[i].style.border='1px solid #ccc';
       }
		clip.style.border='1px solid #ff6700';
}

btn.forEach(element=>{
	element.onclick=function(){
		for(let i=0;i<btn.length;i++){
	     btn[i].setAttribute('active',false);
		this.setAttribute('active',true);
		huabu.style=this.id;
	}
  }
})
save.onclick=function(){
	let data=canvas.toDataURL('image/png');
    	save.href=data;
    	save.download='tu.jpg';
}
clearAll.onclick=function(){
	huabu.clearAll();
}
newall.onclick=function(){
	let flag=confirm('是否保存');
	location.href=canvas.toDataURL('image/png').replace('image/png','image/octet-stream');
	// if(flag){
	// 	save.onclick();
	// }
	// else{
	// 	clearAll.onclick();
	// }
}
reverse.onclick=function(){
   huabu.reverse();
}