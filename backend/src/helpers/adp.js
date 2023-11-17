const baseURL = 'https://interview.adpeai.com/api/v2';

async function getTask() {
  const res = await fetch(`${baseURL}/get-task`, {
    method: 'GET',
  });
  const task = await res.json();
  return task;
}

module.exports = { getTask };
