import express from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import cors from 'cors';

const rotas = express();
rotas.use(cors());
rotas.use(express.json());

rotas.post('/cria-usuarios', async (request, response) => {
    await prisma.user.create({
        data: {
            email: request.body.email,
            nome: request.body.nome,
            idade: request.body.idade
        }
    })
    response.status(201).json(request.body)
});

rotas.get('/usuarios', async (request, response) => {
    let users = []

    if (request.query) {
        users = await prisma.user.findMany( {
            where: {
                name: request.query.name,
                email: request.query.email,
                idade: request.query.idade
            }
        })
    } else {
        users = await prisma.user.findMany()
    }

    response.status(200).json(users)
});

rotas.put('/usuarios/:id', async (request, response) => {

    await prisma.user.update({
        where: {
            id: request.params.id
        },
        data: {
            email: request.body.email,
            nome: request.body.nome,
            idade: request.body.idade
        }
    })
    response.status(200).json(request.body)
});

rotas.delete('/usuarios/:id', async (request, response) => {
    await prisma.user.delete({
        where: {
            id: request.params.id,
        },
    })

    response.status(200).json({ message: 'Usuario deletado com sucesso!' })
});

rotas.listen(3000);

/*rotas.post('/usuarios/login', async (request, response) => {

    const user = await prisma.user.findUnique({
        where: {
            email: request.body.email
        }
    })
    if(user.password == request.body.password){
        console.log(user);
    }
})

/*
                    REQUEST´S

Query Params (get):
Ex: http://Serverlocalhost:3000/usuarios?idade=18&nome=otavio
(Toda as pequenas informações depois do '?')

Route Params (get/put/delete):
Ex: http://Serverlocalhost:3000/usuarios/18
(Chama um usuario específico)

Body Params (post e put):
Ex: {
    "nome":"Otavio", "id":18
}
(Ele envia informções que são restristas pelo Body)

otavio1590
RzJFcK8yYRNqU7R
 */