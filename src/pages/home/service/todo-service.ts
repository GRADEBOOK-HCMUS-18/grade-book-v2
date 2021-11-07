import { httpService } from "shared/services";

class TodoService {
  async getTodo() {
    const random = Math.floor(Math.random() * 100) + 1;
    const data = await httpService.sendGet(
      `https://jsonplaceholder.typicode.com/todos/${random}`,
      ""
    );
    return data;
  }
}

export const todoService = new TodoService();
