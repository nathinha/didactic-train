// create transactions array by employee
function getEmployees(data) {
  let employees = {};

  data.transactions.forEach((transaction) => {
    let last_year = new Date().getFullYear() - 1;
    let year = new Date(transaction.timeStamp).getFullYear();

    // check if transaction belongs to previous year
    if (year === last_year) {
      let employeeId = transaction['employee']['id'];
      if (!employees.hasOwnProperty(employeeId)) {
        employees[employeeId] = {};
      }

      if (!employees[employeeId].hasOwnProperty('transactions')) {
        employees[employeeId]['transactions'] = [];
      }
      employees[employeeId]['transactions'].push(transaction);

      if (!employees[employeeId].hasOwnProperty('sum')) {
        employees[employeeId]['sum'] = 0;
      }

      employees[employeeId]['sum'] += transaction.amount;
    }
  });

  return employees;
}

function getTopEarner(employees) {
  let maxSum = -Infinity;
  let topEarner = null;

  for (let employee in employees) {
    if (employees[employee].hasOwnProperty('sum') && employees[employee]['sum'] > maxSum) {
      maxSum = employees[employee]['sum'];
      topEarner = employee;
    }
  }

  return topEarner;
}

function getAlphaTransactions(transactions) {
  let result = [];

  transactions.forEach((transaction) => {
    if (transaction['type'] === 'alpha') {
      result.push(transaction['transactionID']);
    }
  });

  return result;
}

function parseTransactions(data) {
  let employees = getEmployees(data);
  let topEarner = getTopEarner(employees);
  return getAlphaTransactions(employees[topEarner].transactions);
}

module.exports = { parseTransactions };
