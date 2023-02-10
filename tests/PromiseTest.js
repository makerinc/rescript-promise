// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Test = require("./Test.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Js_exn = require("bs-platform/lib/js/js_exn.js");
var $$Promise = require("../src/Promise.js");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Caml_exceptions = require("bs-platform/lib/js/caml_exceptions.js");

var TestError = Caml_exceptions.create("PromiseTest.TestError");

var fail = Js_exn.raiseError;

var equal = Caml_obj.caml_equal;

function resolveTest(param) {
  Promise.resolve("test").then(function (str) {
        Test.run([
              [
                "PromiseTest.res",
                17,
                26,
                47
              ],
              "Should resolve test"
            ], str, equal, "test");
        return Promise.resolve(undefined);
      });
  
}

function runTests(param) {
  return resolveTest(undefined);
}

var Creation = {
  resolveTest: resolveTest,
  runTests: runTests
};

function testThen(param) {
  return Promise.resolve(1).then(function (first) {
                return Promise.resolve(first + 1 | 0);
              }).then(function (value) {
              Test.run([
                    [
                      "PromiseTest.res",
                      39,
                      26,
                      39
                    ],
                    "Should be 2"
                  ], value, equal, 2);
              return Promise.resolve(undefined);
            });
}

function testInvalidThen(param) {
  return $$Promise.$$catch(Promise.resolve(1).then(function (first) {
                    return Promise.resolve(Promise.resolve(first + 1 | 0));
                  }).then(function (p) {
                  p.then(function (value) {
                        Test.run([
                              [
                                "PromiseTest.res",
                                55,
                                28,
                                41
                              ],
                              "Should be 2"
                            ], value, equal, 2);
                        return Promise.resolve(undefined);
                      });
                  return Promise.resolve(undefined);
                }), (function (e) {
                var ret = e.RE_EXN_ID === $$Promise.JsError ? e._1.message === "p.then is not a function" : false;
                Test.run([
                      [
                        "PromiseTest.res",
                        66,
                        26,
                        60
                      ],
                      "then should have thrown an error"
                    ], ret, equal, true);
                return Promise.resolve(undefined);
              }));
}

function testThenResolve(param) {
  return Promise.resolve(1).then(function (num) {
                return num + 1 | 0;
              }).then(function (ret) {
              return Test.run([
                          [
                            "PromiseTest.res",
                            79,
                            26,
                            39
                          ],
                          "Should be 2"
                        ], ret, equal, 2);
            });
}

function testInvalidThenResolve(param) {
  return $$Promise.$$catch(Promise.resolve(1).then(function (num) {
                    return Promise.resolve(num);
                  }).then(function (p) {
                  p.then(function (num) {
                        return num + 1 | 0;
                      });
                  return Promise.resolve(undefined);
                }), (function (e) {
                var ret = e.RE_EXN_ID === $$Promise.JsError ? e._1.message === "p.then is not a function" : false;
                Test.run([
                      [
                        "PromiseTest.res",
                        105,
                        26,
                        60
                      ],
                      "then should have thrown an error"
                    ], ret, equal, true);
                return Promise.resolve(undefined);
              }));
}

function runTests$1(param) {
  testThen(undefined);
  testInvalidThen(undefined);
  testThenResolve(undefined);
  testInvalidThenResolve(undefined);
  
}

var ThenChaining = {
  testThen: testThen,
  testInvalidThen: testInvalidThen,
  testThenResolve: testThenResolve,
  testInvalidThenResolve: testInvalidThenResolve,
  runTests: runTests$1
};

function testExnRejection(param) {
  $$Promise.$$catch(Promise.reject({
            RE_EXN_ID: TestError,
            _1: "oops"
          }), (function (e) {
          Test.run([
                [
                  "PromiseTest.res",
                  127,
                  26,
                  30
                ],
                "Expect rejection to contain a TestError"
              ], e, equal, {
                RE_EXN_ID: TestError,
                _1: "oops"
              });
          return Promise.resolve(undefined);
        }));
  
}

function runTests$2(param) {
  testExnRejection(undefined);
  
}

var Rejection = {
  testExnRejection: testExnRejection,
  runTests: runTests$2
};

var asyncParseFail = (function() {
    return new Promise((resolve) => {
      var result = JSON.parse("{..");
      return resolve(result);
    })
  });

function testExternalPromiseThrow(param) {
  return $$Promise.$$catch(Curry._1(asyncParseFail, undefined).then(function (param) {
                  return Promise.resolve(undefined);
                }), (function (e) {
                var success = e.RE_EXN_ID === $$Promise.JsError ? Caml_obj.caml_equal(e._1.message, "Unexpected token . in JSON at position 1") : false;
                Test.run([
                      [
                        "PromiseTest.res",
                        161,
                        26,
                        76
                      ],
                      "Should be a parser error with Unexpected token ."
                    ], success, equal, true);
                return Promise.resolve(undefined);
              }));
}

