import app from "./app.js";
import 'dotenv/config';

app.listen(process.env.PORT, () => {
  console.log("🔥 Servidor rodando na porta 3000");
});
