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
      const weeklyCapHit = this.users[userID].hasHitWeeklyCap();
      const dailyCapHit = this.users[userID].hasHitDailyCap();

      console.log(`User ${userID}: Total Fare = $${totalFare.toFixed(2)}`);

      if (weeklyCapHit) {
        console.log(`User ${userID} has hit the weekly cap!`);
      } else {
        console.log(`User ${userID} has not hit the weekly cap.`);
      }

      if (dailyCapHit) {
        console.log(
          `User ${userID} has hit the daily cap on at least one day!`
        );
      } else {
        console.log(`User ${userID} has not hit the daily cap on any day.`);
      }
    }
  }
}

export default FareCalculator;
