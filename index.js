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

rxjs
  .of(1, 5, "Hello", "world")
  .pipe(
    ops.skip(2)
    // ops.findIndex((x) => x === 5),
    // ops.take(3)
  )
  .subscribe(createSubscribe("findIndex"));
