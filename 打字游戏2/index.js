
//属性；哪些字母   个数   速度   位置   生命值   分数
//方法；产生字符   下落   匹配消除  去重叠  去重复 重新开始   下一关
function Game(){
  	this.charArr=[
  	['A','img/A.png'],
  	['B','img/B.png'],
  	['C','img/C.png'],
  	['D','img/D.png'],
  	['E','img/E.png'],
  	['F','img/F.png'],
  	['G','img/G.png'],
  	['H','img/H.png'],
  	['I','img/I.png'],
  	['J','img/J.png'],
  	['K','img/K.png'],
  	['L','img/L.png'],
  	['M','img/M.png'],
  	['N','img/N.png'],
  	['O','img/O.png'],
  	['P','img/P.png'],
  	['Q','img/Q.png'],
  	['R','img/R.png'],
  	['S','img/S.png'],
  	['T','img/T.png'],
  	['U','img/U.png'],
  	['V','img/V.png']];
  	//页面的元素
  	this.current=[];
  	this.position=[];
  	//个数
  	this.num=5;
  	this.speed=10;
  	this.gk=10;
  	this.score=0;
  	this.hp=10;
  	this.scoreobj=document.querySelector('.score>span');
  	this.hpobj=document.querySelector('.hp>span');

  }
  Game.prototype={
  	start:function(){
  		this.getChars();
  		this.drop();
  		this.key();
  	},
  	getChars:function(){
  		for(let i=0;i<this.num;i++){
  			this.getChar();
  		}
  	},
    getChar:function(){
    	let index=Math.floor(Math.random()*this.charArr.length);
    	 while(this.norepeat(this.charArr[index][0])){
        	index=Math.floor(Math.random()*this.charArr.length);
        }
    	chwidth=window.innerWidth;
    	let divs=document.createElement('div');
    	divs.innerHTML=this.charArr[index][0];       
    	divs.classList.add('char');
    	let tops=Math.floor(Math.random()*100);
    	let lefts=Math.floor(Math.random()*(chwidth-400)+200);
		while(this.checkPosition(lefts)){
           lefts=Math.floor(Math.random()*(chwidth-400)+200);
	   }
    	
    	
    	  
    	divs.style.cssText=`
         background-image:url('${this.charArr[index][1]}');
         top:${tops}px;
    	 left:${lefts}px;
    	`;  	
    	document.body.appendChild(divs);
        this.current.push(divs);
        this.position.push(lefts);
    },
    drop:function(){
    	let that=this;
    	 this.t=setInterval(function(){
    		for(let i=0;i<that.current.length;i++){
    			let tops=that.current[i].offsetTop+that.speed;
    			that.current[i].style.top=`${tops}px`;
    			if(tops>=500){
    				document.body.removeChild(that.current[i]);
    				that.current.splice(i,1);
    				that.position.splice(i,1);
    				that.hp--;
    				that.hpobj.innerText=that.hp;
    				if(that.hp==0){
    					let flag=confirm('游戏结束，你要重新开始吗？')
    						if(flag){
    							that.restart();
    						}else{
    							close();
    						}
    					
    				}
    				that.getChar();
    			}
    		}
    		

    	},300);    
    },
    key:function(){
    	let that=this;
    	document.onkeydown=function(e){
    		for(let i=0;i<that.current.length;i++){
    			if(that.current[i].innerText==String.fromCharCode(e.keyCode)){
    				that.score+=1;
                    that.scoreobj.innerText=that.score;
    				document.body.removeChild(that.current[i]);
    				that.current.splice(i,1);
    				that.position.splice(i,1);
    				that.getChar();
    				if(that.score>=that.gk){
    					that.next();
    				}
    			}
    		}
    	}
    	//return that.score;
    },

    checkPosition:function(lefts){
    	let flag=this.position.some(function(value){
              return Math.abs(lefts-value)<=60;
    	})
        return flag;
    },
    next:function(){ 	
    		clearInterval(this.t);
    		alert('又过一关');
    		this.current.forEach(element=>{
    			document.body.removeChild(element);
    		})
    		this.current.length=0;
        	this.position.length=0;
        	this.num++;
        	this.gk+=10;
        	this.hp++;
        	this.start();
    },
    restart:function(){
    	clearInterval(this.t);
		this.current.forEach(element=>{
			document.body.removeChild(element);
		})
    	this.current.length=0;
    	this.position.length=0;
    	this.num=5;
    	this.gk=10;
    	this.score=0;
    	this.hp=10;
    	this.start();
    },
    norepeat:function(value){
    	let flag=this.current.some(function(element){
    		return value==element.innerHTML;
    	})
    	return flag;

    }

  }

	
  