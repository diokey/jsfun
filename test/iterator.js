
var assert = require('assert');
describe('Testing iterator callback', function() {
   
    var logger = (function() {
        var count = 0;

        var l = function(message) {
            count++;
            console.log(count, message);
        };

        return {
            log : l
        };
    }());

    it('should accept function as argument', function() {

        assert.equal(['foo', 'bar','test'].forEach(logger.log));
    });
});
