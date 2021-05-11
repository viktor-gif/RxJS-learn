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

rxjs
  .range(1, 3)
  .pipe(
    ops.delay(2000), //задержка стрима
    ops.map((x) => x * x)
  )
  .subscribe(createSubscribe("delay"));

// rxjs
//   .range(1, 3)
//   .pipe(
//     ops.tap((x) => console.log("Before: ", x)),
//     ops.map((x) => x * x),
//     ops.tap((x) => console.log("After: ", x))
//   )
//   .subscribe(createSubscribe("tap"));

// rxjs
//   .from([1, 2, 3, 4, 5])
//   .pipe(
//     ops.map((x) => x * 2),
//     ops.every((x) => x % 2 === 0) //выдаст значение "true / false"
//   )
//   .subscribe(createSubscribe("every"));

// rxjs
//   .of(231)
//   .pipe(ops.defaultIfEmpty("I am en empty stream"))
//   .subscribe(createSubscribe("defaultIfEmpty"));
