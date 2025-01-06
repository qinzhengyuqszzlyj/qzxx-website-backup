var li = $('.nav-ul>li');
var im = $('.li-img');
var a;
$(function(){
$(".li").hover(

function(){
$(this).find(".nav-ul-ul").stop(true,true).slideDown();
},function(){
$(this).find(".nav-ul-ul").slideUp(50);
}
)
})
for(var i = 0 ; i < li.length ; i++){
	(function(o){
		$(li[o]).mouseover(function(){
			$(im[o]).css('display','inline-block');
		})
		$(li[o]).mouseout(function(){
			$(im[o]).css('display','none');
		})	

	})(i)
}


function iePlaceholder(nodes,color) {   
    //仅在不支持 placeholder 的时候执行(ie9及以下)
    if(nodes.length && !("placeholder" in document.createElement('input'))){
        var pcolor;//默认颜色
        if(pcolor){
            pcolor = color;
        }else{
            pcolor = '#4a4a4a';//使用默认颜色
        }

        for(i=0;i<nodes.length;i++){
            var self = nodes[i];
            var inType = self.getAttribute("type") || 'text'; 
            var placeholder;
            //如果地址栏没获得值的情况下显示placeholder上的值             
            placeholder = self.getAttribute('placeholder') || ''; 

            //没有传值的情况下，填充placeholder的值
            if(!self.value){

                //填充非password框
                if(self.getAttribute("type")!="password"){
                    self.value = placeholder;
                    self.style.color = pcolor; 
                }else if(self.getAttribute("type")=="password"){                    
                    //对password框的特殊处理1.创建一个text框 2获取焦点和失去焦点的时候切换                   
                    var pwdVal = self.getAttribute('placeholder');          
                    //在该密码框后新增input，并设置type为text以及其他属性样式
                    var newItem=document.createElement("input");  

                    newItem.setAttribute("type","text");
　　                  newItem.setAttribute("class","newText");
　　                  newItem.setAttribute("value", pwdVal);
                    newItem.setAttribute("autocomplete","off");
                    newItem.style.cssText = "color: "+pcolor+";"; 

                    insertAfter(newItem, self);

                    nexts(self).style.display = "inline-block";   
                    self.style.display = "none";
                }               
            }

            self.onfocus = function(){              
                var pValue = this.value;
                var ph = this.getAttribute('placeholder');
                var pT = this.getAttribute("type");               

                if(pValue == ph){
                    if(pT!='password'){
                        this.value = '';                        
                    }                   
                } 
                if(this.getAttribute("class")=="newText"){                  
                    this.style.display = "none";                  
                    pres(this).style.display = "inline-block";
                    pres(this).focus();                 
                }               
            }

            self.onblur = function(){           

                var pValue = this.value;
                var ph = this.getAttribute('placeholder');
                var pT = this.getAttribute("type");               

                if(this.getAttribute("class")!="newText"){
                        var passType = this.getAttribute("type");
                        if(this.value == ''){                           
                            if(passType=='password'){                               
                                this.style.display = "none";
                                nexts(this).style.display = "inline-block";
                            }
                        }                  
                }

                if(pValue == ''){                   
                    if(pT!='password'){                     
                        this.value = ph;
                    }                   
                }else{
                    this.style.color = pcolor;
                }               
            }               
        }

    }

}

function insertAfter(newElement, targetElement){            
    var parent = targetElement.parentNode;
    if (parent.lastElementChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

function nexts(ele) {
    if (typeof ele.nextElementSibling == 'object') {
        return ele.nextElementSibling;
    }
    var n = ele.nextSibling;
    while (n) {
        if (n.nodeType == 1) {
            return n;
        }
        n = n.nextSibling;
    }
    return n;
}

function pres(ele) {
    if (typeof ele.previousElementSibling == 'object') {
        return ele.previousElementSibling;
    }
    var m = ele.previousSibling ;
    while (m) {
        if (m.nodeType == 1) {
            return m;
        }
        m = m.previousSibling ;
    }
    return m;
}