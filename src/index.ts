import fs from "fs";
import csv from "csv-parser";

interface Trip {
  UserID: string;
  FromLine: string;
  ToLine: string;
  DateTime: string;
}

function processTrips(csvFilePath: string): void {
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (row: Trip) => {
      console.log(row);
    })
    .on("end", () => {
      console.log("CSV file successfully processed");
    })
    .on("error", (err: Error) => {
      console.error(`Error reading CSV file: ${err.message}`);
    });
}

const csvFilePath = "./trips.csv";
processTrips(csvFilePath);
