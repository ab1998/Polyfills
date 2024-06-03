console.log('Hello!');

// function like(video) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(`${video}`);
//     }, 1000);
//   });
// }

// function share(share) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(`${share}`);
//     }, 1000);
//   });
// }

// function subscribe(subscribe) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(`${subscribe}`);
//     }, 1000);
//   });
// }

// Promise.all([like('like'), share('share'), subscribe('subscribe')])
//   .then((res) => console.log(res))
//   .catch((err) => new Error(err));

// // const result = async () => {
// //   const message = await like('vide0');
// // };

// function promRecurse(funcPromises) {
//   if (funcPromises.length === 0) return;
//   const currPromise = funcPromises.shift();

//   currPromise.then((res) => console.log(res)).catch((err) => console.log(err));
//   promRecurse(funcPromises);
// }

// promRecurse([like('like'), share('share'), subscribe('subscribe')]);

Array.prototype.myMap = function (cb) {
  let newArr = [];
  for (let i = 0; i < this.length; i++) {
    newArr.push(cb(this[i], i, this));
  }
  return newArr;
};
Array.prototype.myFilter = function (cb) {
  let newArr = [];
  for (let i = 0; i < this.length; i++) {
    if (cb(this[i], i, this)) {
      newArr.push(this[i]);
    }
  }
  return newArr;
};
Array.prototype.myReduce = function (cb, init) {
  let acc = init;
  for (let i = 0; i < this.length; i++) {
    acc = acc ? cb(acc, this[i], i, this) : this[i];
  }
  return acc;
};
Array.prototype.myforEach = function (cb) {
  for (let i = 0; i < this.length; i++) {
    cb(this[i], i, this);
  }
};
Array.prototype.myPush = function (...elements) {
  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    if (element !== undefined && element !== null) {
      this[this.length] = element;
    }
  }
  return this;
};

let arr = [1, 2, 3];

let newArr = arr.myPush(3, 4, 5);
console.log(newArr);

Function.prototype.myBind = function (...args) {
  let params = args.slice(1);
  let obj = this;
  return function (...args2) {
    obj.apply(args[0], [...params, ...args2]);
  };
};

let obj = {
  fname: 'Abhi',
  age: '23',
};
function printInfo(city, state) {
  console.log(`${this.fname},${city},${state}`);
}
let info = printInfo.myBind(obj);
console.log(info('DEH', 'UT'));

//Once polyfill
function once(func, context) {
  let ran;
  return function () {
    if (func) {
      ran = func.apply(context || this, arguments);
      func = null;
    }
    return ran;
  };
}

const helloonce = once((a, b) => console.log('helloonce', a, b));
helloonce(1, 2);
helloonce();
helloonce();
helloonce();

//Debouce
function print() {
  console.log('Print Please...');
}
// const handleChange = debounce(print, 500);
// function debounce(fn, delay) {
//   let timer;
//   return function () {
//     let context = this;
//     args = arguments;
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       fn.apply(context, args);
//     }, delay);
//   };
// }

//Call polyfill
Function.prototype.mycall = function (context = {}, ...args) {
  if (typeof this !== 'function') {
    throw new Error(this + "It's not callable");
  }
  context.fn = this;
  context.fn(...args);
};

// let objnew = {
//   fname: 'Abhi',
//   age: '23',
// };
// function printInfoData(city, state) {
//   console.log(`${this.fname},${city},${state}`);
// }
// printInfoData.mycall(objnew, 'DEH', 'UT');
// console.log(info('DEH', 'UT'));

//Apply polyfill

Function.prototype.myapply = function (context = {}, args = []) {
  if (typeof this !== 'function') {
    throw new Error(this + "It's not callable");
  }
  if (!Array.isArray(args)) {
    throw new TypeError('Array Like Object');
  }
  context.fn = this;
  context.fn(...args);
};

let objnew = {
  fname: 'Abhi',
  age: '23',
};
function printInfoData(city, state) {
  console.log(`${this.fname},${city},${state}`);
}
printInfoData.myapply(objnew, ['DEH', 'UT']);

//Promise Polyfill

// function PromisePolyfill(executor) {
//   let onResolve;
//   let onReject;
//   let isFulfilled = false;
//   let isRejected = false;
//   let isCalled = false;
//   let value;

//   function resolve(val) {
//     isFulfilled = true;
//     value = val;
//     if (typeof onResolve === 'function') {
//       onResolve(val);
//       isCalled = true;
//     }
//   }
//   function reject(val) {
//     isRejected = true;
//     value = val;
//     if (typeof onReject === 'function') {
//       onReject(val);
//       isCalled = true;
//     }
//   }
//   this.then = function (callback) {
//     onResolve = callback;
//     if (isFulfilled && !isCalled) {
//       isCalled = true;
//       onResolve(value);
//     }
//     return this;
//   };
//   this.catch = function (callback) {
//     onReject = callback;
//     if (isRejected && !isCalled) {
//       isCalled = true;
//       onReject(value);
//     }
//     return this;
//   };
//   executor(resolve, reject);
// }

