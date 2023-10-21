function checkCashRegister(price, cash, cid) {
  let change = cash * 100 - price * 100;
  let total = 0;
  for (let elem of cid) {
    total += elem[1] * 100;
  }
  if (total < change) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  } else if (total === change) {
    return { status: "CLOSED", change: cid };
  } else {
    let result = [];
    cid = cid.reverse();
    let sums = {
      "ONE HUNDRED": 10000,
      TWENTY: 2000,
      TEN: 1000,
      FIVE: 500,
      ONE: 100,
      QUARTER: 25,
      DIME: 10,
      NICKEL: 5,
      PENNY: 1,
    };
    for (let elem of cid) {
      let drawer = [elem[0], 0];
      elem[1] = elem[1] * 100;
      while (change >= sums[elem[0]] && elem[1] > 0) {
        change -= sums[elem[0]];
        elem[1] -= sums[elem[0]];
        drawer[1] += sums[elem[0]] / 100;
      }
      if (drawer[1] > 0) {
        result.push(drawer);
      }
    }
    if (change > 0) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    }
    return { status: "OPEN", change: result };
  }
}

checkCashRegister(19.5, 20, [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
]);
