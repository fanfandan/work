function Game(){
	this.snake=['1_1','1_2','1_3'];
	this.sence=document.querySelector('.sence');
	this.direction=40;
	this.flag={'1_1':true,'1_2':true,'1_3':true};
	this.food='';
  this.gamelength=document.querySelector('.length');
  this.score=document.querySelector('.score');
  this.restart=document.querySelector('.restart');
}
Game.prototype={
    start:function(){
      this.length=3;
      this.score1=0;
      this.pause=false;
    	this.Dsence();
    	this.Dsnake();
    	this.move();
    	this.key();
    	this.drop();
    },
    //画场景
	Dsence:function(){
          for(let i=0;i<20;i++){
          	for(let j=0;j<20;j++){
          		this.sence.innerHTML+=`<div class='load' id='${i}_${j}'> </div>`
          	}
          }
	},
  restart:function(){
    clearInterval(that.t);
  },
  //画贪吃蛇
	Dsnake:function(){
		this.snake.forEach(element=>{
            document.getElementById(element).classList.add('hot');
		})
	},
  //移动
	move:function(){
	let that=this;
		that.t=setInterval(dong,500)
      function dong(){
			let old=that.snake[that.snake.length-1];		
            let arr= old.split('_');
            let newt='';
            if(that.direction==37){
               newt= `${arr[0]*1}_${arr[1]*1-1}`;
            }
             else if(that.direction==38){
               newt= `${arr[0]*1-1}_${arr[1]*1}`;
            }
            else if(that.direction==39){
               newt= `${arr[0]*1}_${arr[1]*1+1}`;
            }
            else if(that.direction==40){
               newt= `${arr[0]*1+1}_${arr[1]*1}`;
            }
        
            let newarr=newt.split('_')
            if(newarr[0]<1 || newarr[0]>19 || newarr[1]<1 || newarr[1]>19 || that.flag[newt]){    //新头
            	clearInterval(that.t);//前后一致//
            	alert('游戏结束！');
            	return ;
            }
            //吃到食物
            if(newt==that.food){
            	that.snake.push(newt);
            	that.flag[newt]=true;
            	document.getElementById(that.food).style.background='white';
              that.length++;
              that.score1+=2;
              console.log(that.length)
              that.gamelength.innerText='长度为：'+that.length;
              that.score.innerText='分数为：'+that.score1;

            	//从文档中获取that.food、注意单词拼写//
            	that.drop();
            }
            else{
            that.snake.push(newt);
            that.flag[newt]=true;
           let weiba=that.snake.shift();
           delete that.flag[weiba];
           document.getElementById(weiba).classList.remove('hot');
           that.Dsnake();  
            }   
		   }
    },        
	
  //键盘按下
	key:function(){

		document.onkeydown=function(e){//代码//
			let keycode=e.keyCode;

			 if(Math.abs(this.direction-keycode)==2){
            	return ;
              }
			this.direction=keycode;         
		}.bind(this);
		
	},
  // anxia:function(keycode){
  //   let that=this;
  
  //   switch(keycode){ 
  //       case 80:   console.log(1)
  //             if(that.pause){
  //                that.t=setInterval(dong,500);
  //                that.pause=true;
  //                console.log(keycode)
  //                  that.restart.innerText='pause';
  //             }
  //             else {
  //                  clearInterval(that.t);
  //                  that.pause=true;
  //                  that.restart.innerText='restart';
  //             }
  //   }
            
  // },
  //落食物
	drop:function(){
        let x=Math.floor(Math.random()*20);
        let y=Math.floor(Math.random()*20); 
        do{
        	  x=Math.floor(Math.random()*20);
              y=Math.floor(Math.random()*20); 
        }
        while(this.flag['${x}_${y}']);
        this.food=`${x}_${y}`;
        console.log(x)
        // document.getElementById(this.food).style.background= 'red';
        document.getElementById(this.food).style.background = 'red';//行内//
	}
}