function testExnThrow(param) {
  return $$Promise.$$catch(Promise.resolve(undefined).then(function (param) {
                  throw {
                        RE_EXN_ID: TestError,
                        _1: "Thrown exn",
                        Error: new Error()
                      };
                }), (function (e) {
                var isTestErr = e.RE_EXN_ID === TestError && e._1 === "Thrown exn" ? true : false;
                Test.run([
                      [
                        "PromiseTest.res",
                        180,
                        26,
                        49
                      ],
                      "Should be a TestError"
                    ], isTestErr, equal, true);
                return Promise.resolve(undefined);
              }));
}

function testRaiseErrorThrow(param) {
  return $$Promise.$$catch(Promise.resolve(undefined).then(function (param) {
                  return Js_exn.raiseError("Some JS error");
                }), (function (e) {
                var isTestErr = e.RE_EXN_ID === $$Promise.JsError ? Caml_obj.caml_equal(e._1.message, "Some JS error") : false;
                Test.run([
                      [
                        "PromiseTest.res",
                        203,
                        26,
                        51
                      ],
                      "Should be some JS error"
                    ], isTestErr, equal, true);
                return Promise.resolve(undefined);
              }));
}

function thenAfterCatch(param) {
  return $$Promise.$$catch(Promise.resolve(undefined).then(function (param) {
                    return Promise.reject({
                                RE_EXN_ID: TestError,
                                _1: "some rejected value"
                              });
                  }), (function (e) {
                  var tmp;
                  tmp = e.RE_EXN_ID === TestError && e._1 === "some rejected value" ? "success" : "not a test error";
                  return Promise.resolve(tmp);
                })).then(function (msg) {
              Test.run([
                    [
                      "PromiseTest.res",
                      226,
                      26,
                      45
                    ],
                    "Should be success"
                  ], msg, equal, "success");
              return Promise.resolve(undefined);
            });
}

function testCatchFinally(param) {
  var wasCalled = {
    contents: false
  };
  $$Promise.$$catch(Promise.resolve(5).then(function (param) {
                  return Promise.reject({
                              RE_EXN_ID: TestError,
                              _1: "test"
                            });
                }).then(function (v) {
                return Promise.resolve(v);
              }), (function (param) {
              return Promise.resolve(undefined);
            })).finally(function (param) {
          wasCalled.contents = true;
          
        }).then(function (v) {
        Test.run([
              [
                "PromiseTest.res",
                248,
                26,
                48
              ],
              "value should be unit"
            ], v, equal, undefined);
        Test.run([
              [
                "PromiseTest.res",
                249,
                26,
                59
              ],
              "finally should have been called"
            ], wasCalled.contents, equal, true);
        return Promise.resolve(undefined);
      });
  
}

function testResolveFinally(param) {
  var wasCalled = {
    contents: false
  };
  Promise.resolve(5).then(function (v) {
            return Promise.resolve(v + 5 | 0);
          }).finally(function (param) {
          wasCalled.contents = true;
          
        }).then(function (v) {
        Test.run([
              [
                "PromiseTest.res",
                266,
                26,
                45
              ],
              "value should be 5"
            ], v, equal, 10);
        Test.run([
              [
                "PromiseTest.res",
                267,
                26,
                59
              ],
              "finally should have been called"
            ], wasCalled.contents, equal, true);
        return Promise.resolve(undefined);
      });
  
}

function runTests$3(param) {
  testExternalPromiseThrow(undefined);
  testExnThrow(undefined);
  testRaiseErrorThrow(undefined);
  thenAfterCatch(undefined);
  testCatchFinally(undefined);
  testResolveFinally(undefined);
  
}

var Catching = {
  asyncParseFail: asyncParseFail,
  testExternalPromiseThrow: testExternalPromiseThrow,
  testExnThrow: testExnThrow,
  testRaiseErrorThrow: testRaiseErrorThrow,
  thenAfterCatch: thenAfterCatch,
  testCatchFinally: testCatchFinally,
  testResolveFinally: testResolveFinally,
  runTests: runTests$3
};

