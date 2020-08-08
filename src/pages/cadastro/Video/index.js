import React, {useEffect, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import UseForm from '../../../hooks/useForm';
import videosRepository from '../../../repositories/videos';
import categoriasRepository from '../../../repositories/categorias';

function CadastroVideo(){
    const history = useHistory();
    const [categorias, setCategorias] = useState([]);
    const categoryTitles = categorias.map(({titulo}) => titulo);
    const { values, handleChange } = UseForm({
        titulo: 'Video padrão',
        url: 'https://www.youtube.com/watch?v=jOAU81jdi-c',
        categoria: 'Front End',
    });

    useEffect(() => {
        categoriasRepository
            .getAll()
            .then((categoriasFromServer) => {
                setCategorias(categoriasFromServer);
            });
    }, []);

    return (
        <PageDefault>
            <h1>Cadastro de Vídeo</h1>

            <form onSubmit={(event) => {
                event.preventDefault();
                //alert('Vídeo Cadastrado com sucesso!!!?!');
                const categoriaId = categorias.find((categoria) => {
                    return categoria.titulo === values.categoria;
                }); 

                videosRepository.create({
                    titulo: values.titulo,
                    url: values.url,
                    categoriaId: categoriaId.id,
                })
                    .then(() => {
                        console.log('Cadastrado com sucesso');
                        history.push('/');
                    })
            }}>
                <FormField
                    label="Título do Vídeo"
                    name="titulo"
                    value={values.titulo}
                    onChange={handleChange}
                />

                <FormField
                    label="URL"
                    name="url"
                    value={values.url}
                    onChange={handleChange}
                />

                <FormField
                    label="Categoria"
                    name="categoria"
                    value={values.categoria}
                    onChange={handleChange}
                    suggestions={categoryTitles}
                />

                <Button type="submit">
                    Cadastro
                </Button>
            </form>

            <Link to="/cadastro/categoria">
                Cadastro Categoria
            </Link>
        </PageDefault>
    )
}

export default CadastroVideo;