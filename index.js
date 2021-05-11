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
const int$ = new rxjs.interval(1000);

int$.subscribe(subject$);

subject$.subscribe(createSubscribe("subject 1"));
subject$.subscribe(createSubscribe("subject 2"));
setTimeout(() => subject$.subscribe(createSubscribe("subject 3")), 2000);
