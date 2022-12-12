function checkCashRegister(price, cash, cid) {
    let devolver = cash-price;
    let suma = 0
    let conversion = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100]
    let map = new Map()
  
    let cambio = {
    status: "",
    change: new Array()
    }
  
    for (var i = 0; i < cid.length; i++) {
        suma += cid[i][1];
    }
  
    if (devolver > 0 && devolver != suma) {
        for (var i = cid.length-1; i>=0; i--) {
            let sumamonedas = 0;
            while (devolver >= conversion[i] && cid[i][1] != 0) {
               devolver = Math.round((devolver - conversion[i])*100) / 100
               cid[i][1] = cid[i][1] - conversion[i]
               sumamonedas += conversion[i]
               map.set(cid[i][0],sumamonedas) 
            }
        }
    }
    
    let counter = 0;
    for (let clave of map) {
        cambio.change[counter] = clave
        counter++;
    } 

    if (suma == devolver) {
     cambio.status = "CLOSED";
     cambio.change = cid;
    } else if (devolver > 0 || suma < devolver) {
     cambio.change = [];
     cambio.status = "INSUFFICIENT_FUNDS"; 
    } else {
     cambio.status = "OPEN";
    }
    return cambio;
}

checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])
