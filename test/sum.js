var assert = require('assert');

describe('Crazy sum functions', function() {
   it('should add 2 numbers', function() {
       var add = function (a,b) {
          return a + b; 
       };

       assert.equal(add(2,3),5);
   });

   it('should be call with two arguments',function(){
        var add = function (a) {
            return function (b) {
                return a + b;
            }; 
        };

        assert.equal(add(2)(3),5);
   });

   it('should accept any number of arguments (not quite)', function() {
        var add = function (a) {
            var sum = a;

            var inner = function (b) {
                if (b) {
                    sum += b;
                    return inner;
                } else {
                    return sum;
                }
            };

            return inner;
        };

        assert.equal(add(2)(3)(4)(),9);

        var four = add(4);
        
        assert.equal(four(6)(),10);

        //assert.equal(four(5)(),9); this returns 15. Because we are memorizing previous values :( . We need a fix for that
   });

   it('should accept any number of arguments without () at the end', function() {
        var add = function (a) {
            var sum = a;

            var inner = function (b) {
                sum += b;

                return inner;
            };

            inner.valueOf = function () {
                return sum;
            };

            return inner;
        };

        var five = add(5);
        var four = add(4);
        assert.equal(five(6),11);
        assert.equal(four(2)(1),7);
        assert.equal(add(5)(6)(7),18);

        //ok param fixed, let's now fix the last value memorization issue
   });

   it('should fix the variable momerization problem', function() {
       var add = function (origin) {
            var inner = function (val) {
                return add(parseInt(val+'',10) == val ? origin + val : origin); 
            };

            inner.valueOf = function () { return origin; };

            return inner;
       };

        assert.equal(add(3)(4), 7);
        assert.equal(add(3)(4)('aa')(5)(), 12);
        var three = add(3);
        var four = add(4);
        assert.equal(three, 3);
        assert.equal(four, 4);
        assert.equal(three(5), 8);
        assert.equal(three(6), 9);
        assert.equal(three(four), 7);
        assert.equal(three(four)(three(four)), 14);

   });

});
