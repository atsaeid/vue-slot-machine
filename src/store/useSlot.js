import { defineStore } from "pinia";

export const useSlot = defineStore({
  id: "blanacer",
  state: () => ({
    balance: 10,
    bet: 10,
    win: 0,
    spinOrder: false,
  }),
  getters: {
    getCurrnetBet: (state) => state.bet,
    getCredit: (state) => state.balance,
    getWinRate: (state) => state.win * state.bet,
    getStatus: (state) => state.spinOrder,
  },
  actions: {
    useCredit() {
      this.balance--;
    },
    setRate(_win) {
      //this.win++;
      this.win = this.win + _win;
    },
    setSpin() {
      this.spinOrder = false;
        if (this.balance > 0) {
          this.balance--;
          this.spinOrder = true;
        }else{
          alert("You dont have enough credits!");
        }
    },
    checkout() {
      if (confirm("Are you sure? We can keep your money better!")) {
        this.win = 0;
        this.balance = 0;
        alert("Your operation has been made successfully");
      }
    },
    setStatus(_state) {
      this.spinOrder = _state;
    }
  },
});
