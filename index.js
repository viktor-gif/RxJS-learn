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

rxjs
  .range(10, 5) // начиная с 10(включительно) 5 элементов (10, 11, 12, 13, 14)
  .subscribe(createSubscribe("interval"));

// rxjs
//   .of([5, 3], 0, 5, "string", true, { name: "Vasya" })
//   .subscribe(createSubscribe("of"));

// rxjs.of([5, 3], 0, 5, "string", true, { name: "Vasya" }).subscribe(
//   (x) => console.log("Next: ", x),
//   (err) => console.log("Error: ", err),
//   () => console.log("Completed.")
// );
