/*
 * Create a list that holds all of your cards
 */
var aarray=new Array();
var cards = document.getElementsByClassName("deck")[0].getElementsByClassName("card");
var cardnum=16;
var move=0;
var moves=document.getElementsByClassName('moves')[0];
var game=new Array();
var cardlist=document.getElementsByClassName("deck")[0];
var ali=aarray;
var repeat=document.getElementsByClassName("restart")[0].getElementsByClassName("fa fa-repeat")[0];
for (var i=0;i<=cards.length-1;i++) {
	aarray[i]=cards[i];
}

$(".deck").on('click','li',event);

//每当翻动卡片到一定次数，星星数目会减少，作为游戏成绩的判定
function cutstart(){
	if(move==3||move==6||move==9){
	var starts=document.getElementsByClassName("stars")[0].getElementsByClassName('fa-star');
		starts[starts.length-1].className="fa fa-star-o";
	}	
}
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//点击重新开始按钮,每次点击都把记录数组和步数还有星星数目归零。把所有的卡片都设置成原始样式。
repeat.onclick=function(){
	var deck=document.getElementsByClassName("deck")[0];
	cardnum=16;
	game=[];
	list="";
	shuffle(aarray);
	for (var i=0;i<=aarray.length-1;i++) {
		var iclass=aarray[i].firstElementChild.className;
		list+="<li class='card'><i class='"+iclass+"'></i></li>";
	}
	console.log(list);
	deck.innerHTML=list;
	move=0;
	moves.innerHTML=move;
	var cutstarts=document.getElementsByClassName("stars")[0].getElementsByClassName('fa-star-o');
	for(var i=0;i<cutstarts.length;i++){
		cutstarts[i].className="fa fa-star";
	}
	
}

//卡片点击事件，给当前点击的卡片加上show和open，也就是翻过来的效果，ganme数组用来记录已经翻过来的两张卡片，方便判断
function event(){
	classname=this.firstElementChild.className;//获取点击元素的子类li的类名
	if(this.className==="card"+" "+"open"+" "+"show"||this.className==="card"+" "+"match"){
		//判断该卡片没被点击，预防用户点击同一卡片两次或已经翻过了的卡片
	}else{			
	this.className="card"+" "+"open"+" "+"show";//翻牌
	game.push(classname);
	}
	if(game.length>=2){
			match();	
	}
		
	if(cardnum==0){
		alert("游戏结束,你赢了，点击右上角的圈圈可以重新开始");
	}
}



//卡片匹配函数，匹配两种卡片是否一样。
function match(){
	if(game.length>=2&&game[0]===game[1]){
		document.getElementsByClassName("show")[0].className="card"+" "+"match";
		document.getElementsByClassName("show")[0].className="card"+" "+"match";
		this.className="card"+" "+"match";
		game=[];
		cardnum=cardnum-2;
		move++;
		moves.innerHTML=move;
		cutstart();
	}else if(game.length>=2){
		setTimeout(function(){
		document.getElementsByClassName("error")[0].className="card";
		document.getElementsByClassName("error")[0].className="card";
		},1000);
		document.getElementsByClassName("show")[0].className="card"+" "+"error"+" "+"animated"+" "+"rubberBand";
		document.getElementsByClassName("show")[0].className="card"+" "+"error"+" "+"animated"+" "+"rubberBand";
		this.className="card";
		game=[];
		move++;
		moves.innerHTML=move;
		cutstart();
	}
}