// const examplePromise = new PromisePolyfill((resolve, reject) => {
//   setTimeout(() => {
//     reject(2);
//   }, 1000);
// });

// examplePromise
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// function PromisePolyfill(executor) {
//   let onResolve;
//   let onReject;
//   let value;
//   let isFulfilled = false;
//   let isRejected = false;
//   let isCalled = false;

//   function resolve(val) {
//     isFulfilled = true;
//     value = val;
//     if (typeof onResolve === 'function') {
//       onResolve(val);
//       isCalled = true;
//     }
//   }
//   function reject(val) {
//     isRejected = true;
//     value = val;
//     if (typeof onReject === 'function') {
//       onReject(val);
//       isCalled = true;
//     }
//   }
//   this.then = function (callback) {
//     onResolve = callback;
//     if (isFulfilled && !isCalled) {
//       isCalled = true;
//       onResolve(value);
//     }
//     return this;
//   };
//   this.catch = function (callback) {
//     onReject = callback;
//     if (isRejected && !isCalled) {
//       isCalled = true;
//       onReject(value);
//     }
//     return this;
//   };

//   executor(resolve, reject);
// }

// const examplePromise = new PromisePolyfill((resolve, reject) => {
//   // setTimeout(() => {
//   resolve(2);
//   // }, 1000);
// });

// examplePromise
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

let btn = document.querySelector('.buttontrigger');
let inccount = document.querySelector('.button_pressed');
let inccountafterx = document.querySelector('.button_pressed_after');
let count = 0;
let countafterx = 0;
btn.addEventListener('click', function () {
  inccount.innerHTML = ++count;
  debouncecnt();
});
const debouncecnt = debounce(() => {
  inccountafterx.innerHTML = ++countafterx;
}, 500);
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    let context = this;
    // args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}

function throttle(fn, delay) {
  let flag = true;
  return function (...args) {
    let context = this;
    args = arguments;
    if (flag) {
      fn.apply(context, args);
      flag = false;
      setTimeout(() => {
        flag = true;
      }, delay);
    }
  };
}

// class User {
//   constructor(username, email, password) {
//     this.username = username;
//     this.email = email;
//     this.password = password;
//   }
//   encryptPassword() {
//     return `${this.password}abc`;
//   }
//   changeUserName() {
//     return `${this.username.toUpperCase()}`;
//   }
// }

// const newuserdata = new User('abhi', 'abc@gmail.com', 'abc');

//Behind the scenes

function User(username, email, password) {
  this.username = username;
  this.email = email;
  this.password = password;
}
User.prototype.encryptPassword = function () {
  return `${this.password}abc`;
};

Array.prototype.myPushArray = function (...elements) {
  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    this[this.length] = element;
  }
  return this;
};
let array = [1, 2, 3];
console.log(array.myPushArray(4, 5));

function myCustomPromise(executorfun) {
  let onResolve;
  let onReject;
  let isFulfilled = false;
  let isRejected = false;
  let value;
  let isCalled = false;

  function resolve(val) {
    isFulfilled = true;
    value = val;
    if (typeof onResolve === 'function') {
      onResolve(val);
      isCalled = true;
    }
  }
  function reject(val) {
    isRejected = true;
    value = val;
    if (typeof onReject === 'function') {
      onReject(val);
      isCalled = true;
    }
  }

  this.then = function (callback) {
    onResolve = callback;
    if (isFulfilled && !isCalled) {
      onResolve(value);
    }
    return this;
  };
  this.catch = function (callback) {
    onReject = callback;
    if (isRejected && !isCalled) {
      onReject(value);
    }
    return this;
  };
  executorfun(resolve, reject);
}

function onceMore(func, context) {
  let ran;
  return function () {
    if (func) {
      ran = func.apply(context || this, arguments);
      func = null;
    }
    return ran;
  };
}

Function.prototype.mycallfun = function (context = {}, ...args) {
  if (typeof this !== 'function') {
    throw new Error(this + "It's not callable");
  }
  context.fn = this;
  context.fn(...args);
};

Function.prototype.myapplyfun = function (context = {}, args = []) {
  if (typeof this !== 'function') {
    throw new Error(this + "It's not callable");
  }
  if (!Array.isArray(args)) {
    throw new TypeError('Array is expected');
  }
  context.fn = this;
  context.fn(...args);
};

Function.prototype.myBindFunc = function (...args) {
  let params = args.slice(1);
  let obj = this;
  return function (...args2) {
    obj.apply(args[0], [...params, ...args2]);
  };
};

function customDebounce(fn, delay) {
  let timer;
  return function (...args) {
    let context = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}

function customThrottle(fn, delay) {
  let flag = true;
  return function (...args) {
    let context = this;
    if (flag) {
      flag = false;
      fn.apply(context, args);
      setTimeout(() => {
        flag = true;
      }, delay);
    }
  };
}

function sum(a) {
  return function (b) {
    if (b) return sum(a + b);
    return a;
  };
}

function curry(func) {
  return function curriedfunction(...args) {
    if (args.length >= func.length) {
      return func(...args);
    } else {
      return function (...next) {
        return curriedfunction(...args, ...next);
      };
    }
  };
}

// Find Target in matrix
function findTarget(matrix, target) {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      if (matrix[i][j] === target) {
        return true;
      } else {
        return false;
      }
    }
  }
}

