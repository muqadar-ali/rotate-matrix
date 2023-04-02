import { parseCsvFile, rotateTable} from './utils';

async function main() {
  try {
    const data = await parseCsvFile('./input.csv');
    for(const row of data){
        if(row[0]!=='id'){
            const array = JSON.parse(row[1]);  
            console.log('--------------')
            console.log({array}) 
            console.log(rotateTable(array))
            console.log('--------------')
            // break;
        }
    }
  } catch (err) {
    console.error(err);
  }
}

main();
