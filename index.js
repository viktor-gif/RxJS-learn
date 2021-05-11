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
  .from([99, 1, 2, 3, 3, 3, 5, 5, 1, 1, 99, 99, 2, 4, 6])
  .pipe(ops.distinctUntilChanged())
  .subscribe(createSubscribe("from"));
