import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/task2a', async (req, res) => {
  try {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);
    const sum =
      (req.query.a && !isNaN(a) ? a : 0) +
      (req.query.b && !isNaN(b) ? b : 0);
    res.send(`${sum}`);
  } catch(err) {
    console.log(err);
    return res.json({
      err
    });
  }
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})
