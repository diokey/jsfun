var assert = require("assert");

describe('Array',function(){
    describe('#indextOf',function(){
        it('should return -1 when the value is not present',function(){
            assert.equal(-1,[1,2,3].indexOf(5));
            assert.equal(-1,[1,2,3].indexOf(-1));
        }); 
    });
});

function sum(a,b) {
    return a+b;
}

function sumone(a) {
    return function (b) {
        return a + b;
   }; 
}

describe('Sum',function(){
    it('Should return the sum of 2 numbers',function(){
        assert.equal(5,sum(3,2)); 
    });

    it('Should return the sum of 2 number with 2 args',function(){
        assert.equal(5,sumone(3)(2));
    });
});

function permutation(list, ret, res) {
    if(list.length === 0) {
        res.push(ret.join(''));
    }

    for(var i=0,l=list.length;i<l;i++) {
       var x = list.splice(i,1);
       ret.push(x);
       permutation(list,ret,res);
       ret.pop();
       list.splice(i,0,x);
    }

    if (res)
        return res;
}

describe('Permutation', function() {
    it('Should return possible permutation of an array', function() {
        assert.deepEqual(['abc','acb','bac','bca','cab','cba'],permutation(['a','b','c'],[],[])); 
   }); 
});


describe('Functional programming', function() {
   
    it('should use "parseFloat" function', function() {
        assert.deepEqual([1,2,3],(function(){
            return ['1','2','3'].map(parseFloat);
        }())); 
   });


   it('should use "parseInt" function', function() {
        assert.deepEqual([1,2,3],(function(){
            return ['1','2','3'].map(function(x){
               return parseInt(x,10); 
            });
        }())); 
    }); 
});

describe('Curly function', function() {

    function curl(fun) {
        var args = Array.prototype.slice.apply(arguments,[1]);

        return function() {
            return fun.apply(null,args.concat(Array.prototype.slice.apply(
            arguments,[])));
        };
    }

    it('should return curly function', function() {
        assert.equal("function",typeof curl(function(a,b){ return a+b; })); 
    });

    var incr = curl(function(a,b){
        return a+b; 
    },1);

    it('Should increment value by one', function() {
        assert.equal(7,incr(6)); 
    }); 
});

