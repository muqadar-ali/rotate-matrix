import { Matrix } from "../matrix";

describe('Matrix', () => {
    describe('rotateLeft', () => {
      it('should rotate the matrix left - 3x3 matrix', () => {
        const matrix = new Matrix(Array.from({ length: 9}, (_, index) => index + 1));
        const result = matrix.rotateLeft();
  
        expect(result).toEqual({
          isValid: true,
          data: [2,3,6,1,5,9,4,7,8],
        });
      });

      it('should rotate the matrix left - 4x4 matrix', () => {
        const matrix = new Matrix(Array.from({ length: 16}, (_, index) => index + 1));
        const result = matrix.rotateLeft();
  
        expect(result).toEqual({
          isValid: true,
          data: [2,3,4,8,1,3,11,12,5,6,10,16,9,13,14,15],
        });
      });
  
  
      it('should return the empty matrix if it is invalid - odd', () => {
        const matrix = new Matrix(Array.from({ length: 5}, (_, index) => index + 1));
        const result = matrix.rotateLeft();
  
        expect(result).toEqual({
          isValid: false,
          data: [],
        });
      });

      it('should return the empty matrix if it is invalid - even', () => {
        const matrix = new Matrix([2,-0]);
        const result = matrix.rotateLeft();
  
        expect(result).toEqual({
          isValid: false,
          data: [],
        });
      });

      it('should return original matrix if 1x1 array as input', () => {
        const matrix = new Matrix([2]);
        const result = matrix.rotateLeft();
  
        expect(result).toEqual({
          isValid: true,
          data: [2],
        });
      });

    });
  });
