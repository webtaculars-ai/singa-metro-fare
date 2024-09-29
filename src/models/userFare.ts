import { applyCaps } from "../services/capManager";
import moment from "moment";

class UserFare {
  private userID: string;
  private dailyTracker: { [date: string]: { [route: string]: number } } = {};
  private weeklyTracker: { [week: string]: { [route: string]: number } } = {};

  constructor(userID: string) {
    this.userID = userID;
  }

  processTrip(
    fromLine: string,
    toLine: string,
    dateTime: string,
    tripFare: number
  ): void {
    const date = moment(dateTime).format("YYYY-MM-DD");
    const week = moment(dateTime).isoWeek();
    const route = `${fromLine}-${toLine}`;

    if (!this.dailyTracker[date]) {
      this.dailyTracker[date] = {};
    }
    if (!this.weeklyTracker[week]) {
      this.weeklyTracker[week] = {};
    }
    if (!this.dailyTracker[date][route]) {
      this.dailyTracker[date][route] = 0;
    }
    if (!this.weeklyTracker[week][route]) {
      this.weeklyTracker[week][route] = 0;
    }

    const cappedFare = applyCaps(
      this.dailyTracker[date][route],
      this.weeklyTracker[week][route],
      tripFare,
      fromLine,
      toLine
    );

    this.dailyTracker[date][route] += cappedFare;
    this.weeklyTracker[week][route] += cappedFare;

    console.log(
      `User ${this.userID} trip from ${fromLine} to ${toLine} on ${dateTime}: Fare = $${cappedFare}`
    );
  }

  getTotalFare(): number {
    let totalFare = 0;

    for (const week in this.weeklyTracker) {
      for (const route in this.weeklyTracker[week]) {
        totalFare += this.weeklyTracker[week][route];
      }
    }
    return totalFare;
  }
}

export default UserFare;
