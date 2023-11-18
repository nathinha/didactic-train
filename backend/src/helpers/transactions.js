// separate transactions per employee ID and sum the transactions amounts
function getEmployees(data) {
  let employees = {};

  data.transactions.forEach((transaction) => {
    let last_year = new Date().getFullYear() - 1;
    let year = new Date(transaction.timeStamp).getFullYear();

    // check if transaction belongs to previous year
    if (year === last_year) {
      let employeeId = transaction['employee']['id'];
      
      // check if the current employee object exists
      // if not, create a new employee object
      if (!employees.hasOwnProperty(employeeId)) {
        employees[employeeId] = {};
      }

      // check if the current employee object already has a transactions object
      // if not, create a new transactions object and push current transaction
      if (!employees[employeeId].hasOwnProperty('transactions')) {
        employees[employeeId]['transactions'] = [];
      }
      employees[employeeId]['transactions'].push(transaction);

      // check if the current employee object already has a sum object
      // if not, create a new sum object and add the current transaction amount to the sum
      if (!employees[employeeId].hasOwnProperty('sum')) {
        employees[employeeId]['sum'] = 0;
      }

      employees[employeeId]['sum'] += transaction.amount;
    }
  });

  return employees;
}

// from the employees object, check which employee has the greater sum of transactions amount (top earner)
function getTopEarner(employees) {
  let topSum = -Infinity;
  let topEarner = null;

  for (let employee in employees) {
    if (employees[employee].hasOwnProperty('sum') && employees[employee]['sum'] > topSum) {
      topSum = employees[employee]['sum'];
      topEarner = employee;
    }
  }

  return topEarner;
}

// list only the alpha transactions of the top earner employee
function getAlphaTransactions(transactions) {
  let result = [];

  transactions.forEach((transaction) => {
    if (transaction['type'] === 'alpha') {
      result.push(transaction['transactionID']);
    }
  });

  return result;
}

// call all above functions to get the top earner alpha transactions
function parseTransactions(data) {
  let employees = getEmployees(data);
  let topEarner = getTopEarner(employees);
  return getAlphaTransactions(employees[topEarner].transactions);
}

module.exports = { parseTransactions };
