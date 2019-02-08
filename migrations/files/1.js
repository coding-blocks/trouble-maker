var str = 
`
Question,1
  (function(){
    return typeof arguments;
  })();
 "object"
 "array"
 "arguments"
 "undefined"



Question,4
  var f = function g(){ return 23; };
  typeof g();
 "number"
 "undefined"
 "function"
 Error



Question,1
  (function(x){
    delete x;
    return x;
  })(1);
 1
 null
 undefined
 Error



Question,4
  var y = 1, x = y = typeof x;
  x;
 1
 "number"
 undefined
 "undefined"



Question,1
  (function f(f){
    return typeof f();
  })(function(){ return 1; });
 "number"
 "undefined"
 "function"
 Error



Question,1
  var foo = {
    bar: function() { return this.baz; },
    baz: 1
  };
  (function(){
    return typeof arguments[0]();
  })(foo.bar);
 "undefined"
 "object"
 "number"
 "function"



Question,1
  var foo = {
    bar: function(){ return this.baz; },
    baz: 1
  }
  typeof (f = foo.bar)();
 "undefined"
 "object"
 "number"
 "function"



Question,2
  var f = (function f(){ return "1"; }, function g(){ return 2; })();
  typeof f;
 "string"
 "number"
 "function"
 "undefined"



Question,3
  var x = 1;
  if (function f(){}) {
    x += typeof f;
  }
  x;
 1
 "1function"
 "1undefined"
 NaN



Question,2

  var x = [typeof x, typeof y][1];
  typeof typeof x;
 "number"
 "string"
 "undefined"
 "object"



Question,1

  (function(foo){
    return typeof foo.bar;
  })({ foo: { bar: 1 } });
 "undefined"
 "object"
 "number"
 Error



Question,2

  (function f(){
    function f(){ return 1; }
    return f();
    function f(){ return 2; }
  })();
 1
 2
 Error (e.g. "Too much recursion")
 undefined



Question,1

  function f(){ return f; }
  new f() instanceof f;
 true
 false



Question,2

  with (function(x, undefined){}) length;
 1
 2
 undefined
 Error



Question,1
(function(x, f = () => x) {
  var x;
  var y = x;
  x = 2;
  return [x, y, f()];
})(1)
view rawgistfile1.js hosted with ❤ by GitHub
 [2, 1, 1]
 [2, undefined, 1]
 [2, 1, 2]
 [2, undefined, 2]



Question,2
(function() {
  return [
    (() => this.x).bind({ x: 'inner' })(),
    (() => this.x)()
  ]
}).call({ x: 'outer' });
view rawgistfile1.js hosted with ❤ by GitHub
 ['inner', 'outer']
 ['outer', 'outer']
 [undefined, undefined]
 Error



Question,2
let x, { x: y = 1 } = { x }; y;
 undefined
 1
 { x: 1 }
 Error



Question,1
(function() {
  let f = this ? class g { } : class h { };
  return [
    typeof f,
    typeof h
  ];
})();
 ["function", "undefined"]
 ["function", "function"]
 ["undefined", "undefined"]
 Error



Question,2
(typeof (new (class { class () {} })))
 "function"
 "object"
 "undefined"
 Error



Question,3
typeof (new (class F extends (String, Array) { })).substring
 "function"
 "object"
 "undefined"
 Error



Question,2
[...[...'...']].length
 1
 3
 6
 Error



Question,4
typeof (function* f() { yield f })().next().next()
 "function"
 "generator"
 "object"
 Error



Question,4
typeof (new class f() { [f]() { }, f: { } })[\`\${f}\`]
 "function"
 "undefined"
 "object"
 Error



Question,2
typeof \`\${{Object}}\`.prototype
 "function"
 "undefined"
 "object"
 Error



Question,4
((...x, xs)=>x)(1,2,3)
 1
 3
 [1,2,3]
 Error



Question,4
let arr = [ ];
for (let { x = 2, y } of [{ x: 1 }, 2, { y }]) { 
  arr.push(x, y);
}
arr;
 [2, { x: 1 }, 2, 2, 2, { y }]
 [{ x: 1 }, 2, { y }]
 [1, undefined, 2, undefined, 2, undefined]
 Error



Question,4
(function() {
  if (false) {
    let f = { g() => 1 };
  }
  return typeof f;
})()
 "function"
 "undefined"
 "object"
 Error



Question,4
function job() {
    return new Promise((resolve, reject)=>reject());
}
let promise = job();
promise
.then(()=> console.log('S1'))
.then(()=> console.log('S2'))
.then(()=> console.log('S3'))
.catch(()=> console.log('E1'))
.then(()=> console.log('S4'));
 Error 1
 Success 1, Error 1
 Error 1, Success 1, Success 2, Success 3, Success 4
 Error 1, Success 4



Question,3
(function timer() {
  for (var i=0; i<=5; i++) {
    setTimeout(function clog() {console.log(i)}, i*1000);
  }
})();
 12345
 012345
 666666
 123456



Question,2
(function timer() {
  for (let i=0; i<=5; i++) {
    setTimeout(function clog() {console.log(i)}, i*1000);
  }
})();
 12345
 012345
 666666
 123456`
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
	return {question: qu,options: f,answer: answers[i]}
})
module.exports = ques