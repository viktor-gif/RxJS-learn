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

const subject$ = new rxjs.ReplaySubject(2);

subject$.next(1);
subject$.next(2);
subject$.next(3);
subject$.next(4);
subject$.complete();

subject$.subscribe(createSubscribe("replay"));
