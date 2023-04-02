import { Matrix } from "../matrix";

describe('Matrix', () => {
    describe('rotateLeft', () => {
      it('should rotate the matrix left', () => {
        const matrix = new Matrix([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        const result = matrix.rotateLeft();
  
        expect(result).toEqual({
          isValid: true,
          data: [2,3,6,1,5,9,4,7,8],
        });
      });
  
      it('should return the empty matrix if it is invalid - odd', () => {
        const matrix = new Matrix([1, 2, 3, 4, 5]);
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
