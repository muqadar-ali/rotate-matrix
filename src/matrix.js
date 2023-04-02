"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Matrix = void 0;
var Matrix = /** @class */ (function () {
    function Matrix(data) {
        this.rows = 0;
        this.cols = 0;
        this.data = [];
        this.isValid = false;
        var n = data.length;
        if (n == 1) {
            this.data = [data];
            this.rows = 1;
            this.cols = 1;
            this.isValid = true;
        }
        else if (n > 2 || !this._isPrimeButGreaterThan2(n)) {
            // handle 1x1, 1x2 and nxm matrix
            this.rows = Math.sqrt(n);
            this.cols = n / this.rows;
            // rows & columns should be a number, not fraction
            if (!(this.rows % 1 !== 0 || this.cols % 1 !== 0)) {
                this.isValid = true;
                for (var i = 0; i < this.rows; i++) {
                    this.data[i] = [];
                    for (var j = 0; j < this.cols; j++) {
                        this.data[i][j] = data[i * this.cols + j];
                    }
                }
            }
        }
    }
    Matrix.prototype._isPrimeButGreaterThan2 = function (num) {
        var sqrt = Math.sqrt(num);
        for (var i = 2; i <= sqrt; i++) {
            if (num % i === 0) {
                return false;
            }
        }
        return true;
    };
    Matrix.prototype.rotateLeft = function () {
        if (this.isValid) {
            var matrix = this.data.slice();
            if (this.rows >= 1 || this.cols > 1) {
                var rounds = Math.floor(this.rows / 2);
                var r = this.data[0].length - 1;
                for (var i = 0; i < rounds; i++) {
                    var topLeftItem = matrix[i][i];
                    // top <----
                    for (var j = i; j <= r - 1; j++) {
                        matrix[i][j] = matrix[i][j + 1];
                    }
                    /* right
                       ^
                       |
                       |
                    */
                    for (var j = i; j <= r - 1; j++) {
                        matrix[j][r] = matrix[j + 1][r];
                    }
                    // bottom ---->
                    for (var j = r; j > 0; j--) {
                        matrix[r][j] = matrix[r][j - 1];
                    }
                    // left
                    for (var j = r; j > 0; j--) {
                        matrix[j][i] = matrix[j - 1][i];
                    }
                    matrix[i + 1][i] = topLeftItem;
                    r--;
                }
            }
        }
        // false
        return { isValid: this.isValid, data: this.data.flat() };
    };
    return Matrix;
}());
exports.Matrix = Matrix;
