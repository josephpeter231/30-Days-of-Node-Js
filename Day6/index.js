const express = require('express');
const app = express();

function greetHandler(req, res) {
  const name = req.query.name;

  if (name) {
    console.log(`Hello, ${name}!`);
    res.send(`Hello, ${name}!`)
  } else {
    console.log('Hello, Guest!');
    res.send(`Hello, `)
  }
}

app.get('/greet', greetHandler);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
