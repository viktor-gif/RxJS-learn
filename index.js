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
  .of("Hello")
  .pipe(
    ops.mergeMap((x) => {
      return rxjs.of(x + " world");
    })
  )
  .subscribe(createSubscribe("mergeMap"));

// rxjs.of("Hello").subscribe((x) => {
//   rxjs.of(x + " world!").subscribe(createSubscribe("mergeMap"));
// });
