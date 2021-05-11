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

rxjs
  .range(1, 10)
  .pipe(
    ops.concatMap((x, i) => {
      //i - это индекс
      return rxjs.interval(100).pipe(
        ops.take(x),
        ops.map((q) => i)
      );
    })
  )
  .subscribe(createSubscribe("concatMap"));