function testParallel(param) {
  var place = {
    contents: 0
  };
  var delayedMsg = function (ms, msg) {
    return new Promise((function (resolve, param) {
                  setTimeout((function (param) {
                          place.contents = place.contents + 1 | 0;
                          return resolve([
                                      place.contents,
                                      msg
                                    ]);
                        }), ms);
                  
                }));
  };
  var p1 = delayedMsg(1000, "is Anna");
  var p2 = delayedMsg(500, "myName");
  var p3 = delayedMsg(100, "Hi");
  return Promise.all([
                p1,
                p2,
                p3
              ]).then(function (arr) {
              var exp = [
                [
                  3,
                  "is Anna"
                ],
                [
                  2,
                  "myName"
                ],
                [
                  1,
                  "Hi"
                ]
              ];
              Test.run([
                    [
                      "PromiseTest.res",
                      304,
                      26,
                      55
                    ],
                    "Should have correct placing"
                  ], arr, equal, exp);
              return Promise.resolve(undefined);
            });
}

function testRace(param) {
  var racer = function (ms, name) {
    return new Promise((function (resolve, param) {
                  setTimeout((function (param) {
                          return resolve(name);
                        }), ms);
                  
                }));
  };
  var promises = [
    racer(1000, "Turtle"),
    racer(500, "Hare"),
    racer(100, "Eagle")
  ];
  return Promise.race(promises).then(function (winner) {
              Test.run([
                    [
                      "PromiseTest.res",
                      323,
                      26,
                      44
                    ],
                    "Eagle should win"
                  ], winner, equal, "Eagle");
              return Promise.resolve(undefined);
            });
}

function testParallel2(param) {
  var place = {
    contents: 0
  };
  var delayedMsg = function (ms, msg) {
    return new Promise((function (resolve, param) {
                  setTimeout((function (param) {
                          place.contents = place.contents + 1 | 0;
                          return resolve([
                                      place.contents,
                                      msg
                                    ]);
                        }), ms);
                  
                }));
  };
  var p1 = delayedMsg(1000, "is Anna");
  var p2 = delayedMsg(500, "myName");
  return Promise.all([
                p1,
                p2
              ]).then(function (arr) {
              Test.run([
                    [
                      "PromiseTest.res",
                      347,
                      26,
                      55
                    ],
                    "Should have correct placing"
                  ], arr, equal, [
                    [
                      2,
                      "is Anna"
                    ],
                    [
                      1,
                      "myName"
                    ]
                  ]);
              return Promise.resolve(undefined);
            });
}

function testParallel3(param) {
  var place = {
    contents: 0
  };
  var delayedMsg = function (ms, msg) {
    return new Promise((function (resolve, param) {
                  setTimeout((function (param) {
                          place.contents = place.contents + 1 | 0;
                          return resolve([
                                      place.contents,
                                      msg
                                    ]);
                        }), ms);
                  
                }));
  };
  var p1 = delayedMsg(1000, "is Anna");
  var p2 = delayedMsg(500, "myName");
  var p3 = delayedMsg(100, "Hi");
  return Promise.all([
                p1,
                p2,
                p3
              ]).then(function (arr) {
              Test.run([
                    [
                      "PromiseTest.res",
                      372,
                      26,
                      55
                    ],
                    "Should have correct placing"
                  ], arr, equal, [
                    [
                      3,
                      "is Anna"
                    ],
                    [
                      2,
                      "myName"
                    ],
                    [
                      1,
                      "Hi"
                    ]
                  ]);
              return Promise.resolve(undefined);
            });
}

function testParallel4(param) {
  var place = {
    contents: 0
  };
  var delayedMsg = function (ms, msg) {
    return new Promise((function (resolve, param) {
                  setTimeout((function (param) {
                          place.contents = place.contents + 1 | 0;
                          return resolve([
                                      place.contents,
                                      msg
                                    ]);
                        }), ms);
                  
                }));
  };
  var p1 = delayedMsg(1500, "Anna");
  var p2 = delayedMsg(1000, "is");
  var p3 = delayedMsg(500, "my name");
  var p4 = delayedMsg(100, "Hi");
  return Promise.all([
                p1,
                p2,
                p3,
                p4
              ]).then(function (arr) {
              Test.run([
                    [
                      "PromiseTest.res",
                      398,
                      26,
                      55
                    ],
                    "Should have correct placing"
                  ], arr, equal, [
                    [
                      4,
                      "Anna"
                    ],
                    [
                      3,
                      "is"
                    ],
                    [
                      2,
                      "my name"
                    ],
                    [
                      1,
                      "Hi"
                    ]
                  ]);
              return Promise.resolve(undefined);
            });
}

