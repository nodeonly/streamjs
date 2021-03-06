// I'm using Babel.js and Intellij IDEA File Watcher to automatically transpile es6 to js:
// --source-maps --out-file $FileNameWithoutExtension$-compiled.js $FilePath$ --blacklist useStrict
//
// useStrict is blacklisted to prevent global use-strict for jshint

QUnit.test("sample 1", function (assert) {
    var myList = ["a1", "a2", "b1", "c2", "c1"];

    var result = Stream(myList).filter(function (s) {
        return s.indexOf("c") === 0;
    }).map(function (s) {
        return s.toUpperCase();
    }).sorted().toArray();

    assert.equal(result.length, 2);
    assert.equal(result[0], "C1");
    assert.equal(result[1], "C2");
});

QUnit.test("sample 2", function (assert) {
    Stream(["a1", "a2", "a3"]).findFirst().ifPresent(function (first) {
        return assert.equal(first, "a1");
    });

    Stream.of("a1", "a2", "a3").findFirst().ifPresent(function (first) {
        return assert.equal(first, "a1");
    });

    var result = Stream.range(1, 4).toArray();

    assert.equal(result.length, 3);
    assert.equal(result[0], 1);
    assert.equal(result[1], 2);
    assert.equal(result[2], 3);
});

QUnit.test("sample 3", function (assert) {
    Stream.of(1, 2, 3).map(function (n) {
        return 2 * n + 1;
    }).average().ifPresent(function (avg) {
        return assert.equal(avg, 5);
    });
});

QUnit.test("sample 4", function (assert) {
    Stream.of("a1", "a2", "a3").map(function (s) {
        return s.slice(1);
    }).map(function (s) {
        return parseInt(s, 10);
    }).max().ifPresent(function (max) {
        return assert.equal(max, 3);
    });
});

QUnit.test("sample 5", function (assert) {
    Stream.of("a1", "b2", "c3").filter(function (s) {
        console.log("filtering: %s", s);
        assert.ok(false);
        return true;
    });

    assert.ok(true);
});

QUnit.test("sample 6", function (assert) {
    var ops = [];

    Stream.of("a1", "b2", "c3").filter(function (s) {
        ops.push("filter: " + s);
        return true;
    }).forEach(function (s) {
        return ops.push("forEach: " + s);
    });

    assert.equal(ops.length, 6);
    assert.equal(ops[0], "filter: a1");
    assert.equal(ops[1], "forEach: a1");
    assert.equal(ops[2], "filter: b2");
    assert.equal(ops[3], "forEach: b2");
    assert.equal(ops[4], "filter: c3");
    assert.equal(ops[5], "forEach: c3");
});

QUnit.test("sample 6", function (assert) {
    var ops = [];

    Stream.of("d2", "a2", "b1", "b3", "c").map(function (s) {
        ops.push("map: " + s);
        return s.toUpperCase();
    }).anyMatch(function (s) {
        ops.push("anyMatch: " + s);
        return s.indexOf("A") === 0;
    });

    assert.equal(ops.length, 4);
    assert.equal(ops[0], "map: d2");
    assert.equal(ops[1], "anyMatch: D2");
    assert.equal(ops[2], "map: a2");
    assert.equal(ops[3], "anyMatch: A2");
});

QUnit.test("sample 7", function (assert) {
    var ops = [];

    Stream.of("d2", "a2", "b1", "b3", "c").filter(function (s) {
        ops.push("filter: " + s);
        return s.indexOf("a") === 0;
    }).map(function (s) {
        ops.push("map: " + s);
        return s.toUpperCase();
    }).forEach(function (s) {
        return ops.push("forEach: " + s);
    });

    assert.equal(ops.length, 7);
    assert.equal(ops[0], "filter: d2");
    assert.equal(ops[1], "filter: a2");
    assert.equal(ops[2], "map: a2");
    assert.equal(ops[3], "forEach: A2");
    assert.equal(ops[4], "filter: b1");
    assert.equal(ops[5], "filter: b3");
    assert.equal(ops[6], "filter: c");
});

QUnit.test("sample 8", function (assert) {
    assert.throws(function () {
        var stream = Stream.of(1, 2, 3).filter(function (n) {
            return n % 2 === 1;
        });

        stream.anyMatch(function (n) {
            return true;
        }); // ok
        stream.toArray(); // error
    });
});

QUnit.test("sample 9", function (assert) {
    var odd = function odd(array) {
        return Stream(array).filter(function (n) {
            return n % 2 === 1;
        });
    };

    assert.equal(odd([1, 2, 3]).anyMatch(function (n) {
        return true;
    }), true);
    assert.equal(odd([1, 2, 3]).toArray().length, 2);
});

//# sourceMappingURL=test-introduction-compiled.js.map