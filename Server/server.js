const express = require('express');
const app = express();

app.get('/reset', (req, res) => {
    res.send()
});
app.listen(8080, () => {
  console.log("Server loaded...")
});

