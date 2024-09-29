interface Cap {
  daily: number;
  weekly: number;
}

const caps: { [key: string]: Cap } = {
  "Green-Green": { daily: 8, weekly: 55 },
  "Red-Red": { daily: 12, weekly: 70 },
  "Green-Red": { daily: 15, weekly: 90 },
  "Red-Green": { daily: 15, weekly: 90 },
};

export function applyCaps(
  dailyTotal: number,
  weeklyTotal: number,
  tripFare: number,
  fromLine: string,
  toLine: string
): number {
  const route = `${fromLine}-${toLine}`;
  const dailyCap = caps[route].daily;
  const weeklyCap = caps[route].weekly;

  let cappedFare = tripFare;

  // Apply daily cap
  if (dailyTotal + cappedFare > dailyCap) {
    cappedFare = dailyCap - dailyTotal;
  }

  // Apply weekly cap
  if (weeklyTotal + cappedFare > weeklyCap) {
    cappedFare = weeklyCap - weeklyTotal;
  }

  return Math.max(cappedFare, 0);
}
