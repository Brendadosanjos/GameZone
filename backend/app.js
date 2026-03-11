import express from "express";
import authRouter from "./src/routes/auth.router.js";
import categoriaRouter from "./src/routes/categoria.router.js";
import cupomRouter from "./src/routes/cupom.router.js";
import estadoRouter from "./src/routes/estado.router.js";
import generoRouter from "./src/routes/genero.router.js";
import marcaRouter from "./src/routes/marca.router.js";
import promocaoRouter from "./src/routes/promocao.router.js";
import statusRouter from "./src/routes/status.router.js";
import userRouter from "./src/routes/user.router.js";

const PORT = 3000;
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.use(express.json());

app.use(authRouter);
app.use("/usuarios", userRouter);
app.use("/categorias", categoriaRouter);
app.use("/status", statusRouter);
app.use("/genero", generoRouter);
app.use("/promocao", promocaoRouter);
app.use("/cupom", cupomRouter);
app.use("/estado", estadoRouter);
app.use("/marca", marcaRouter);

app.listen(PORT, () => {
  console.log(`Aplicacao rodando na porta ${PORT}`);
});
