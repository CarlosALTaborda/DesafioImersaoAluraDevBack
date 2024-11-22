//express é tudo o que é necessário para um servidor node
import express from "express";
import routes from "./src/routes/postRoutes.js";

//app é uma variável e ela irá representar o servidor
const app = express();
app.use(express.static("uploads"));
routes(app);

//listen é o comando para um servidor node ficar "ouvindo" ou subir o servidor. O primeiro pâmetro é uma porta
//a porta 3000 é uma porta padrão para API
//o segundo parametro é a função que você quer seja executada. Abaixo ele está chamando o "console.log"
app.listen(3000, () => {
    console.log("Servidor escutando...");
});
