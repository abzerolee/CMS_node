var Txt = document.getElementsByClassName('txt');
var inputText = document.createElement('input');
inputText.setAttribute('type', 'text');  
for(var i=0;i<Txt.length;i++){
  Txt[i].onclick=function(){
    var span = document.getElementsByClassName('txt');
    inputText.value=this.innerText;
    this.appendChild(inputText);
  }
}
