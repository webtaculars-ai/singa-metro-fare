import { isPeakTime } from "../utils/timeUtils";

interface Fare {
  peak: number;
  nonPeak: number;
}

const fares: { [key: string]: Fare } = {
  "Green-Green": { peak: 2, nonPeak: 1 },
  "Red-Red": { peak: 3, nonPeak: 2 },
  "Green-Red": { peak: 4, nonPeak: 3 },
  "Red-Green": { peak: 3, nonPeak: 2 },
};

export function calculateFare(
  fromLine: string,
  toLine: string,
  dateTime: string
): number {
  const route = `${fromLine}-${toLine}`;
  const isPeak = isPeakTime(dateTime);
  return isPeak ? fares[route].peak : fares[route].nonPeak;
}
