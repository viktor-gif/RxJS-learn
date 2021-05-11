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

const s1$ = rxjs.throwError(new Error("Что-то пошло не так!"));
const s2$ = rxjs.interval(500).pipe(ops.take(2));

s1$
  .pipe(ops.onErrorResumeNext(s2$))
  .subscribe(createSubscribe("onErrorResumeNext"));
