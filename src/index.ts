import express from 'express'
import { FileSystemUtils } from './utils/FileSystemUtils'
import { SendGridUtils } from './utils/SendGridUtils'
import { MessageType } from './utils/SendGridUtils'

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Olá, mundo!')
});

app.post('/read-file/send-emails', async (req, res) => {
  try {
    const result = await FileSystemUtils.getReadResult();
    console.log('Read result:', result);

    //Para trocar a lista de e-mails, basta trocar a lista que esta na pasta public/emails,
    //lembrando que tem que ser um arquivo txt,
    //somente com os emails, sem virgula ou qualquer separador.

    if (result && result.length > 0) {
      for (let i = 0; i < result.length; i++) {
        //Trocar mensagem do email (so as comentario verde na frente)
        const message = new MessageType(
          result[i],
          "VENDAS ABERTAS - IN BRAZA", //Assunto
          "VENDAS ABERTAS - IN BRAZA", //Titulo

          //Corpo do e-mail, lembrando que tem que ser escrito em (HTML), qualquer duvida sobre a linguagem peça para o chat gpt ou acesse o site w3.schools na aba de html.
          ` 
          <p>As vendas para a festa In Braza estão abertas!</p> 
          <p>O Baile Funk da Infinity vai acontecer no dia 06/09, trazendo as maiores atrações do funk de BH para quebrar tudo no pré-feriado.</p>
          <p>Garanta seu ingresso antes que o lote vire!</p>
          <p>https://www.sympla.com.br/in-braza__2129259</p>

          <br>
          <a href="https://www.sympla.com.br/in-braza__2129259">
            <img src="https://images.sympla.com.br/64e3cc185f2a7-lg.jpg">
          </a>  
          <br>
        `
        );

        SendGridUtils.sendMail(message);
      }
    }

    res.status(200).send('Emails enviados.');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Um erro aconteceu ao ler o arquivo de emails.');
  }
});

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`)
});
