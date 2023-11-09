import { ethers } from "ethers";
import express from "express";
import { abi } from "../artifacts/contracts/productApi.sol/productApi.json";
import dotenv from "dotenv";
dotenv.config();

const privateKey = process.env.PRIVATE_KEY;
const contractAddress = process.env.CONTRACT_ADDRESS;
const providerUrl = process.env.API_URL;
const port = 3000;

if (!privateKey || !contractAddress) {
  throw new Error("Please set the PRIVATE_KEY environment variable.");
}

const provider = new ethers.providers.JsonRpcProvider(providerUrl);
const signer = new ethers.Wallet(privateKey, provider);

const contractInstance = new ethers.Contract(contractAddress, abi, signer);

const app = express();
app.use(express.json());

app.get("/products/", async (req, res) => {
  try {
    const products = await contractInstance.getAllProducts();
    res.send(products);
  } catch (e) {
    console.log(e);
  }
});

app.post("/products", async (req, res) => {
  try {
    const { id, name, price, quantity } = req.body;

    const transaction = await contractInstance.setProduct(
      id,
      name,
      price,
      quantity
    );

    await transaction.wait();

    res.json({ success: true });
  } catch (e) {
    console.log(e);
  }
});

app.put("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { name, price, quantity } = req.body;
    const transaction = await contractInstance.updateProduct(
      id,
      name,
      price,
      quantity
    );

    await transaction.wait();

    res.json({ success: true });
  } catch (e) {
    console.log(e);
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const transaction = await contractInstance.deleteProduct(id);

    await transaction.wait();

    res.json({ success: true });
  } catch (e) {
    console.log(e);
  }
});

app.listen(port, () => {
  console.log("Server is listening on port: ", port);
});
