import { getTodosPosts, criarPost, atualizarPost } from "../models/postsModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiServices.js";

// Importa as funções para obter todos os posts e criar um novo post do modelo de posts.
// Importa o módulo do sistema de arquivos para realizar operações com arquivos.

export async function listarPosts (req, res) {
  // Define uma função assíncrona para listar todos os posts.
  try {
    // Tenta executar o código dentro do bloco try.
    const posts = await getTodosPosts(); // Obtém todos os posts do banco de dados.
    res.status(200).json(posts); // Envia os posts como resposta JSON com status 200 (sucesso).
  } catch (error) {
    // Captura qualquer erro que possa ocorrer durante a execução.
    console.error(error.message); // Imprime a mensagem de erro no console para depuração.
    res.status(500).json({ error: "Falha ao buscar posts" }); // Envia uma resposta de erro com status 500 (erro interno do servidor).
  }
}

export async function postarNovoPost(req, res) {
  // Define uma função assíncrona para criar um novo post.
  const novoPost = req.body; // Obtém os dados do novo post do corpo da requisição.

  // Validação dos dados do post (adicione mais validações conforme necessário).
  if (!novoPost.descricao || !novoPost.imagem) {
    return res.status(400).json({ error: "Campos obrigatórios ausentes" }); // Retorna um erro 400 se os campos obrigatórios estiverem faltando.
  }

  try {
    // Tenta criar o novo post no banco de dados.
    const postCriado = await criarPost(novoPost);
    res.status(200).json(postCriado); // Envia o post criado como resposta.
  } catch (error) {
    // Captura qualquer erro que possa ocorrer durante a criação do post.
    console.error(error.message);
    res.status(500).json({ error: "Falha ao criar o post" });
  }
}

export async function uploadImagem(req, res) {
  // Define uma função assíncrona para fazer upload de uma imagem e criar um novo post.
  const novoPost = {
    descricao: "",
    imagem: req.file.originalname, // Obtém o nome original do arquivo da imagem.
    alt: ""
  };

  try {
    // Cria um novo post com os dados da imagem.
    const postCriado = await criarPost(novoPost);
    // Gera um novo nome para o arquivo da imagem com base no ID do post.
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
    // Move o arquivo da imagem para o diretório de uploads com o novo nome.
    fs.renameSync(req.file.path, imagemAtualizada);
    res.status(200).json(postCriado);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Falha ao fazer upload da imagem" });
  }
}

 
export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`


    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);
        const post = {
            imgURL: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        };

        const postCriado = await atualizarPost(id, post);
        res.status(200).json(postCriado);
      } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Falha na requisiçãoo" });
      }
}

//o array "posts" abaixo é um mock para retornar valores considerando uma estrutura inicial.
//const posts = [
//    {
//      id: 1,
//      6740852be2fd01ca51c48e9a: "Uma foto teste",
//      imagem: "http://placecats.com/millie/300/150"
//    },
//    {
//      id: 2,
//      descricao: "Paisagem deslumbrante",
//      imagem: "http://placecats.com/millie/300/150"
//    },
//    {
//      id: 3,
//      descricao: "Cachorro fofo",
//      imagem: "http://placecats.com/millie/300/150"
//    },
//    {
//      id: 4,
//      descricao: "Comida deliciosa",
//      imagem: "http://placecats.com/millie/300/150"
//    },
//    {
//      id: 5,
//      descricao: "Gato curioso",
//      imagem: "http://placecats.com/millie/300/150"
//    },
//    {
//      id: 6,
//      descricao: "Viagem incrível",
//      imagem: "http://placecats.com/millie/300/150"
//    }
//  ];
