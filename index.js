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

const ops = rxjs.operators;

// rxjs
//   .interval(500)
//   .pipe(
//     ops.skipWhile((x) => x < 5),
//     ops.takeWhile((x) => x < 12)
//   )
//   .subscribe(createSubscribe("skipWhile"));

rxjs
  .interval(500)
  .pipe(ops.skipUntil(rxjs.timer(3000)), ops.takeUntil(rxjs.timer(5000)))
  .subscribe(createSubscribe("skipWhile"));
