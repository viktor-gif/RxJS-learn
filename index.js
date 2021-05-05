// let button = document.querySelector("button");
// console.log(rxjs);
// let btn$ = rxjs.Observable.fromEvent(button, "click");

// console.log(btn$);

// btn$._subscribe(function (e) {
//   console.log(e);
// });

let button = document.querySelector("button");

let btn$ = rxjs.fromEvent(button, "click");

btn$.subscribe(function (e) {
  console.log(e);
});

rxjs
  .fromEvent(document.querySelector("input"), "keyup")
  .subscribe((e) => console.log(e));

rxjs.fromEvent(document, "mousemove").subscribe((e) => {
  document.querySelector("h1").innerHTML = `X: ${e.clientX}, Y: ${e.clientY}`;
});

// let s$ = rxjs.Observable.create(function (observer) {
//   observer.next("One");

//   setTimeout(function () {
//     observer.next("After 5 seconds!");
//   }, 5000);

//   setTimeout(function () {
//     observer.next("After 3 seconds!");
//   }, 3000);

//   setTimeout(function () {
//     observer.next("After 2 seconds!");
//   }, 2000);
//   observer.next("Two");
// });

// s$.subscribe(function (data) {
//   console.log("subscribe: ", data);
// });
