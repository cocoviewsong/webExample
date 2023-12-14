let arr = ["『ユイカ』 - 17さいのうた。","Da Capo","阿云嘎,HOYO-MiX - Regression","Avid"];
let search = document.getElementsByClassName("blue-input")[0];  
// 返回元素集合
let selectedId = document.getElementById("selectedId")
 // 对指定ID的第一个对象的引用
function showList(){
	let res = searchByIndexOf(search.value,arr);
	for(let i=0;i<res.length;i++){
		let li = document.createElement("li");
		// 创造元素节点
		
		li.innerHTML = res[i];
		document.getElementById("drop").appendChild(li);
	}
}
 
search.oninput = function getMoreContents() {	
 
	//删除ul
	let drop = document.getElementById("drop");
	selectedId.removeChild(drop);
	//把ul添加回来
	let originalUl = document.createElement("ul");
    originalUl.id = "drop";
    selectedId.appendChild(originalUl);
		
	showList();
}
 
// 添加获取焦点事件	
search.onfocus = function(){
    	// 初始下拉列表x
        let originalUl = document.createElement("ul");
        originalUl.id = "drop";
        selectedId.appendChild(originalUl);
	showList();
}
 
//添加失去焦点事件
search.onblur = function(){
//	console.log("soutsout")
	let drop = document.getElementById("drop");
	selectedId.removeChild(drop);	
}
 
 
 
//模糊查询:利用字符串的indexOf方法
function searchByIndexOf(keyWord, list){
    if(!(list instanceof Array)){
        return ;
    }
    if(keyWord == ""){
    	return [];
    }else{
    	let len = list.length;
	    let arr = [];
	    for(let i=0;i<len;i++){
	        //如果字符串中不包含目标字符会返回-1
	        if(list[i].indexOf(keyWord)>=0){
	            arr.push(list[i]);
	        }
	    }
	    return arr;
    }
    
}
 

function searchByRegExp(keyWord, list){
    if(!(list instanceof Array)){
        return ;
    }
    let len = list.length;
    let arr = [];
    let reg = new RegExp(keyWord);
    for(let i=0;i<len;i++){
        //如果字符串中不包含目标字符会返回-1
        if(list[i].match(reg)){
            arr.push(list[i]);
        }
    }
    return arr;
}