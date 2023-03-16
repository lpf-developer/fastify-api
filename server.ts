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