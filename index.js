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

const interval$ = rxjs.interval(1000);
rxjs
  .zip(interval$, interval$.pipe(ops.take(3)), rxjs.of("wmf"))
  //take(3) - выдаст 3 значения, of('wmf') - выдаст одно значение
  .subscribe(createSubscribe("zip"));

// const s1$ = rxjs.of("Hello");
// const s2$ = rxjs.of("World");

// rxjs.zip(s1$, s2$.pipe(ops.delay(5000))).subscribe(createSubscribe("zip"));
