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

const subject$ = new rxjs.BehaviorSubject("wfm");

subject$.subscribe(createSubscribe("behavior"));
subject$.next("Hello");
