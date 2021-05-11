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
  .interval(1000)
  .pipe(
    ops.buffer(rxjs.fromEvent(document, "click")),
    ops.map((x) => x.length)
  )
  .subscribe(createSubscribe("buffer"));
