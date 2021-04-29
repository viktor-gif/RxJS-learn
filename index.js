let stream$ = rxjs.Observable.create(function (observer) {
  console.log("Stream was created");
  observer.next("One");

  setTimeout(function () {
    observer.error("Something went wrong!");
  }, 5000);
  setTimeout(function () {
    // observer.complete();
  }, 3000);
  setTimeout(function () {
    observer.next("After 2 seconds!");
  }, 2000);
  //   observer.complete();
  observer.next("Two");
});

stream$.subscribe(
  function (data) {
    console.log("subscribe: ", data);
  },
  function (error) {
    console.log("Error: ", error);
  },
  function () {
    console.log("Completed!");
  }
);
