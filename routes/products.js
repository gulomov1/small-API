import express from "express";

const router = express.Router();

// let buyQueue = Promise.resolve(); // queue resolve

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
      message: "Quantity must be greater than 0",
    });
  }

  if (product.stock < quantity) {
    return res.status(400).json({
      message: "Not enough stock",
      stock: product.stock,
    });
  }

  product.stock -= quantity;
  await fakeDatabaseDelay();

  return res.json({
    message: "Purchase successful",
    stock: product.stock,
  });
});

router.post("/restock", async (req, res) => {
  const quantity = Number(req.body.quantity);
  if (!quantity || quantity <= 0) {
    return res.status(400).json({
      message: "Quantity must be greater than 0",
    });
  }
  await fakeDatabaseDelay();
  product.stock += quantity;
  res.json({
    message: "Stock restocked successfully",
    stock: product.stock,
  });
});

// I tried a new solution for myself (/buy-queue)


/*
router.post("/buy-queue", async (req, res) => {
  buyQueue = buyQueue.then(() => handleBuy(req, res));
  await buyQueue;
});

async function handleBuy(req, res) {
  const quantity = Number(req.body.quantity);

  if (!quantity || quantity <= 0) {
    return res.status(400).json({ message: "Quantity must be greater than 0" });
  }

  if (product.stock < quantity) {
    return res
      .status(400)
      .json({ message: "Not enough stock", stock: product.stock });
  }
  await fakeDatabaseDelay();
  product.stock -= quantity;
  return res.json({
    message: "Purchase successful (queue)",
    stock: product.stock,
  });
}
*/

export default router;