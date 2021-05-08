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

const map = new Map([
  [1, 2],
  [3, 4],
  [5, 6],
]);
rxjs.from(map).subscribe(createSubscribe("from"));

// const set = new Set([1, 2, 3, "f", "str", { id: 6 }]);
// rxjs.from(set).subscribe(createSubscribe("from"));

// const arr = [
//   { id: 1, name: "Viktor" },
//   { id: 2, name: "Vasia" },
// ];
// rxjs.from(arr).subscribe(createSubscribe("from"));

// rxjs.from([1, 2, 3, 4, 5]).subscribe(createSubscribe("from"));
