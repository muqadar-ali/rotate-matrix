import { parseCsvFile} from './src/utils';
import { Matrix } from './src/matrix';

async function main() {
  try {
    const filePath = process.argv[2];
    const data = await parseCsvFile(filePath);
    for(const row of data){
      if(row[0]==='id'){
        console.log(`id,json,is_valid`);
      }
      else{
        const array = JSON.parse(row[1]);  
        const matrix = new Matrix(array);
        const {isValid,data} = matrix.rotateLeft();
        console.log(`${row[0]},"${JSON.stringify(data)}",${isValid}`);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

main();
