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

// const s1$ = rxjs.from([1, 2, 3]);
// const s2$ = rxjs.from([4, 5, 6]);
// rxjs.concat(s1$, s2$).subscribe(createSubscribe("concat"));

const s1$ = rxjs
  .range(1, 3)
  .pipe(
    ops.map((x) => rxjs.range(x, 3)),
    ops.concatAll()
  )
  .subscribe(createSubscribe("concatAll"));
