import React, { useState } from "react";
import { collection, addDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from '../../firebase'
import { storage } from "../../firebase";
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

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

          <div class="mb-3">
            <label class="form-label">Categoria</label>
            <input type="text" class="form-control" value={categoria} onChange={handleCategoriaChange} />
            <div class="form-text">Informe a categoria do seu produto</div>
          </div>

          <div class="mb-3">
            <label class="form-label">Produto</label>
            <input type="text" class="form-control" value={produto} onChange={handleProdutoChange} />
            <div class="form-text">Informe o nome do seu produto</div>
          </div>

          <div class="mb-3">
            <label class="form-label">Avaliação</label>
            <input type="text" class="form-control" value={avaliacao} onChange={handleAvaliacaoChange} />
            <div class="form-text">Dê uma avaliação ao seu produto</div>
          </div>

          <div class="mb-3">
            <label class="form-label">Valor</label>
            <input type="text" class="form-control" value={valor} onChange={handleValorChange} />
            <div class="form-text">Informe o valor do seu produto</div>
          </div>

          <div class="mb-3">
            <label class="form-label">Quantidade</label>
            <input type="text" class="form-control" value={quantidade} onChange={handleQuantidadeChange} />
            <div class="form-text">Informe a quantidade do seu produto</div>
          </div>

          <div class="mb-3">
            <label class="form-label">Peso</label>
            <input type="text" class="form-control" value={peso} onChange={handlePesoChange} />
            <div class="form-text">Informe o peso do seu produto</div>
          </div>

          <div class="mb-3">
            <label class="form-label">Largura</label>
            <input type="text" class="form-control" value={largura} onChange={handleLarguraChange} />
            <div class="form-text">Informe a largura do seu produto</div>
          </div>

          <div class="mb-3">
            <label class="form-label">Altura</label>
            <input type="text" class="form-control" value={altura} onChange={handleAlturaChange} />
            <div class="form-text">Informe a altura do seu produto</div>
          </div>

          <div class="mb-3">
            <label class="form-label">Comprimento</label>
            <input type="text" class="form-control" value={comprimento} onChange={handleComprimentoChange} />
            <div class="form-text">Informe o comprimento do seu produto</div>
          </div>

          <div class="mb-3">
            <label class="form-label">Descrição</label>
            <textarea class="form-control" rows="15" value={descricao} onChange={handleDescricaoChange} />
          </div>

          <div class="mb-3">
            <label class="form-label">Imagens</label>
            <input type="file" class="form-control" multiple onChange={handleImagensChange} />
          </div>
        
          <button type="submit" class="btn btn-primary">Cadastrar</button>
          
        </form>
    </div>

  );
}

export default ItemCadastro;
