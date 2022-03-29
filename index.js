const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const livros = [
  {
    id: 1,
    titulo: "A Odisséia de Jonas",
    autor: "Thomas Crawling",
    ano: 2001,
    numPaginas: 197
  },
  {
    id: 2,
    titulo: "Jonas e a sociedade escondida",
    autor: "Claire Crawling",
    ano: 2004,
    numPaginas: 158
  }
];

let proximoID = livros[livros.length - 1].id;
app.get("/livros", (req, res) => {
  res.json(livros);
  return;
});

app.get("/livros/:id", (req, res) => {
  const id = Number(req.params.id);
  const existe = livros.find(identify => identify.id === id);

  if (!id) {
    res.json("O valor do parâmetro ID da URL não é um número válido.");
    return;
  }

  if (!existe) {
    res.json("Não existe livro para o ID informado.")
    return;
  }

  res.json(existe);
  return;
});

app.post("/livros", (req, res) => {
  const { titulo, autor, ano, numPaginas } = req.body;

  const novoLivro = {
    id: proximoID + 1,
    titulo: titulo,
    autor: autor,
    ano: ano,
    numPaginas: numPaginas
  }

  livros.push(novoLivro);
  res.json(livros);
  return
});

app.put("/livros/:id", (req, res) => {
  const id = Number(req.params.id);
  let idExiste, index;

  const { titulo, autor, ano, numPaginas } = req.body;

  const substituirLivro = {
    id: id,
    titulo: titulo,
    autor: autor,
    ano: ano,
    numPaginas: numPaginas
  }

  if (!id) {
    res.json("O valor do parâmetro ID da URL não é um número válido.");
    return;
  }

  idExiste = livros.find(livro => livro.id === id);

  if (!idExiste) {
    res.json("Não existe livro a ser substituído para o ID informado.");
    return;
  }

  index = livros.indexOf(idExiste);

  livros.splice(index, 1, substituirLivro);

  res.json("Livro substituído.");
  return;
});

app.patch("/livros/:id", (req, res) => {
  const id = Number(req.params.id), { titulo, autor, ano, numPaginas } = (req.body);
  let livroExiste;

  if (!id) {
    res.status(400).json("O valor do parâmetro ID da URL não é um número válido.");
    return
  }

  if (!titulo && !autor && !ano && !numPaginas) {
    res.status(400).json("É necessário algum campo para alterar o livro.");
    return;
  }

  livroExiste = livros.find(livro => livro.id === id);

  if (!livroExiste) {
    res.status(404).json("Livro não encontrado");
    return;
  }

  if (titulo) {
    livroExiste.titulo = titulo;
  }

  if (autor) {
    livroExiste.autor = autor;
  }

  if (ano) {
    livroExiste.ano = ano;
  }

  if (numPaginas) {
    livroExiste.numPaginas = numPaginas;
  }

  return res.status(200).json(livroExiste);
});

app.delete("/livros/:id", (req, res) => {
  const id = Number(req.params.id);
  let livroExiste;

  if (!id) {
    res.status(400).json("Parâmetro ID está incorreto. Tente novamente.");
    return;
  }

  livroExiste = livros.find(livro => livro.id === id);

  if (!livroExiste) {
    res.status(404).json("Não existe livro com a ID informada");
    return;
  }

  const index = livros.indexOf(livroExiste);
  livros.splice(index, 1);
  return res.status(200).json("Livro deletado");
})

app.listen(3001);