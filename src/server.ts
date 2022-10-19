import axios from 'axios';
import express from 'express';

const app = express();

app.use(express.json());

app.get('/validationCep/:cep', async (request, response) => {
    const cep = request.params.cep
    const validator = await axios
        .get(`https://busca-cep-production.up.railway.app/cep/${cep}`)
        .then((data) => {
            if(data && data.data && data.data?.result && !data.data.result.localidade ){
                response.json('não existe');
            }else{
                response.json("existe");
            }
        }).catch(() => {
            console.log('Sorry! This CEP is not valid')
        })
        return {validator}
})

app.listen(process.env.PORT || 3333, () => console.log('Server is running...'))