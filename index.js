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

const subject$ = new rxjs.AsyncSubject();

subject$.next(1);
subject$.next("wfm");
subject$.complete();

subject$.subscribe(createSubscribe("async"));
