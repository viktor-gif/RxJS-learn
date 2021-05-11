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
  .range(0, 40)
  .pipe(ops.bufferCount(10))
  .subscribe(createSubscribe("buffer"));
