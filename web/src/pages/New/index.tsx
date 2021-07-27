import { useState, FormEvent, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';

import cameraIcon from '../../assets/camera.svg';
import api from '../../services/api';

import './styles.scss'

export function New() {
  const { goBack } = useHistory();

  const [company, setCompany] = useState('');
  
  const [techs, setTechs] = useState('');

  const [price, setPrice] = useState('');

  const [thumbnail, setThumbnail] = useState<File[]>([]);
  const [previewThumbnail, setPreviewThumbnail] = useState('');

  function handleSelectThumbnail(event: ChangeEvent<HTMLInputElement>) {
    if(!event.target.files)
      return;

    const selectedThumbnail = Array.from(event.target.files);

    setThumbnail(selectedThumbnail);

    const selectedThumbnailPreview = URL.createObjectURL(new Blob(selectedThumbnail));

    setPreviewThumbnail(selectedThumbnailPreview);
  }

  console.log(thumbnail);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!company || !techs || !thumbnail)
      return;

    const user_id = localStorage.getItem('user');

    const data = new FormData();

    thumbnail.forEach(thumb => {
      data.append('thumbnail', thumb);
    });

    data.append('company', company);
    data.append('techs', techs);
    data.append('price', price);

    await api.post('spots', data, {
      headers: {
        user_id
      }
    });

    goBack();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label 
        id="thumbnail" 
        style={{ backgroundImage: `url(${previewThumbnail})` }}
        className={previewThumbnail ? 'has-thumbnail' : ''}
      >
        <input 
          type="file" 
          onChange={handleSelectThumbnail}
          accept="image/png, image/jpeg"
        />

        <img src={cameraIcon} alt="Select img" />
      </label>

      <label htmlFor="company">EMPRESA *</label>
      <input 
        id="company"
        name="company"
        placeholder="Sua empresa incrível"
        value={company}
        onChange={event => setCompany(event.target.value)}
      />

      <label htmlFor="techs">TECNOLOGIAS * <span>(separadas por vírgula)</span></label>
      <input 
        id="techs"
        name="techs"
        placeholder="Quais tecnologias usam?"
        value={techs}
        onChange={event => setTechs(event.target.value)}
      />

      <label htmlFor="price">VALOR DA DIÁRIA * <span>(em branco para GRATUITO)</span></label>
      <input 
        id="price"
        name="price"
        placeholder="Valor cobrado por dia"
        value={price}
        onChange={event => setPrice(event.target.value)}
      />

      <button type="submit">Cadastrar</button>
    </form>
  );
}