let matrix = [
  [1, 3, 5, 7],
  [10, 11, 16, 20],
  [23, 30, 34, 60],
];

console.log(findTarget(matrix, 15));

//find 3 consecutive elements in an array whose sum is equal to the given target in javascript

function consecutiveSum(sumArr, target) {
  for (let i = 0; i < sumArr.length - 2; i++) {
    const sum = sumArr[i] + sumArr[i + 1] + sumArr[i + 2];
    if (sum === target) {
      return [sumArr[i], sumArr[i + 1], sumArr[i + 2]];
    }
  }
  return null;
}

let sumArr = [1, 2, 3, 4, 5, 6, 7];
const result = consecutiveSum(sumArr, 12);
console.log(result);

function findLargest(largeArray) {
  let large = largeArray[0];
  for (let i = 0; i < largeArray.length; i++) {
    if (large < largeArray[i]) {
      large = largeArray[i];
    }
  }
  return large;
}

let largeArray = [10, 7, 11, 13, 16, 100];
console.log(findLargest(largeArray));

//Check if array is sorted

function checkSort(sortArray) {
  for (let i = 1; i < sortArray.length; i++) {
    if (sortArray[i] < sortArray[i - 1]) {
      return false;
    }
  }
  return true;
}
let sortArray = [1, 2, 3, 4, 5];
console.log(checkSort(sortArray));

//Left rotate array by 1

function leftRotate(leftArray, n) {
  let temp = leftArray[0];
  for (let i = 0; i < n; i++) {
    leftArray[i] = leftArray[i + 1];
  }
  leftArray[n - 1] = temp;
  return leftArray;
}

let leftArray = [1, 2, 3, 4, 5];
console.log(leftRotate(leftArray, 5));

//Right rotate array by D places

function rotate(nums, k) {
  k %= nums.length;

  const rotated = [];
  for (let i = 0; i < nums.length; i++) {
    rotated[(i + k) % n] = nums[i];
  }

  for (let i = 0; i < nums.length; i++) {
    nums[i] = rotated[i];
  }
  return nums;
}

let rotateArray = [1, 2, 3, 4, 5];
console.log(rotate(rotateArray, 2));

//Move zeros to end

// function moveZeros(nums) {
//   let temparr = [];
//   for (let i = 0; i < nums.length; i++) {
//     if (nums[i] !== 0) {
//       temparr.push(nums[i]);
//     }
//   }

//   for (let i = 0; i < temparr.length; i++) {
//     nums[i] = temparr[i];
//   }
//   for (let i = templength; i < nums.length; i++) {
//     nums[i] = 0;
//   }
//   return nums;
// }

// let nums = [1, 0, 3, 4, 0, 5];
// console.log(moveZeros(nums, 2));

//Longest Subarray with given Sum K(Positives)

function getLongestSubarray(a, k) {
  let len = 0;
  for (let i = 0; i < a.length; i++) {
    // starting index
    let s = 0; // Sum variable
    for (let j = i; j < a.length; j++) {
      // ending index
      // add the current element to
      // the subarray a[i...j-1]
      s += a[j];

      if (s === k) len = Math.max(len, j - i + 1);
    }
  }
  return len;
}

function rotateLeft(arrrotate) {
  let temp = arrrotate[0];
  for (let i = 0; i < arrrotate.length; i++) {
    arrrotate[i] = arrrotate[i + 1];
  }
  arrrotate[arrrotate.length - 1] = temp;
  return arrrotate;
}

let arrrotate = [1, 2, 3, 4, 5];
console.log(rotateLeft(arrrotate));

function moveZeros(zeroarray) {
  let temp = [];
  for (let i = 0; i < zeroarray.length; i++) {
    if (zeroarray[i] !== 0) {
      temp.push(zeroarray[i]);
    }
  }
  for (let i = 0; i < temp.length; i++) {
    zeroarray[i] = temp[i];
  }
  for (let i = temp.length; i < zeroarray.length; i++) {
    zeroarray[i] = 0;
  }
  return zeroarray;
}
let zeroarray = [1, 2, 0, 4, 0, 5, 6, 0, 7];
console.log(moveZeros(zeroarray));

function myMemoize(fn, context) {
  const res = {};
  return function (...args) {
    var argsCache = JSON.stringify(args);
    if (!res[argsCache]) {
      // if we do not have arguments, then we will calculate result for that function
      res[argsCache] = fn.call(context || this, ...args);
    }
    return res[argsCache];
  };
}
const clumsysquare = (num1, num2) => {
  for (let i = 1; i <= 100000000; i++) {}
  return num1 * num2;
};
console.time('First call');
console.log(clumsysquare(9467, 7649));
console.timeEnd('First call');
console.time('Second call');
console.log(clumsysquare(9467, 7649));
console.timeEnd('Second call');
