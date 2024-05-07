function parseTargetDateToYearAndMonth(targetDate) {
  const targetMonthYear = targetDate.split("-");
  const targetMonth = parseInt(targetMonthYear[1], 10) - 1; // Months are zero-based in JS
  const targetYear = parseInt(targetMonthYear[0], 10);

  return {
    targetMonth,
    targetYear,
  };
}

function getNumberOfDaysInMonth(targetYear, targetMonth) {
  return new Date(targetYear, targetMonth + 1, 0).getDate();
}

function calculateNumberOfDaysWithinRange(startDate, endDate, targetDate) {
  startDate = new Date(startDate);
  endDate = new Date(endDate);

  const { targetMonth, targetYear } = parseTargetDateToYearAndMonth(targetDate);

  const isAfterStartDate =
    startDate <= new Date(targetYear, targetMonth + 1, 0);

  const isBeforeEndDate = endDate >= new Date(targetYear, targetMonth, 1);

  if (isAfterStartDate && isBeforeEndDate) {
    const targetFirstDayOfMonth = new Date(targetYear, targetMonth, 1);
    const targetLastDayOfMonth = new Date(targetYear, targetMonth + 1, 0);

    // Calculate the number of days within the target month
    const daysInTargetMonth =
      Math.min(targetLastDayOfMonth, endDate) -
      Math.max(targetFirstDayOfMonth, startDate) +
      1;

    return Math.ceil(daysInTargetMonth / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
  } else {
    return 0; // Target month is not within the range
  }
}

function isEndDateExists(reservation) {
  return !!reservation["End Day"];
}

function calculateNumberOfDaysBasedOnStartDay(startDate, targetDate) {
  const { targetMonth, targetYear } = parseTargetDateToYearAndMonth(targetDate);
  const yearOfStartDate = startDate.getFullYear();
  const monthOfStartDate = startDate.getMonth();
  const numberOfDaysInTargetMonth = getNumberOfDaysInMonth(
    targetYear,
    targetMonth
  );

  if (yearOfStartDate < targetYear) {
    return numberOfDaysInTargetMonth;
  } else if (yearOfStartDate > targetYear) {
    return 0;
  }

  //equal
  if (monthOfStartDate < targetMonth) {
    return numberOfDaysInTargetMonth;
  } else if (monthOfStartDate > targetMonth) {
    return 0;
  }

  return numberOfDaysInTargetMonth - startDate.getDate() + 1;
}

module.exports = {
  calculateNumberOfDaysWithinRange,
  calculateNumberOfDaysBasedOnStartDay,
  isEndDateExists,
  getNumberOfDaysInMonth,
};
