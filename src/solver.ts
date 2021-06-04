import express from 'express';

const router = express.Router();

interface FormData {
  rem : string;
  mod : string; 
};

const inverse = (a : number, m : number) : number => {
  let m0 = m;
  let x0 = 0;
  let x1 = 1;

  if (m == 1)
  return 0;

  // Algoritma euclidean
  while (a > 1)
  {
      // q adalah hasil pembagian
      let q = Math.floor(a/m);

      let t = m;

      // m adalah sisa
      m = a % m;
      a = t;

      t = x0;

      x0 = x1 - q * x0;

      x1 = t;
  }

  // Make x1 positive
  if (x1 < 0)
  x1 += m0;

  return x1;
}

const findX = (data : FormData[], length : number) : number => {
  let product = 1;

  for (let i = 0; i < length; i++) {
    product *= parseInt(data[i].mod);
  }

  let result = 0;

  for (let i = 0; i < length; i++)
  {
    const num = parseInt(data[i].mod);
    const pp = product/num;
    const inv = inverse(pp, num);
    result += parseInt(data[i].rem) * inv * pp;
  }

  return result % product;
}

router.get('/', (req, res) => {
  res.send('Hello World!');
})

router.post('/solve', (req, res) => {
  const solution = findX(req.body, req.body.length);
  res.status(200).send({solution : solution});
})

export = router;