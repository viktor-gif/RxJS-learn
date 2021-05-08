function createSubscribe(name) {
  return {
    next(x) {
      console.log(name, ": ", x);
    },
    error(err) {
      console.log("Error: ", err);
    },
    complete() {
      console.log(name, ": Completed.");
    },
  };
}
console.log(rxjs.interval(400));
rxjs
  .interval(400)
  .pipe(rxjs.operators.take(10))
  .subscribe(createSubscribe("interval"));

// rxjs
//   .of([5, 3], 0, 5, "string", true, { name: "Vasya" })
//   .subscribe(createSubscribe("of"));

// rxjs.of([5, 3], 0, 5, "string", true, { name: "Vasya" }).subscribe(
//   (x) => console.log("Next: ", x),
//   (err) => console.log("Error: ", err),
//   () => console.log("Completed.")
// );
