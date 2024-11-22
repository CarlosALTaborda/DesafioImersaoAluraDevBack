import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postscontroller.js";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSucessStatus: 200,

}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Define o diretório de destino para salvar os arquivos carregados.
      // Neste caso, todos os arquivos serão salvos na pasta 'uploads/'.
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      // Define o nome do arquivo salvo.
      // O arquivo será salvo com o mesmo nome original.
      cb(null, file.originalname);
    }
  });
  
  const upload = multer({ dest: "./uploads" , storage });
  // Configura o middleware Multer para lidar com o upload de arquivos.
  // O parâmetro `dest` indica o diretório de destino (redundante neste caso,
  // pois já foi definido no `storage`), mas pode ser útil em outras configurações.
  // O parâmetro `storage` define a estratégia de armazenamento, neste caso,
  // utilizando o objeto `storage` configurado anteriormente.


const routes = (app) => {
    //no código abaixo estamos dizendo que o app irá retornando valores no formato json.
    app.use(express.json());
    app.use(cors(corsOptions));
    
    //o get é a criação da rota. O primeiro parâmetro é o caminho da rota.
    //o segundo parâmetro é o que vai ser executado. Abaixo estamos dizendo que vamos executar um comentado de request e response.
    //o res indica a resposta e você precisa sempre passar o código do status http (baseado na lista de códigos de status) e o que vc vai responder.
    //o .json signifca que retorno será no formato json.
    app.get("/posts", listarPosts);
    //o post é para criar um novo post
    app.post("/posts", postarNovoPost); 
    //o upload da imagem é salvo no diretorio /upload, o parametro do banco que presenta p nome da imagem é identificado como "imagem" e isso td ocorre pelo método uploadImagem que está no Controller.
    app.post("/upload", upload.single("imagem"), uploadImagem);
    //o put é para atualizar
    app.put("/upload/:id", atualizarNovoPost);

} 

export default routes;

