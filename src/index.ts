import fs from "fs";
import csv from "csv-parser";
import FareCalculator from "./services/fareCalculator";

interface Trip {
  UserID: string;
  FromLine: string;
  ToLine: string;
  DateTime: string;
}

function processTrips(csvFilePath: string): void {
  const fareCalculator = new FareCalculator();

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (row: Trip) => {
      const { UserID, FromLine, ToLine, DateTime } = row;
      fareCalculator.processTrip(UserID, FromLine, ToLine, DateTime);
    })
    .on("end", () => {
      console.log("CSV file successfully processed");
      fareCalculator.printFareSummary();
    })
    .on("error", (err: Error) => {
      console.error(`Error reading CSV file: ${err.message}`);
    });
}

const csvFilePath = "./trips.csv";
processTrips(csvFilePath);
