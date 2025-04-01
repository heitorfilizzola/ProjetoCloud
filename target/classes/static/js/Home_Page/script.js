// public/js/Home_Page/script.js
class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || this._createSampleData();
        this.init();
    }

    _createSampleData() {
        const sampleTasks = [
            {
                id: this._generateUUID(),
                title: 'Tarefa Exemplo 1',
                content: 'Descrição da tarefa 1',
                status: 'Fazer',
                createdAt: new Date().toISOString(),
                dueDate: '2024-06-30'
            },
            {
                id: this._generateUUID(),
                title: 'Tarefa Concluída',
                content: 'Descrição concluída',
                status: 'Feito',
                createdAt: '2024-05-01',
                dueDate: '2024-05-15'
            }
        ];
        localStorage.setItem('tasks', JSON.stringify(sampleTasks));
        return sampleTasks;
    }

    _generateUUID() {
        return crypto.randomUUID();
    }

    init() {
        this._renderTasks();
        this._setupEventListeners();
    }

    _renderTasks(filteredTasks = null) {
        const tasksToRender = filteredTasks || this.tasks;
        const todoContainer = document.querySelector('#Tasks_List:first-of-type .rows_Tasks');
        const doneContainer = document.querySelector('#Tasks_List:last-of-type .rows_Tasks');

        todoContainer.innerHTML = '';
        doneContainer.innerHTML = '';

        tasksToRender.forEach(task => {
            const taskElement = this._createTaskElement(task);
            if (task.status === 'Feito') {
                doneContainer.appendChild(taskElement);
            } else {
                todoContainer.appendChild(taskElement);
            }
        });
    }

    _createTaskElement(task) {
        const taskElement = document.createElement('div');
        taskElement.className = 'row_Elements';
        taskElement.innerHTML = `
      <span>
        <label class="container_Circle">
          <input type="checkbox" ${task.status === 'Feito' ? 'checked' : ''}>
          <span class="checkmark"></span>
        </label>
      </span>
      <span>${task.title}</span>
      <span>${new Date(task.createdAt).toLocaleDateString()}</span>
      <span>${task.dueDate}</span>
      <div class="task_Status">
        <span class="actions_Buttons ${task.status === 'Feito' ? 'nav_DoneButton' : 'nav_ToDoButton'}">
          ${task.status}
        </span>
        <button class="actions_Buttons edit-btn">
          <img src="/images/Edit_Vector.svg" alt="Editar">
        </button>
        <button class="actions_Buttons delete-btn">
          <img src="/images/TrashCan_Vector.svg" alt="Excluir">
        </button>
      </div>
    `;

        taskElement.querySelector('input[type="checkbox"]').addEventListener('change', () =>
            this._toggleTaskStatus(task.id)
        );

        taskElement.querySelector('.edit-btn').addEventListener('click', () =>
            this._editTask(task.id)
        );

        taskElement.querySelector('.delete-btn').addEventListener('click', () =>
            this._deleteTask(task.id)
        );

        return taskElement;
    }

    _toggleTaskStatus(taskId) {
        this.tasks = this.tasks.map(task =>
            task.id === taskId
                ? {...task, status: task.status === 'Fazer' ? 'Feito' : 'Fazer'}
                : task
        );
        this._updateStorage();
        this._renderTasks();
    }

    _editTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        const newTitle = prompt('Editar título:', task.title);
        const newContent = prompt('Editar conteúdo:', task.content);

        if (newTitle && newContent) {
            this.tasks = this.tasks.map(t =>
                t.id === taskId
                    ? {...t, title: newTitle, content: newContent}
                    : t
            );
            this._updateStorage();
            this._renderTasks();
        }
    }

    _deleteTask(taskId) {
        if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
            this.tasks = this.tasks.filter(t => t.id !== taskId);
            this._updateStorage();
            this._renderTasks();
        }
    }

    _setupEventListeners() {
        // Search
        document.getElementById('Left_Search').addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filtered = this.tasks.filter(task =>
                task.title.toLowerCase().includes(searchTerm) ||
                task.content.toLowerCase().includes(searchTerm)
            );
            this._renderTasks(filtered);
        });

        // Filter Buttons
        document.getElementById('nav_ToDoButton').addEventListener('click', () => {
            this._renderTasks(this.tasks.filter(t => t.status === 'Fazer'));
        });

        document.getElementById('nav_DoneButton').addEventListener('click', () => {
            this._renderTasks(this.tasks.filter(t => t.status === 'Feito'));
        });

        // Logout
        document.getElementById('logout_button').addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            window.location.href = '/login';
        });

        // Add New Task
        document.getElementById('nav_AddButton').addEventListener('click', (e) => {
            e.preventDefault();
            const title = prompt('Título da nova tarefa:');
            const content = prompt('Descrição da tarefa:');

            if (title && content) {
                const newTask = {
                    id: this._generateUUID(),
                    title,
                    content,
                    status: 'Fazer',
                    createdAt: new Date().toISOString(),
                    dueDate: '2024-12-31'
                };

                this.tasks.push(newTask);
                this._updateStorage();
                this._renderTasks();
            }
        });
    }

    _updateStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TaskManager();
});