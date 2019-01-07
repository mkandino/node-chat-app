const expect = require('express');

const { isRealString } = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        var res = isRealString(98);
        expect(res).toBeTruthy();
    });

    it('should reject string with only spaces', () => {
        var res = isRealString('    ');
        expect(res).toBeFalsy();
    })
    
    it('should allow string with non-space characters', () => {
        var res = isRealString(' Jag ');
        expect(res).toBeTruthy();
    });
    
});
