const requests = [];

for (let i = 0; i < 2; i++) {
  requests.push(
    fetch("http://localhost:3000/product/buy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: 4 }),
    }),
  );
}

Promise.all(requests)
  .then(async (responses) => {
    for (const response of responses) {
      console.log(await response.json());
    }
  })
  .catch(console.error);

  