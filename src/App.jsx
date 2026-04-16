// - useState: é onde você anota valores que podem mudar (tarefas, contador, etc.)
// - useEffect: dispara uma ação quando algo acontece (quando o componente aparece ou quando uma variável muda).

import { useState, useEffect } from 'react';

function App() {    
  const [tasks, setTasks] = useState([]);      
  const [newTask, setNewTask] = useState('');    

  // Carrega tasks do localStorage ao iniciar
  useEffect(() => {       
    const saved = localStorage.getItem('tasks');   
    if (saved) setTasks(JSON.parse(saved));        
  }, []);

  // Salva no localStorage sempre que tasks mudam  
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);                              

  const addTask = () => {                                  
    if (!newTask.trim()) return;           
    setTasks([...tasks, {                     
      id: Date.now(),                        
      text: newTask,                        
      completed: false                      
    }]);
    setNewTask('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="min-h-screen py-8 px-4 flex items-center justify-center">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Task Manager
        </h1>
        
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
            placeholder="Digite uma nova task..."
            className="flex-1 p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all duration-300 text-lg"
          />
          <button
            onClick={addTask}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Adicionar
          </button>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {tasks.length === 0 ? (
            <p className="text-center text-gray-500 text-lg py-8">Nenhuma task ainda! Adicione a primeira 🎉</p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center p-4 bg-white/50 rounded-xl border-2 transition-all duration-300 hover:shadow-md ${
                  task.completed
                    ? 'border-green-300 bg-green-50/50' 
                    : 'border-gray-200 hover:border-blue-200'
                }`}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="w-6 h-6 rounded-lg accent-blue-500 mr-4 cursor-pointer"
                />
                <span
                  className={`flex-1 text-lg font-medium cursor-pointer select-none ${
                    task.completed ? 'line-through text-gray-500' : 'text-gray-800'
                  }`}
                  onClick={() => toggleTask(task.id)}
                >
                  {task.text}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-lg transition-all duration-200"
                  title="Deletar task"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {tasks.length > 0 && (
          <div className="mt-6 pt-6 border-t-2 border-gray-100">
            <p className="text-center text-sm text-gray-500">
              {tasks.filter(t => t.completed).length} de {tasks.length} tasks concluídas
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;