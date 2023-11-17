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
  return employees.reduce((cur, nxt) => {
    cur > nxt ? cur : nxt;
  });
}

function parseTransactions(data) {
  let employees = getEmployees(data);
  let topEarner = getTopEarner(employees);
}

module.exports = { parseTransactions };
