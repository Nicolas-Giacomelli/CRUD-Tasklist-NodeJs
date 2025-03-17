## Descrição
Sistema CRUD para gestão de tarefas, utilizado insomnia para teste de funcionalidades e NodeJS para desenvolvimento

## Funcionamento
-'/tasks' POST <= gravar tarefas no banco de dados (Arquivo Json) <= dados necessarios : titulo e descrição (title, description) \
-'/tasks' GET <= Retorna lista de tarefas gravadas no banco \
-'/tasks/:id' PUT <= atualiza informações no banco de dados, necessario preencher pelo menos uma das informações (title | description) \
-'/tasks/:id' DELETE <= deleta o dado do banco pelo id \
-'/tasks/:id/complete' PATCH <= adiciona data de finalização da tarefa 

arquivo /utils/extract-csv-rows.js <= le o arquivo "teste.csv" dentro da pasta e envia as informações contidas nas linhas para o banco de dados
