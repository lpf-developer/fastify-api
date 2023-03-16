const Fastify = require("fastify")

/**
 * Opcional, exibe um arquivo de log durante a execução da aplicação.
 */
const fastify = Fastify({
    logger: false
})

/**
 * Fastify com MySQL
 */
// /**
//  * Fastify: registro do banco de dados
//  * user: root
//  * password: root
//  * host: localhost
//  * port: 3306
//  * database: store
//  */
// fastify.register(require("@fastify/mysql"),{
//     connectionString: "mysql://root:root@localhost:3306/store"
// })

/**
 * Fastify com Mongoose
 */

// Import "mongoose"
const mongoose = require("mongoose")
const app = fastify()
const mongoUrl = process.env.MONGODB_URI || "mongodb://localhost:27017/users"

/** connect to MongoDB datastore */
try {
    mongoose.connect(mongoUrl)
} catch (error) {
    console.error(error)
}

/**
 * Rotas
 */
fastify.get('/', function(request, reply){
    reply.send({ message: "Welcome to new life with Jesus Christ!"})
})

fastify.get('/user', function(request, reply){
    fastify.mysql.query(
        "SELECT id, name, email, password FROM users",

        // Capitura e retorna o erro ou o resultado da consulta SQL
        function onResult(error, result){
            reply.send(error || result)
        }
    )
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
