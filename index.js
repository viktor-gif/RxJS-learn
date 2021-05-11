function createSubscribe(name) {
  return {
    next(x) {
      console.log(name, ": ", x);
    },
    error(err) {
      console.log(name, ": ", err);
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
  .subscribe(createSubscribe("catchError"));

rxjs.interval(500).pipe(ops.take(3)).subscribe(createSubscribe("interval"));
