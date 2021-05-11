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

const subject$ = new rxjs.Subject();

subject$.subscribe(createSubscribe("subject"));

setTimeout(() => {
  subject$.next(3);
  subject$.complete();
}, 3000);
subject$.next(1);
subject$.next(2);
