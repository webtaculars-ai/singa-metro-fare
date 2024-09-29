interface PeakPeriod {
  start: string;
  end: string;
}

const peakHours: { [key: string]: PeakPeriod[] } = {
  weekday: [
    { start: "08:00", end: "10:00" },
    { start: "16:30", end: "19:00" },
  ],
  saturday: [
    { start: "10:00", end: "14:00" },
    { start: "18:00", end: "23:00" },
  ],
  sunday: [{ start: "18:00", end: "23:00" }],
};

export function isPeakTime(dateTime: string): boolean {
  const date = new Date(dateTime);
  const day = date.getDay();
  const time = date.toTimeString().slice(0, 5);

  let periods: PeakPeriod[] = [];

  if (day >= 1 && day <= 5) {
    periods = peakHours.weekday;
  } else if (day === 6) {
    periods = peakHours.saturday;
  } else if (day === 0) {
    periods = peakHours.sunday;
  }

  for (const period of periods) {
    if (time >= period.start && time <= period.end) {
      return true;
    }
  }

  return false;
}
