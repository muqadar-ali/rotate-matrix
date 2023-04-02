export class Matrix {
    private data!: number[][];
    private isValid!: Boolean;
    private rows!:number;
    private cols!:number;
  
    constructor(data:number[]) {
        this.rows=0;
        this.cols=0;
        this.data=[];
        this.isValid=false;
        
        const n = data.length;
        if(n==1){ // 1x1 matrix
            this.data=[data];
            this.rows=1;
            this.cols=1;
            this.isValid=true;
        }else if(n>2 || !this._isPrimeButGreaterThan2(n)){
            // handle 1x1, 1x2 and nxm matrix 
            this.rows = Math.sqrt(n); 
            this.cols = n / this.rows;
    
            // rows & columns should be a number, not fraction
            if (!(this.rows % 1 !== 0 || this.cols % 1 !== 0)) {
                this.isValid=true;
                for (let i = 0; i < this.rows; i++) {
                    this.data[i] = [];
                    for (let j = 0; j < this.cols; j++) {
                        this.data[i][j] = data[i * this.cols + j];
                    }
                }
            }
        }
    }

    private _isPrimeButGreaterThan2 (num: number): boolean {
        const sqrt = Math.sqrt(num);
        for (let i = 2; i <= sqrt; i++) {
          if (num % i === 0) {
            return false;
          }
        }
        return true;
    }

    rotateLeft(){
        if(this.isValid){
            let matrix = this.data.slice();
            if(this.rows >= 1 || this.cols > 1){
                let rounds: number = Math.floor(this.rows/2);
                let r:number=this.data[0].length-1;
                for(let i=0;i<rounds;i++){
                  let topLeftItem =  matrix[i][i];
            
                  // top <----
                  for(let j=i; j<=r-1; j++){
                    matrix[i][j]=matrix[i][j+1];
                  }
                
                  /* right 
                     ^
                     |
                     | 
                  */
                  for(let j=i; j<=r-1; j++){
                    matrix[j][r]=matrix[j+1][r];
                  }
            
                  // bottom ---->
                  for(let j=r; j>0; j--){
                    matrix[r][j]=matrix[r][j-1];
                  }
            
                  // left
                  for(let j=r; j>0; j--){
                    matrix[j][i]=matrix[j-1][i];
                  }
                  matrix[i+1][i]=topLeftItem;     
                  r--;
                }
            }
        }
        // false
        return {isValid: this.isValid,data: this.data.flat()}
    }
}