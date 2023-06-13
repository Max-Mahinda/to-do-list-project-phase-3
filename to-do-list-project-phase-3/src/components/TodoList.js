import React, { useState, useEffect } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [name, setName] = useState('');
  const [todo, setTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [user, setUser] = useState(null);

  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:9292/todos');
      if (response.ok) {
        const data = await response.json();
        setTodos(data);
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await fetch('http://localhost:9292/users/:id');
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleTodoChange = (event) => {
    setTodo(event.target.value);
  };

  const handleAddTodo = async () => {
    if (name.trim() !== '' && todo.trim() !== '') {
      if (editingId) {
        // Editing existing task
        try {
          const response = await fetch(`http://localhost:9292/todos/${editingId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, todo }),
          });
          if (response.ok) {
            fetchTodos();
            setName('');
            setTodo('');
            setEditingId(null);
          }
        } catch (error) {
          console.error('Error editing todo:', error);
        }
      } else {
        // Adding new task
        const newTodo = { name, todo };
        try {
          const response = await fetch('http://localhost:9292/todos', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTodo),
          });
          if (response.ok) {
            fetchTodos();
            setName('');
            setTodo('');
          }
        } catch (error) {
          console.error('Error adding todo:', error);
        }
      }
    }
  };

  const handleEditTodo = (todoId) => {
    const todoToEdit = todos.find((todo) => todo.id === todoId);
    if (todoToEdit) {
      setName(todoToEdit.name);
      setTodo(todoToEdit.todo);
      setEditingId(todoId);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      const response = await fetch(`http://localhost:9292/todos/${todoId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchTodos();
        if (editingId === todoId) {
          setName('');
          setTodo('');
          setEditingId(null);
        }
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
    fetchUser();
  }, []);

  return (
    <div>
      <h2>Todo List</h2>
      {user && (
        <div>
          <p>Welcome, {user.name}!</p>
          <p>Email: {user.email}</p>
        </div>
      )}
      <div>
        <label htmlFor="nameInput">Name:</label>
        <input
          type="text"
          id="nameInput"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter your name"
        />
      </div>
      <div>
        <label htmlFor="todoInput">Todo:</label>
        <input
          type="text"
          id="todoInput"
          value={todo}
          onChange={handleTodoChange}
          placeholder="Enter a task"
        />
      </div>
      <button onClick={handleAddTodo}>{editingId ? 'Edit' : 'Add'}</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <div>
              <strong>{todo.name}:</strong> {todo.todo}
            </div>
            <button onClick={() => handleEditTodo(todo.id)}>Edit</button>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
