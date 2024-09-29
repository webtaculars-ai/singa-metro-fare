import UserFare from "../models/userFare";
import { calculateFare } from "./fareRules";

class FareCalculator {
  private users: { [key: string]: UserFare } = {};

  processTrip(
    userID: string,
    fromLine: string,
    toLine: string,
    dateTime: string
  ): void {
    if (!this.users[userID]) {
      this.users[userID] = new UserFare(userID);
    }

    const tripFare = calculateFare(fromLine, toLine, dateTime);
    this.users[userID].processTrip(fromLine, toLine, dateTime, tripFare);
  }

  printFareSummary(): void {
    console.log("\nTotal Fares Per User:");
    for (const userID in this.users) {
      const totalFare = this.users[userID].getTotalFare();
      console.log(`User ${userID}: Total Fare = $${totalFare.toFixed(2)}`);
    }
  }
}

export default FareCalculator;
