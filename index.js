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

// совмещение разных стримов в один стрим

let promise = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data + " wish you good luck!");
    }, 2000);
  });
};

rxjs
  .of("WFM")
  .pipe(ops.mergeMap((x) => promise(x)))
  .subscribe(createSubscribe("promeise"));
