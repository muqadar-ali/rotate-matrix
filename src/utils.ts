import * as fs from "fs";
import * as fastCsv from "fast-csv";
import {RotateTableResponse} from './types';

const parseCsvFile = (filename: string): Promise<any[]> => {

  const data: any[] = [];

  const readableStream: fs.ReadStream = fs.createReadStream(filename);

  return new Promise((resolve, reject) => {
    fastCsv
      .parseStream(readableStream)
      .on("error", (error: Error) => {
        reject(error);
      })
      .on("data", (row: any) => {
        data.push(row);
      })
      .on("end", (rowCount: number) => {
        console.log(`Parsed ${rowCount} rows from ${filename}.`);
        resolve(data);
      });
  });
}

const isPrimeButGreaterThan2 = (num: number): boolean => {
  const sqrt = Math.sqrt(num);
  for (let i = 2; i <= sqrt; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}


const arrayToMatrix = (data: number[]): (number[][] | null) => {
  const n = data.length;
  if(n>2){
    if(isPrimeButGreaterThan2(n)){ // cannot break prime number length array to rectangle
      return null;
    }
  }

  // handle 1x1, 1x2 and nxm matrix
  const rows = Math.sqrt(n); 
  const cols = n / rows;

  // rows & columns should be a number, not fraction
  if (rows % 1 !== 0 || cols % 1 !== 0) {
    return null;
  }

  const matrix: number[][] = [];

  for (let i = 0; i < rows; i++) {
    matrix[i] = [];
    for (let j = 0; j < cols; j++) {
      matrix[i][j] = data[i * cols + j];
    }
  }

  return matrix;
}

const rotateTable = (data: number[]): RotateTableResponse => {
  const rotateTableResponse: RotateTableResponse = {valid: false,data:[]}; 
  const matrix: (number[][] | null) = arrayToMatrix(data);
  if(matrix && matrix[0] && matrix[0].length > 0){
    const n = matrix.length;
    let rounds: number = Math.floor(matrix.length/2);
    let r:number=matrix[0].length-1;
    for(let i=0;i<rounds;i++){
      let topLeftItem =  matrix[i][i];

      // top
      for(let j=i; j<=r-1; j++){
        matrix[i][j]=matrix[i][j+1];
      }
    
      // right
      for(let j=i; j<=r-1; j++){
        matrix[j][r]=matrix[j+1][r];
      }

      // bottom
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
    
    return {valid: true,data: matrix.flat()}
  }
  return rotateTableResponse;
}

export {
  parseCsvFile,
  rotateTable
}