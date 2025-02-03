// Fetch and display tasks
function getTasks() {
    fetch('/api/todos')
      .then(response => response.json())
      .then(data => {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';
        data.forEach(task => {
          const li = document.createElement('li');
          li.className = 'list-group-item d-flex justify-content-between align-items-center';
          
          li.innerHTML = `
            <span ${task.completed ? 'style="text-decoration: line-through;"' : ''}>
              ${task.task}
            </span>
            <div>
              <button class="btn btn-sm btn-outline-danger" onclick="deleteTask(${task.id})">Delete</button>
              <button class="btn btn-sm btn-outline-${task.completed ? 'warning' : 'primary'}" 
                      onclick="toggleTask(${task.id})">
                ${task.completed ? 'Undo' : 'Complete'}
              </button>
            </div>
          `;
          taskList.appendChild(li);
        });
      });
  }
  
  // Add a new task
  function addTask() {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value.trim();
    if (!task) return alert('Task cannot be empty!');
  
    fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task })
    })
      .then(() => {
        taskInput.value = ''; // Clear input after adding task
        getTasks();  // Reload task list
      });
  }
  
  // Delete a task
  function deleteTask(id) {
    fetch(`/api/todos/${id}`, { method: 'DELETE' })
      .then(() => getTasks());
  }
  
  // Toggle task completion
  function toggleTask(id) {
    fetch(`/api/todos/${id}`, { method: 'PUT' })
      .then(() => getTasks());
  }
  
  // Event listener for the Enter key
  document.getElementById('taskInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });
  
  // Initial load
  getTasks();
  