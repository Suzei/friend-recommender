# Recomendador de Amigos

Recomendador de Amigos tem como objetivo tornar possível a criação de usuários em um sistema, para que os mesmos possam estabelecer relações e ao mesmo tempo, conhecer outras pessoas.

## Instalação

1 - Clone o repositório em sua máquina 

2 - Abra o diretório do projeto e faça o comando 
    
`npm i ou yarn`

3 - Ao instalar os pacotes, execute o comando `npm run server` e cheque o localhost:3000 na sua máquina.


## Recomendações e direcionamento

- Utilize o Insomnia para testes de rotas

- As rotas para teste, são:

• `POST - /person`: Criação de usuário

• `GET - /person/:cpf`: Retorna o usuário especificado; CPF, nome e lista de amigos relacionados.

• `DELETE - /clean`: Limpar todos os usuários e históricos de relacionamentos.

• `POST - /relationship`: Cria relacionamento entre os CPFs no body.

• `GET - /recommendations/:cpf`: Lista e recomenda uma lista para o CPF que for posto nos parâmetros. A recomendação se baseia nos amigos dos amigos.

### Observações 

- A aplicação ainda não tem os testes unitários que foram requisitados;

- No retorno da rota `/recommendations/:cpf`, a ordem de importância não está sendo considerada. Só está sendo retornado, de fato, os CPFs dos amigos dos amigos.


