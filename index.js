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
    ops.map((e) => e.target.value),
    ops.debounceTime(1000), //задержка между действиями
    ops.distinct() //запрещает действия, если значение не изменилось
  )
  .subscribe(createSubscribe("debounceTime"));
