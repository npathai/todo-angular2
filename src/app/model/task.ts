export class Task {
  id: string;
  name: string;
  isDone: boolean;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    this.isDone = false;
  }
}
