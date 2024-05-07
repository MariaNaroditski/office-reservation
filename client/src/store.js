import { makeAutoObservable } from "mobx";
import { createContext } from "react";

class Store {
  reservationCalculation = null;
  file = null;
  disabled = true;
  date = "";

  constructor() {
    makeAutoObservable(this);
    this.getMonthAndYear = this.getMonthAndYear.bind(this);
    this.resetStore = this.resetStore.bind(this);
  }

  getMonthAndYear() {
    const [year, month] = this.date.split("-");

    return {
      year,
      month,
    };
  }

  resetStore() {
    this.reservationCalculation = null;
    this.file = null;
    this.disabled = true;
    this.date = "";
  }
}

const store = new Store();
export default store;

export const StoreContext = createContext();
