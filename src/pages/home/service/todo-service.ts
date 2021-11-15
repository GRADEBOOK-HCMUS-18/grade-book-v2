import axios from 'axios';

class TodoService {
  async getTodo() {
    const random = Math.floor(Math.random() * 100) + 1;
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/todos/${random}`
    );

    return response.data;
  }
}

export const todoService = new TodoService();
