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

const cars = [
  { name: "audi", price: 500 },
  { name: "bmv", price: 400 },
  { name: "ford", price: 450 },
];

rxjs
  .fromEvent(document.querySelector("input"), "keyup")
  .pipe(ops.map((e) => e.target.value))

  .subscribe((x) => {
    rxjs
      .from(cars)
      .pipe(ops.filter((c) => c.name === x))
      .subscribe((v) => {
        document.querySelector(
          "div"
        ).innerHTML = `<h2>${v.name.toUpperCase()}</h2><h4>${v.price}</h4>`;
      });
  });

// rxjs
//   .range(0, 10)
//   .pipe(ops.filter((x) => x > 3))
//   .subscribe(createSubscribe("filter"));
