var str = 
`
Question,1
 Consider the code snippet given below

var count = [1,,3];
What is the observation made?
 The omitted value takes “undefined”
 This results in an error
 This results in an exception
 None of the mentioned



Question,1
 Consider the following code snippet

var a1 = [,,,]; 
var a2 = new Array(3); 
0 in a1 
0 in a2
The result would be
 true false
 false true
 true true
 false true



Question,1
 The pop() method of the array does which of the following task ?
 decrements the total length by 1
 increments the total length by 1
 prints the first element but no effect on the length
 None of the mentioned



Question,4
 Consider the following code snippet :

if (!a[i]) continue;
What is the observation made ?
 Skips the undefined elements
 Skips the non existent elements
 Skips the null elements
 All of the mentioned



Question,1
 What will happen if reverse() and join() methods are used simultaneously ?
 Reverses and stores in the same array
 Reverses and concatenates the elements of the array
 Reverses
 All of the mentioned



Question,1
 Consider the following code snippet :

var a = [1,2,3,4,5];
a.slice(0,3);
What is the possible output for the above code snippet ?
 Returns [1,2,3].
 Returns [4,5].
 Returns [1,2,3,4].
 Returns [1,2,3,4,5].



Question,1
 Consider the following code snippet :

var a = []; 
a.unshift(1); 
a.unshift(22);
a.shift(); 
a.unshift(3,[4,5]); 
a.shift(); 
a.shift();
a.shift();
The final output for the shift() is
 1
 [4,5].
 [3,4,5].
 Exception is thrown



Question,3
 The primary purpose of the array map() function is that it
 maps the elements of another array into itself
 passes each element of the array and returns the necessary mapped elements
 passes each element of the array on which it is invoked to the function you specify, and returns an array containing the values returned by that function
 None of the mentioned



Question,2
 The reduce and reduceRight methods follow a common operation called
 filter and fold
 inject and fold
 finger and fold
 fold



Question,4
 The method or operator used to identify the array is
 isarrayType()
 ==
 ===
 typeof



Question,3
Consider the following code snippet :

var grand_Total=eval("10*10+5");
The output for the above statement would be :
 10*10+5
 105 as a string
 105 as an integer value
 Exception is thrown



Question,3
Do functions in JavaScript necessarily return a value ?
 It is mandatory
 Not necessary
 Few functions return values by default
 All of the mentioned



Question,1
Consider the following code snippet :

var tensquared = (function(x) {return x*x;}(10));
Will the above code work ?
 Yes, perfectly
 Error
 Exception will be thrown
 Memory leak



Question,2
Consider the following code snippet :

var string2Num=parseInt("123xyz");
The result for the above code snippet would be :
 123
 123xyz
 Exception
 NaN



Question,4
The one-liner code that concatenates all strings passed into a function is

 function concatenate() 
   {
        return String.prototype.concat('', arguments);
   }
 function concatenate() 
   {
        return String.prototype.apply('', arguments);
   }
 function concatenate() 
   {
       return String.concat.apply('', arguments);
   }
 function concatenate() 
   {
       return String.prototype.concat.apply('', arguments);
   }  
 


Question,1
If you have a function f and an object o, you can define a method named m of o with
 o.m=m.f;
 o.m=f;
 o=f.m;
 o=f;



Question,3
For the below mentioned code snippet:

var o = new Object();
The equivalent statement is:

 var o = Object();
 var o;
 var o= new Object;
 Object o=new Object();  
 


Question,4
What is the difference between the two lines given below ?

!!(obj1 && obj2);
(obj1 && obj2);
 Both the lines result in a boolean value “True”
 Both the lines result in a boolean value “False”
 Both the lines checks just for the existence of the object alone
 The first line results in a real boolean value whereas the second line merely checks for the existence of the objects



Question,1
Consider the following code snippet :

var c = counter(), d = counter(); 
c.count()
d.count() 
c.reset() 
c.count() 
d.count()
The state stored in d is :
 1
 0
 Null
 Undefined



Question,3
Consider the following code snippet :

function constfuncs() 
{
    var funcs = [];
    for(var i = 0; i < 10; i++)
        funcs[i] = function() { return i; };
    return funcs;
}
var funcs = constfuncs();
funcs[5]()
What does the last statement return ?
 9
 0
 10
 None of the mentioned`
var questions = str.split('\n\n\n')
var answers = questions.map((q,i) => {
	let idx = q.indexOf("Question,")+9
	questions[i] = q.substr(idx)
	return q[idx]
})
var ques = questions.map((q,i) => {
	let idx = q.lastIndexOf('\n',q.lastIndexOf('\n', q.lastIndexOf('\n',q.lastIndexOf('\n')-1)-1)-1)
	let qu = q.substr(2,idx)
	let f = q.substr(idx).split('\n')
	f.shift();
	return {question: qu,options: f, answer: answers[i]}
})
module.exports = ques