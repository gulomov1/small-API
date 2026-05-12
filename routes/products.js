import express from "express";

const router = express.Router();

let isBuyInProgress = false;

let product = {
  name: "Iphone 17",
  stock: 5,
};

function fakeDatabaseDelay() {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
}

router.get("/", (req, res) => {
  res.json(product);
});

router.post("/buy", async (req, res) => {
  const quantity = Number(req.body.quantity);

  if (!quantity || quantity <= 0) {
    return res.status(400).json({
      message: "Quantity 0 dan katta bo'lishi kerak",
    });
  }

  if (isBuyInProgress) {
    return res.status(429).json({
      message: "Boshqa sotib olish jarayoni davom etmoqda. Qayta urinib ko'ring.",
    });
  }

  isBuyInProgress = true;

  try {
    if (product.stock < quantity) {
      return res.status(400).json({
        message: "Yetarli stock yo'q",
        stock: product.stock,
      });
    }

    await fakeDatabaseDelay();
    product.stock -= quantity;

    return res.json({
      message: "Sotib olish muvaffaqiyatli",
      stock: product.stock,
    });
  } finally {
    isBuyInProgress = false;
  }
});


router.post("/restock", async (req, res) => {
  const quantity = Number(req.body.quantity);
  if (!quantity || quantity <= 0) {
    return res.status(400).json({
      message: "Quantity 0 dan katta bo'lishi kerak",
    });
  }
  await fakeDatabaseDelay();
  product.stock += quantity;
  res.json({
    message: "Stock muvaffaqiyatli to'ldirildi",
    stock: product.stock,
  });
});

export default router;