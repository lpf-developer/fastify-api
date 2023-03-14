const Fastify = require("fastify")

/**
 * Opcional, exibe um arquivo de log durante a execução da aplicação.
 */
const fastify = Fastify({
    logger: false
})

/**
 * Rotas
 */
fastify.get('/', function(request, reply){
    reply.send({ message: "Welcome to new life with Jesus Christ!"})
})

fastify.get('/products', function(request, reply){
    reply.send({ hello: "world"})
})
/**
 * Carrega o servidor 
 */
fastify.listen(
    {port: 3000},
    function(error, address){
        if(error){
            console.log(error)
            proccess.exit(1)
        }
        console.log("Servidor ouvindo na porta", address)
    }    
)
