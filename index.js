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
  .of("hello", "my", "friends")
  .pipe(ops.map((x) => x[0].toUpperCase() + x.slice(1)))
  .subscribe(createSubscribe("map"));

rxjs
  .interval(1000)
  .pipe(
    ops.map((x) => x * x),
    ops.take(5)
  )
  .subscribe(createSubscribe("map"));
