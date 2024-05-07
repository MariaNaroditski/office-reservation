const {
  getNumberOfDaysInMonth,
  isEndDateExists,
  calculateNumberOfDaysBasedOnStartDay,
  calculateNumberOfDaysWithinRange,
} = require("../utils/dateUtils");

const getExpectedRevenue = (price, numberOfDaysInAMonth, occupiedDays) =>
  Math.ceil((occupiedDays / numberOfDaysInAMonth) * price);

function calculateRevenueAndTotalCapacityOfUnreservedOffices(
  reservations,
  date
) {
  const selectedDate = new Date(date);
  const numberOfDaysInAMonth = getNumberOfDaysInMonth(
    selectedDate.getFullYear(),
    selectedDate.getMonth()
  );

  return reservations.reduce(
    ({ totalPrice, totalCapacityOfUnreservedOffices }, reservation) => {
      const startDate = new Date(reservation["Start Day"]);
      const price = +reservation["Monthly Price"];
      let occupiedDays;

      if (isEndDateExists(reservation)) {
        const endDate = new Date(reservation["End Day"]);
        occupiedDays = calculateNumberOfDaysWithinRange(
          startDate,
          endDate,
          date
        );
        totalPrice += getExpectedRevenue(
          price,
          numberOfDaysInAMonth,
          occupiedDays
        );
      } else {
        occupiedDays = calculateNumberOfDaysBasedOnStartDay(startDate, date);
        totalPrice += getExpectedRevenue(
          price,
          numberOfDaysInAMonth,
          occupiedDays
        );
      }

      if (occupiedDays === 0) {
        totalCapacityOfUnreservedOffices += +reservation["Capacity"];
      }

      return { totalPrice, totalCapacityOfUnreservedOffices };
    },
    { totalPrice: 0, totalCapacityOfUnreservedOffices: 0 }
  );
}

module.exports = {
  calculateRevenueAndTotalCapacityOfUnreservedOffices,
};