function testParallel5(param) {
  var place = {
    contents: 0
  };
  var delayedMsg = function (ms, msg) {
    return new Promise((function (resolve, param) {
                  setTimeout((function (param) {
                          place.contents = place.contents + 1 | 0;
                          return resolve([
                                      place.contents,
                                      msg
                                    ]);
                        }), ms);
                  
                }));
  };
  var p1 = delayedMsg(1500, "Anna");
  var p2 = delayedMsg(1000, "is");
  var p3 = delayedMsg(500, "name");
  var p4 = delayedMsg(100, "my");
  var p5 = delayedMsg(50, "Hi");
  return Promise.all([
                p1,
                p2,
                p3,
                p4,
                p5
              ]).then(function (arr) {
              Test.run([
                    [
                      "PromiseTest.res",
                      425,
                      26,
                      55
                    ],
                    "Should have correct placing"
                  ], arr, equal, [
                    [
                      5,
                      "Anna"
                    ],
                    [
                      4,
                      "is"
                    ],
                    [
                      3,
                      "name"
                    ],
                    [
                      2,
                      "my"
                    ],
                    [
                      1,
                      "Hi"
                    ]
                  ]);
              return Promise.resolve(undefined);
            });
}

function testParallel6(param) {
  var place = {
    contents: 0
  };
  var delayedMsg = function (ms, msg) {
    return new Promise((function (resolve, param) {
                  setTimeout((function (param) {
                          place.contents = place.contents + 1 | 0;
                          return resolve([
                                      place.contents,
                                      msg
                                    ]);
                        }), ms);
                  
                }));
  };
  var p1 = delayedMsg(1500, "Anna");
  var p2 = delayedMsg(1000, "is");
  var p3 = delayedMsg(500, "name");
  var p4 = delayedMsg(100, "my");
  var p5 = delayedMsg(50, ", ");
  var p6 = delayedMsg(10, "Hi");
  return Promise.all([
                p1,
                p2,
                p3,
                p4,
                p5,
                p6
              ]).then(function (arr) {
              Test.run([
                    [
                      "PromiseTest.res",
                      453,
                      26,
                      55
                    ],
                    "Should have correct placing"
                  ], arr, equal, [
                    [
                      6,
                      "Anna"
                    ],
                    [
                      5,
                      "is"
                    ],
                    [
                      4,
                      "name"
                    ],
                    [
                      3,
                      "my"
                    ],
                    [
                      2,
                      ", "
                    ],
                    [
                      1,
                      "Hi"
                    ]
                  ]);
              return Promise.resolve(undefined);
            });
}

function testAllSettled(param) {
  var place = {
    contents: 0
  };
  var delayedMsg = function (ms, msg, shouldResolve) {
    return new Promise((function (resolve, reject) {
                  setTimeout((function (param) {
                          place.contents = place.contents + 1 | 0;
                          if (shouldResolve) {
                            return resolve([
                                        place.contents,
                                        msg
                                      ]);
                          } else {
                            return reject({
                                        RE_EXN_ID: TestError,
                                        _1: "oops"
                                      });
                          }
                        }), ms);
                  
                }));
  };
  var p1 = delayedMsg(1000, "is Anna", true);
  var p2 = delayedMsg(500, "myName", false);
  var p3 = delayedMsg(100, "Hi", true);
  return $$Promise.allSettled([
                p1,
                p2,
                p3
              ]).then(function (arr) {
              var exp = [
                {
                  TAG: /* Fulfilled */0,
                  _0: [
                    3,
                    "is Anna"
                  ]
                },
                {
                  TAG: /* Rejected */1,
                  _0: {
                    RE_EXN_ID: TestError,
                    _1: "oops"
                  }
                },
                {
                  TAG: /* Fulfilled */0,
                  _0: [
                    1,
                    "Hi"
                  ]
                }
              ];
              console.log("got arr settled: ", arr);
              console.log("got exp: ", exp);
              console.log("is ok ? ", Caml_obj.caml_equal(arr, exp));
              Test.run([
                    [
                      "PromiseTest.res",
                      483,
                      26,
                      55
                    ],
                    "Should have correct placing"
                  ], arr, equal, exp);
              return Promise.resolve(undefined);
            });
}

function runTests$4(param) {
  testParallel(undefined);
  testRace(undefined);
  testParallel2(undefined);
  testParallel3(undefined);
  testParallel4(undefined);
  testParallel5(undefined);
  testParallel6(undefined);
  testAllSettled(undefined);
  
}

var Concurrently = {
  testParallel: testParallel,
  testRace: testRace,
  testParallel2: testParallel2,
  testParallel3: testParallel3,
  testParallel4: testParallel4,
  testParallel5: testParallel5,
  testParallel6: testParallel6,
  testAllSettled: testAllSettled,
  runTests: runTests$4
};

resolveTest(undefined);

runTests$1(undefined);

testExnRejection(undefined);

runTests$3(undefined);

runTests$4(undefined);

exports.TestError = TestError;
exports.fail = fail;
exports.equal = equal;
exports.Creation = Creation;
exports.ThenChaining = ThenChaining;
exports.Rejection = Rejection;
exports.Catching = Catching;
exports.Concurrently = Concurrently;
/*  Not a pure module */
