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

const s1$ = rxjs.of("Hello ");
const s2$ = rxjs.of("world");

// rxjs.merge(s1$, s2$).subscribe(createSubscribe("merge"));
s1$.pipe(ops.merge(s2$)).subscribe(createSubscribe("merge"));
