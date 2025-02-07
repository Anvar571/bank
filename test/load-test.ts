import axios from 'axios';

async function runLoadTest() {
  const iterations = 100;
  const results = {
    sync: [] as number[],
    async: [] as number[],
  };

  // Test sync endpoint
  for (let i = 0; i < iterations; i++) {
    const start = Date.now();
    await axios.get('http://localhost:5000/sync');
    results.sync.push(Date.now() - start);
  }

  // Test async endpoint
  for (let i = 0; i < iterations; i++) {
    const start = Date.now();
    await axios.get('http://localhost:5000/async');
    results.async.push(Date.now() - start);
  }

  // Calculate averages
  const average = (arr: number[]) =>
    arr.reduce((a, b) => a + b, 0) / arr.length;

  console.log('Results:');
  console.log('Sync Average:', average(results.sync).toFixed(2), 'ms');
  console.log('Async Average:', average(results.async).toFixed(2), 'ms');
}

runLoadTest();
