const baseURL = 'https://interview.adpeai.com/api/v2';

async function getTask() {
  const res = await fetch(`${baseURL}/get-task`, {
    method: 'GET',
  });
  const data = await res.json();
  return data;
}

module.exports = { getTask };
