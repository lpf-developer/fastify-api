# Fastify API com Zod e Typescript
***

1. Criação do projeto: **npm init -y**;
2. Instalação das dependências: 
* **npm i nodemon -D** ;
* **npm i fastify zod**;
* **npm i -D typescript @types/node tsx**.
3. Criação do arquivo server.js:

```ts
// Passo1: importando dependências
import Fastify from "fastify"
import { z } from "zod"

// Passo 2: instanciando o Fastify e criando as regras de validação do objeto User
const server = Fastify()

const userSchema = z.object({
    name: z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string().min(8).max(50)
})

// Passo 3: simulando um banco de dados
type User = z.infer<typeof userSchema>
const users: User[] = []

// Passo 4: rota para a criação de usuários
server.post("/users", (request, reply) => {
    try {
        const user = userSchema.parse(request.body)
        users.push(user)
        return user
    } catch (error) {
        const errorJson = JSON.stringify(error)
        if (error instanceof z.ZodError) {
            //return
            reply.status(400).send(errorJson)
        }else{
            return reply.status(500).send(errorJson)
        }
    }
})

// Passo 5: rota para a listagem de usuários
server.get("/users", () => users)

// Passo 6: configurando a inicialização do servidor
server.listen({ port: 3000 }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})
```
## Passo 2: instanciando o Fastify e criando as regras de validação do objeto User.
***
Iremos instanciar o Fastify em uma constante chamada server e criar as regras de validação do objeto User com o Zod.

Para isso, vamos criar uma constante chamada userSchema e definir as regras de validação do objeto User. Neste caso, este é um objeto com os campos name, email 
e password. Para cada campo, iremos definir o tipo, o tamanho mínimo e máximo de caracteres e o formato do campo (email).

## Passo 3: simulando um banco de dados
***
Para simular um banco de dados, iremos criar uma constante chamada users que 
será um array de objetos do tipo User. Podemos aproveitar a tipagem feita pelo 
Zod para inferir o tipo do objeto User.

## Passo 4: criando a rota de criação de usuário
***
Agora, vamos criar a rota de criação de usuário. Para isso, vamos utilizar o 
método post do Fastify e passar como primeiro parâmetro a rota que será acessada 
e como segundo parâmetro uma função que irá receber como parâmetro o objeto 
request e reply.

Dentro dessa função, iremos pegar os dados enviados pelo usuário e validar se 
eles estão de acordo com as regras definidas anteriormente. Caso estejam, iremos adicionar o usuário no array de usuários e retornar o usuário criado.

Caso não estejam, iremos verificar se o erro é do tipo ZodError e retornar o 
erro para o usuário (lembrando sempre de retornar o Status Code correto).

## Passo 5: criando a rota para a listagem dos usuários
***
Semelhante ao passo anterior, criaremos a rota de listagem de usuários 
utilizando o método get e retornaremos o array de usuários.

## Passo 6: configurando a inicialização do servidor
***
Por fim, vamos iniciar o servidor utilizando o método listen do Fastify e 
passando como parâmetro um objeto com a porta que o servidor irá funcionar e uma função anônima que será executada quando o servidor estiver pronto para receber requisições.

## Passo 7: inicializando o servidor
***
Após verificar que o código está correto, basta executar o comando 
`npx tsx ./server.ts` no terminal para executar o código. O servidor irá iniciar
 na porta 3000 e enviará uma mensagem no terminal informando que está pronto 
 para receber requisições.
