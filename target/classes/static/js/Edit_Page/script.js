const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Configuração do EJS e arquivos estáticos
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Dados em memória (simulando um banco de dados)
let tasks = [
    {
        id: 1,
        title: "Tarefa Exemplo",
        content: "Descrição da tarefa",
        status: "Pendente",
        startDate: "2023-10-10",
        endDate: "2023-10-15"
    }
];

// Lista de status disponíveis
const listaStatusTask = ["Pendente", "Em Progresso", "Concluído"];

// Rota para exibir o formulário de edição
app.get('/tasks/edit', (req, res) => {
    const taskId = parseInt(req.query.id);
    const task = tasks.find(t => t.id === taskId);

    if (!task) {
        return res.status(404).send("Tarefa não encontrada");
    }

    res.render('edit-page', {
        task: task,
        listaStatusTask: listaStatusTask
    });
});

// Rota para processar a edição
app.post('/tasks/edit', (req, res) => {
    const { id, title, content, status, startDate, endDate } = req.body;
    const taskId = parseInt(id);

    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) {
        return res.status(404).send("Tarefa não encontrada");
    }

    // Atualiza a tarefa
    tasks[taskIndex] = {
        id: taskId,
        title: title,
        content: content,
        status: status,
        startDate: startDate,
        endDate: endDate
    };

    res.redirect('/tasks'); // Redireciona para a lista de tarefas (ajuste conforme sua rota)
});

// Inicia o servidor
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});