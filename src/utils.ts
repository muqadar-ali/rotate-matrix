import * as fs from "fs";
import * as fastCsv from "fast-csv";

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
        resolve(data);
      });
  });
}

export {
  parseCsvFile
}