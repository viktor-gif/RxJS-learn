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

// совмещение разных стримов в один стрим

const t1$ = rxjs.timer(1000, 2000);
const t2$ = rxjs.timer(2000, 2000);
const t3$ = rxjs.timer(3000, 2000);
const t4$ = rxjs.timer(4000, 2000);

rxjs
  .combineLatest(t1$, t2$, t3$, t4$)
  .pipe(ops.take(10))
  .subscribe(createSubscribe("combineLatest"));

// const int1$ = rxjs.interval(1000);
// const int2$ = rxjs.interval(500);
// int1$
//   .pipe(ops.take(5), ops.withLatestFrom(int2$))
//   .subscribe(createSubscribe("withLatestFrom"));
