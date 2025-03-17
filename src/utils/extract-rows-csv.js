import fs from 'node:fs'
import { parse } from 'csv-parse'

const csvPath = new URL('./teste.csv', import.meta.url)

const stream = fs.createReadStream(csvPath);

const csvParse = parse({
    delimiter: ',',
    skipEmptyLines: true,
    fromLine: 2
});

async function run() {
    const linesParseCSV = stream.pipe(csvParse);

    for await (const line of linesParseCSV) {
        const [title, description] = line;
        
        await fetch('http://localhost:3333/tasks', {
            method: 'POST',
            headers: {
                'Content-type':'application/json',
            },
            body:JSON.stringify({
                title,
                description,
            })
        })
        await wait(1000)
        console.log(`dados: ${title} e ${description} Adicionados ao banco de dados`);
    }
}

run()

function wait(ms)  {
    return new Promise((resolve)=> setTimeout(resolve,ms))
}