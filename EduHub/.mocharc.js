test/hello.test.js
const assert = require('assert');
describe('Hello Test', () => {
    it('should return true for true', () => {
        assert.strictEqual(true, true);
    });
});

.mocharc.js
module.exports = {
    spec: 'test/**/*.test.js',
    timeout: 5000
};