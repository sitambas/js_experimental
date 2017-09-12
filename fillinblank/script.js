'use strict';
function CreateFillInBlank(min,max,operate,tableLength){
	  var min = Math.ceil(min),
      max = Math.floor(max),
      tableValue =[],
      minNumber = 0,
      maxNumber = 0;
    for(var i=0;i<tableLength;i++){
      minNumber =  Math.floor(Math.random() * (max - min)) + min; 
      maxNumber =  Math.floor(Math.random() * (max - min)) + min;
      if(minNumber == maxNumber){
        maxNumber =  Math.floor(Math.random() * (max - min)) + min;
      }
      var tampValue = {};
      tampValue.minNumber = minNumber;
      tampValue.maxNumber = maxNumber;
      tampValue.operate   = operate;
      tampValue.finalValue = function(minNumber,maxNumber,operate){
        return function(){
          switch(operate){
            case '-':
              return minNumber - maxNumber;
            case '+':
              return minNumber + maxNumber;
            case '*':
              return minNumber * maxNumber;
            case '/':
             return  minNumber / maxNumber;
          }
        }();
      }(minNumber,maxNumber,operate);
//       console.log(tampValue);
      tableValue.push(tampValue);
    }
//   console.log(tableValue);
  reander(tableValue);
 
}

var reander = function(tableValue){
   var ul = document.createElement('ul');
   ul.setAttribute('id','tableList');
   document.getElementById('table-data').appendChild(ul);
   for(var i=0;i<tableValue.length;i++){
       var minNumber =  Math.floor(Math.random() * (4 - 1)) + 1;
//        console.log(minNumber);
       var firstNumber = tableValue[i].minNumber;
       var secondNumber = tableValue[i].maxNumber;
       var finalNumber = tableValue[i].finalValue;
       switch(minNumber){
         case 1 :
           firstNumber = "<input class='checkans' type='text' data-ans="+firstNumber+">";
           break;
         case 2 :
           secondNumber =  "<input class='checkans' type='text' data-ans="+secondNumber+">";;
           break;
         case 3 :
           finalNumber =  "<input class='checkans' type='text' data-ans="+finalNumber+">";;
           break;
       }
       
       $('#table-data ul').append('<li><span>'+firstNumber+'</span><span>'+tableValue[i].operate+'</span><span>'+secondNumber+'</span><span>=</span><span>'+finalNumber+'</span><span class="pass"></span>');
    }
}

$('#table-data').on('keyup','.checkans',function(){
  var currentAns = parseInt(this.value);
  var ans = $(this).data('ans');
  if(ans === currentAns){
     $(this).closest('li').find('.pass').html('done');
  }else{
     $(this).closest('li').find('.pass').html('fail');
  }
})
CreateFillInBlank(3,9,'-',20)
