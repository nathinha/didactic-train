const baseURL = 'https://interview.adpeai.com/api/v2';

// function to get task from the ADP API
async function getTask() {
  const res = await fetch(`${baseURL}/get-task`, {
    method: 'GET',
  });
  const task = await res.json();
  return task;
}


// function to submit task to the ADP API
async function submitTask(task) {
  const res = await fetch(`${baseURL}/submit-task`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });

  return res;
}

module.exports = { getTask, submitTask };
