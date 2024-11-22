import 'dotenv/config';
//isso é um comentário teste para o git
import { ObjectId } from "mongodb";
//o conectarAoBanco é uma função que está no src/config. Ela é responsável por fazer a conexão com o MongoDB da nuvem.
import conectarAoBanco from "../config/dbConfig.js";

//estamos criando uma variável que será o objeto de conexão do comando da função para se conectar ao banco.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

//criando função para listar todas as postagens
export async function getTodosPosts(){
    //aqui a variável db irá receber todas as informações que vem do banco de dados "imersao-instabytes"
    const db = conexao.db("imersao-instabytes");
    //já a variável coleção irá pegar apenas a coleção "posts" do banco de dados "imersao-instabytes"
    const colecao = db.collection("posts");
    //o método "getTodosPosts" irá retornar o que tem na variável coleção e usando o .toArray converterá isso num Array.  
    return colecao.find().toArray();
  }

  export async function criarPost(novoPost) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost);
  }

  export async function atualizarPost(id, novoPost) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
}
  

  //esse exemplo é pura lógica de programação. é uma forma em javascript de buscar um id dentro de um array.
//function buscarPostPorID(id){
//    return posts.findIndex((post) => {
//        return post.id === Number(id);
//    })
//}

//neste caso estarmos dizendo que a rota "/posts/ terá logo em seguida um ID que representa qual elemento queremos do array" 
//app.get("/posts/:id", (req, res) => {
//    const index = buscarPostPorID(req.params.id);
//    res.status(200).json(posts[index]);
//});