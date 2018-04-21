import $ from './jquery-1.11.3.min.js'
window.$ = $;
window.jQuery = $;
$(function(){
	var charCode = 67;
	var colors = [''];
	$("#js-addMedia").on("click",function(){
		var char = String.fromCharCode(++charCode);
		$("#js-Media").append("<p><span>"+char+"</span><input type='number' id='"+char+"'></p>");
	})
	$("#js-sort").on("click",function(){
		$("#list").empty();
		var data = [];
		$("#js-Media").find("p").each(function(index,item){
			data.push({
				name:$(item).find("input").attr("id"),
				count:Number($(item).find("input").val()),
				color:getRandomColor()
			});
		})
		var list = itemSort(data);
		var res = perch(list,false);
		if(singleChild(res)!== -1){
			//说明有相邻的
			res = perch(list,true)
		}
		var arr = Array.prototype.concat.apply([],res);
		arr.forEach(function(item,index){
			$("#list").append("<span style = 'margin-left:5px;color:"+item.color+"'>"+item.name+"</span>");
		})
		console.log(arr);

	})
})
//用媒体数最多的媒体进行占位
function perch(list,iscover){
	var perch = [];
	var first = list[0];
	for(var i = 0;i < first.count; i++){
		perch.push([first]);
	}
	//占位完毕
	//
	var flag = 0;
	for(var i = 1;i < list.length; i++){
		/*如果插入的序列大于排序数组长度，则从零开始计算*/
		if(flag >=perch.length){
			flag = flag - perch.length;
		}
		special(list[i],perch,flag,iscover);
		flag++;
	}
	return perch;
}
//插入
function special(item,perch,flag,iscover){
	var firstLen = perch.length;
	
	for(var i = 1;i <= item.count;i++){
		var index = Math.floor(firstLen/item.count*(i-1))+flag;
		if(iscover){
			//主要针对前几个进行特殊处理
			var singleindex = singleChild(perch);
			//如果坑序列中有空缺并且当前序列在坑中已有其他元素填补
			if(singleindex !== -1 && perch[index].length > 1)	{
				index = singleindex;
			}
		}
		exists(index,item,perch);
		//perch[index].push(item);
	}
}
//检测坑中从左到右第一个没有填充的
	function singleChild(perch){
		var index = -1;
		var indexArr = [];
		for(var i = 0;i < perch.length;i++){
			if(perch[i].length < 2){
				indexArr.push(i);
			}
		}
		if(indexArr.length === 0){
			index = -1;
		}
		else{
			var item = Math.floor((Math.random()*indexArr.length));
			index = indexArr[item];
		}
		return index;
	}
//检测小数组中是否存在当前这一项
function exists(index,item,perch){
	var firstLen = perch.length;
	if(index >= firstLen){
			index = index - firstLen;
	}
	var itemSame = perch[index].find(function(it){
		return it.name === item.name;
	})
	if(itemSame){
		exists(index+1,item,perch);
	}else{
		perch[index].push(item);
	}
}
//优先有公约数的其次是其他数据由大到小排序
function itemSort(items){
	var exactDiv = [],notExact = [];
	var items = sort(items);
	//如果数组长度大于0
	if(!!items.length){
		var first = items[0];
		for(var i = 1;i < items.length;i++){
			if(first.count % items[i].count === 0){
				exactDiv.push(items[i]);
			}
			else{
				notExact.push(items[i]);
			}
			
		}
		return Array.prototype.concat.apply([],[[first],sort(exactDiv),sort(notExact)]);
	}
}
function sort(items){
	return items.sort(function (a, b) {
	  return (a.count - b.count)
	}).reverse();
}
//随机获取16进制颜色值
function getRandomColor(){ 
	return "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6); 
} 
//检测坑中从左到右第一个没有填充的
function singleChild (perch){
	var index = -1;
	var indexArr = [];
	for(var i = 0;i < perch.length;i++){
		if(perch[i].length < 2){
			indexArr.push(i);
		}
	}
	if(indexArr.length === 0){
		index = -1;
	}
	else{
		var item = Math.floor((Math.random()*indexArr.length));
		index = indexArr[item];
	}
	return index;
}