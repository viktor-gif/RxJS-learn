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
  .of(1, 5, "Hello", "world")
  .pipe(
    ops.find((x) => {
      if (typeof x === "string") {
        return x.toLowerCase() === "hello";
      }
    })
    // ops.first()
    // ops.last()
  )
  .subscribe(createSubscribe("find"));
