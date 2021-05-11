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

const s1$ = rxjs.interval(1000).pipe(ops.map((x) => "Stream 1: " + x));
const s2$ = rxjs.interval(500).pipe(ops.map((x) => "Stream 2: " + x));

rxjs.merge(s1$, s2$).pipe(ops.take(12)).subscribe(createSubscribe("merge"));
