import express from 'express';

const router = express.Router();

interface FormData {
  rem : string;
  mod : string;
};

const inverse = (a : number, m : number) : number => {
  const m0 = m;
  let x0 = 0;
  let x1 = 1;

  if (m === 1)
  return 0;

  // Algoritma euclidean
  while (a > 1)
  {
      // q adalah hasil pembagian
      const q = Math.floor(a/m);

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

const findProduct = (data : FormData[]) : number => {
  let product = 1;

  for (let i = 0; i < data.length; i++) {
    product *= parseInt(data[i].mod);
  }

  return product;
}

const findPP = (mod : number, product : number) : number => {
  return product/mod;
}

const findResult = (
  data : FormData[],
  inverse : number[],
  ppArr : number[]
) : number => {
  let result = 0;

  for (let i = 0; i < data.length; i++)
  {
    const pp = ppArr[i]
    const inv = inverse[i];
    result += parseInt(data[i].rem) * inv * pp;
  }

  return result;
}

router.get('/', (req, res) => {
  res.send('Hello World!');
})

router.post('/solve', (req, res) => {
  const data = req.body;
  const length = data.length;
  const product = findProduct(data);

  const ppArr : number[] = [];
  for (let i = 0; i < length; i++) {
    const num = parseInt(data[i].mod);
    const p = findPP(num, product);
    ppArr.push(p);
  }

  const inverseArray : number[] = [];
  for (let i = 0; i < length; i++) {
    const num = parseInt(data[i].mod);
    const inv = inverse(ppArr[i], num);
    inverseArray.push(inv);
  }

  const result = findResult(data, inverseArray, ppArr);

  const solution = result % product;

  res.status(200).send({
    solution,
    product,
    pp : ppArr,
    inverse : inverseArray,
    result
  });
})

export = router;