function checkCashRegister(price, cash, cid) {
    let change = cash-price;
    let money = 0
    let conversion = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100]
    let map = new Map()
  
    let finalChange = {
    status: "",
    change: new Array()
    }
  
    for (var i = 0; i < cid.length; i++) {
        money += cid[i][1];
    }
  
    if (change > 0 && change != money) {
        for (var i = cid.length-1; i>=0; i--) {
            let moneymonedas = 0;
            while (change >= conversion[i] && cid[i][1] != 0) {
               change = Math.round((change - conversion[i])*100) / 100
               cid[i][1] = cid[i][1] - conversion[i]
               moneymonedas += conversion[i]
               map.set(cid[i][0],moneymonedas) 
            }
        }
    }
    
    let counter = 0;
    for (let key of map) {
        finalChange.change[counter] = key
        counter++;
    } 

    if (money == change) {
     finalChange.status = "CLOSED";
     finalChange.change = cid;
    } else if (change > 0 || money < change) {
     finalChange.change = [];
     finalChange.status = "INSUFFICIENT_FUNDS"; 
    } else {
     finalChange.status = "OPEN";
    }
    return finalChange;
}

checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])
