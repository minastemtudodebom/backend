import React, { useState } from "react";
import { collection, addDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from '../../firebase'
import { storage } from "../../firebase";

function ItemCadastro() {
  const [categoria, setCategoria] = useState("");
  const [produto, setProduto] = useState("");
  const [avaliacao, setAvaliacao] = useState("");
  const [valor, setValor] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [largura, setLargura] = useState("");
  const [altura, setAltura] = useState("");
  const [comprimento, setComprimento] = useState("");
  const [peso, setPeso] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagens, setImagens] = useState([]);

  const handleCategoriaChange = (e) => { setCategoria(e.target.value); };
  const handleProdutoChange = (e) => { setProduto(e.target.value); };
  const handleAvaliacaoChange = (e) => { setAvaliacao(e.target.value); };
  const handleValorChange = (e) => { setValor(e.target.value); };
  const handleQuantidadeChange = (e) => { setQuantidade(e.target.value); };
  const handlePesoChange = (e) => { setPeso(e.target.value); };
  const handleLarguraChange = (e) => { setLargura(e.target.value); };
  const handleAlturaChange = (e) => { setAltura(e.target.value); };
  const handleComprimentoChange = (e) => { setComprimento(e.target.value); };
  const handleDescricaoChange = (e) => { setDescricao(e.target.value); };
  
  const handleImagensChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImagens(selectedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "produtos"), {
        categoria: categoria,
        produto: produto,
        avaliacao: avaliacao,
        valor: valor,
        quantidade: quantidade,
        largura: largura,
        altura: altura,
        comprimento: comprimento,
        peso: peso,
        descricao: descricao
      });

      const imagensUrls = await Promise.all(
        imagens.map(async (imagem, index) => {
          const storageRef = ref(storage, `produtos/${docRef.id}/imagem_${index}`);
          await uploadBytes(storageRef, imagem);
          const imageUrl = await getDownloadURL(storageRef);
          return imageUrl;
        })
      );

      await setDoc(docRef, { imagens: imagensUrls }, { merge: true });

      setCategoria("");
      setProduto("");
      setAvaliacao("");
      setValor("");
      setQuantidade("");
      setLargura("");
      setAltura("");
      setComprimento("");
      setPeso("");
      setDescricao("");
      setImagens([]);

      alert("Produto cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
    }
  };

  return (
    <div>
      <h2>Cadastro de Produtos</h2>
      <form onSubmit={handleSubmit}>

        <div>
          <label>Categoria:</label>
          <input type="text" value={categoria} onChange={handleCategoriaChange} />
        </div>

        <div>
          <label>Produto:</label>
          <input type="text" value={produto} onChange={handleProdutoChange} />
        </div>

        <div>
          <label>Avaliação:</label>
          <input type="text" value={avaliacao} onChange={handleAvaliacaoChange} />
        </div>

        <div>
          <label>Valor:</label>
          <input type="text" value={valor} onChange={handleValorChange} />
        </div>

        <div>
          <label>Quantidade:</label>
          <input type="text" value={quantidade} onChange={handleQuantidadeChange} />
        </div>

        <div>
          <label>Peso:</label>
          <input type="text" value={peso} onChange={handlePesoChange} />
        </div>

        <div>
          <label>Largura:</label>
          <input type="text" value={largura} onChange={handleLarguraChange} />
        </div>

        <div>
          <label>Altura:</label>
          <input type="text" value={altura} onChange={handleAlturaChange} />
        </div>

        <div>
          <label>Comprimento:</label>
          <input type="text" value={comprimento} onChange={handleComprimentoChange} />
        </div>

        <div>
          <label>Descrição:</label>
          <input type="text" value={descricao} onChange={handleDescricaoChange} />
        </div>

        <div>
          <label>Imagens:</label>
          <input type="file" multiple onChange={handleImagensChange} />
        </div>
        
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default ItemCadastro;
