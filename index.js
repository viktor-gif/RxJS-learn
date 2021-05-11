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

//буфферы нужны для того, чтобы временно сохранять какие-то значения

rxjs
  .interval(500)
  .pipe(
    // ops.buffer(rxjs.interval(2000),
    ops.bufferTime(2000),
    ops.take(3)
  )
  .subscribe(createSubscribe("buffer"));
