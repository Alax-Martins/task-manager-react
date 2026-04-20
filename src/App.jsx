// - useState: Anotação de valores que podem mudar (tarefas, contador, etc)
// - useEffect: dispara uma ação quando algo acontece (quando o componente aparece ou quando uma variável muda)

import { useState, useEffect } from 'react';

function App() {    
  const [tasks, setTasks] = useState([]);           // cria uma lista de tarefas.
  const [newTask, setNewTask] = useState('');      //cria um texto temporário para guardar o que o usuário está digitando antes de colocar na lista//

  // Carrega tasks do localStorage ao iniciar
  useEffect(() => {                                // executa um pedaço de codigo em momentos expecificos
    const saved = localStorage.getItem('tasks');   // procura no localStorage do navegador o que foi salvo com a chave 'tasks'
    if (saved) setTasks(JSON.parse(saved));        // se encontrar alguma coisa, ele transforma esse texto em uma lista de verdade (JSON.parse(saved)
  }, []);                                          // depois, usa setTasks para colocar essa lista dentro do estado tasks


  
  // Salva no localStorage sempre que tasks mudam  
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));    //localStorage.setItem guarda alguma informação, e JSON.stringify transforma a lista de tarefas em um texto para poder guardar
  }, [tasks]);                                               //se tasks mudar, execute o código”.
    

  const addTask = () => {                  // função que adiciona uma nova tarefa à lista
    if (!newTask.trim()) return;           // verifica se o texto digitado não é vazio (trim() remove espaços em branco no início e no fim)
    setTasks([...tasks, {                  // setTasks é a função que atualiza a lista de tarefas. Ele cria uma nova lista que começa com todas as tarefas antigas (...tasks) e depois adiciona um novo objeto de tarefa no final.
      id: Date.now(),                      // Date.now() gera um número único baseado no tempo atual, garantindo que cada tarefa tenha um identificador único.
      text: newTask,                       // o texto da tarefa é o que o usuário digitou, armazenado na variável newTask.
      completed: false                     // a nova tarefa começa como não concluída (completed: false).
    }]);                                   // Depois de adicionar a nova tarefa, ele limpa o campo de entrada, definindo newTask como uma string vazia.
    setNewTask('');                        // Limpa o campo de entrada
  };
                

  const toggleTask = (id) => {             //função serve para marcar ou desmarcar uma tarefa como concluída. 
    setTasks(tasks.map(task =>             // Ele percorre a lista de tarefas atual (tasks) usando o método map, que cria uma nova lista com base na original. Para cada tarefa (task) na lista, ele verifica se o id da tarefa é igual ao id que foi passado para a função toggleTask. Se for o mesmo id, ele cria um novo objeto de tarefa com as mesmas propriedades, mas alterna o valor de completed (se era true, vira false; se era false, vira true). Se o id não for o mesmo, ele mantém a tarefa inalterada. O resultado é uma nova lista de tarefas onde apenas a tarefa com o id correspondente teve seu status de conclusão alterado.
      task.id === id ? { ...task, completed: !task.completed } : task
    ));                                    
  };


  const deleteTask = (id) => {                         // remove uma tarefa da lista.
    setTasks(tasks.filter(task => task.id !== id));   //  o método filter cria uma nova lista de tarefas que inclui apenas as tarefas cujo id é diferente do id passado para a função deleteTask. Em outras palavras, ele mantém todas as tarefas exceto aquela que tem o id correspondente, efetivamente removendo-a da lista.
  };


  return (
      <div className="min-h-screen py-8 px-4 flex items-center justify-center"> 
  {/* -min-h-screen → ocupa no mínimo a altura inteira da tela. 
  -py-8 px-4 → adiciona espaçamento interno (padding) em cima/baixo e nas laterais. 
  -flex items-center justify-center → usa o sistema flexbox para centralizar o conteúdo no meio da tela. */}
         
      <div className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8">  
  {/*- max-w-md w-full → define que a largura máxima é “média” e ocupa toda a largura disponível.
- bg-white/80 → fundo branco com 80% de opacidade.
- backdrop-blur-xl → aplica um efeito de desfoque no fundo atrás desse bloco.
- rounded-2xl → cantos arredondados.
- shadow-2xl → sombra bem marcada para dar profundidade.
- p-8 → espaçamento interno grande. */}

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
  {/*- text-3xl font-bold → texto grande e em negrito.
- text-center → centralizado.
- text-gray-800 → cor cinza escura.
- mb-8 → margem inferior para separar do conteúdo abaixo.
- bg-gradient-to-r from-blue-600 to-purple-600 → cria um gradiente de azul para roxo.
- bg-clip-text text-transparent → aplica o gradiente dentro do texto, deixando as letras coloridas.
*/}        
          Task Manager
        </h1>
        
        <div className="flex gap-2 mb-6">
          <input                                                 /* input para adicionar novas tarefas. */
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}         /* o usuário digita, o estado é atualizado.*/
            onKeyDown={(e) => e.key === 'Enter' && addTask()}    /* quando o usuário pressiona Enter, a função addTask() é chamada.*/
            placeholder="Digite uma nova task..."                /*texto exibido quando o campo está vazio.*/ 
            className="flex-1 p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all duration-300 text-lg"
          />                                                     {/*estilização com Tailwind CSS (bordas, foco, transição, tamanho da fonte etc.).*/}
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