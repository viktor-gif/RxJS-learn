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
  .throwError(new Error("Что-то пошло не так!"))
  .pipe(ops.catchError((error) => rxjs.of(error)))
  .subscribe((x) => console.log("X: ", x));

rxjs.interval(500).pipe(ops.take(3)).subscribe(createSubscribe("interval"));
