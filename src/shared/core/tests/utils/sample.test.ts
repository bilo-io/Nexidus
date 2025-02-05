import { add } from '../../src/utils/sample';

describe('add', () => {
    it('should return the sum of two numbers', () => {
        expect(add(1, 2)).toBe(3);
    });
});