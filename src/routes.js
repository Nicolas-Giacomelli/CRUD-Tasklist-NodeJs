import { Database } from "./database.js"
import { randomUUID } from "node:crypto"
import { buildRoutePath } from "./utils/build-route-path.js"

const database = new Database()
const filePath = new URL('../teste.csv', import.meta.url)

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req,res) => {
            const { search } = req.query

            const tasks = database.select('tasks', search ? {
                title: search,
                description: search
            }:null)

            return res.end(JSON.stringify(tasks))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req,res) => {
            const { title, description } = req.body
            
            if(!title) {
                return res.writeHead(400).end()
                    JSON.stringify({message: 'title is required'})
            }

            if(!description){
                return res.writeHead(400).end()
                    JSON.stringify({message: 'description is required'})
            }

            const today = new Date().toLocaleDateString('pt-BR');

            const tasks = {
                id: randomUUID(),
                title: title,
                description: description,
                completed_at: null,
                created_at: today,
                updated_at: today,
            }
            database.insert('tasks', tasks)

            return res.writeHead(201).end('gravado com sucesso!')
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (req,res) => {
            const { id } = req.params
            const { title, description } = req.body

            if(!title && !description) {
                return res.writeHead(400).end(
                    JSON.stringify({message:'title or description are required'})
                )
            }

            const [task] = database.select('tasks', {id})

            if(!tasks){
                return res.writeHead(404).end('Not Found')
            }
            database.update('tasks', id, {
                title: title ?? task.title,
                description: description ?? task.description,
                uptade_at: today
            })

            return res.writeHead(204).end('Atualizado com sucesso!')

        }
        
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req,res) => {
            const { id } = req.params
            const itemIndex = database.select('tasks', null).findIndex(item => item.id ===id);
            if(itemIndex === -1){
                console.log('Item nao encontrado')
                return res.writeHead(404).end('Not Found');
            }
            database.delete('tasks',id)

        return res.writeHead(204).end('Entrada apagada com sucesso')
        }
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: (req,res) => {
            const { id } = req.params
            
            const data = database.select('tasks', null)

            const itemIndex = data.findIndex(item => item.id === id);
            if(itemIndex === -1){
                console.log("Item não encontrado");
                return res.writeHead(404).end('Not Found');
            }
            const existingItem = data[itemIndex];

            const today = new Date().toLocaleString('pt-BR');

            database.update('tasks', id, {
                title: existingItem.title,
                description: existingItem.description,
                completed_at: today,
                created_at: existingItem.created_at,
                updated_at: today,
            })

            return res.writeHead(204).end('Atualizado com sucesso!')

        }
        
    }
]