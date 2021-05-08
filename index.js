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
//   .of(1, 5, "Hello", "world")
//   .pipe(
//     ops.skipWhile((x) => {
//       return typeof x === "number";
//     })
//   )
//   .subscribe(createSubscribe("findIndex"));

rxjs
  .interval(500)
  .pipe(
    ops.skipWhile((x) => x < 5),
    ops.takeWhile((x) => x < 12)
  )
  .subscribe(createSubscribe("skipWhile"));
