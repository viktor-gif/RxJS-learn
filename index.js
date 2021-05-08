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
  .fromEvent(document.querySelector("input"), "keyup")
  .pipe(
    ops.map((x) => x.target.value),
    // ops.pluck("target", "value"),
    // pluck выше делает то же, что и ops.map((x) => x.target.value)
    ops.map((x) => x.toUpperCase()),
    ops.map((x) => {
      return {
        value: x,
        length: x.length,
      };
    })
  )
  .subscribe(createSubscribe("map"));
