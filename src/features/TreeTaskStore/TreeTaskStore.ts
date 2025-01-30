import { makeAutoObservable } from "mobx";

interface Task {
  id: number;
  text: string;
  completed: boolean;
  subTasks: Task[];
}

export class TreeTaskStore {
  tasks: Task[] = [];
  private uniqId = 1;

  constructor() {
    makeAutoObservable(this);
  }

  findTaskRecursive(tasks: Task[], id: number): Task | undefined {
    for (const task of tasks) {
      if (task.id === id) return task;
      const findNext = this.findTaskRecursive(task.subTasks, id);
      if (findNext) return findNext;
    }
    return undefined;
  }

  findTask(id: number): Task | undefined {
    return this.findTaskRecursive(this.tasks, id);
  }

  findParentRecursive(tasks: Task[], id: number): Task | undefined {
    for (const task of tasks) {
      if (task.subTasks.some((subtask) => subtask.id === id)) return task;
      const findNext = this.findParentRecursive(task.subTasks, id);
      if (findNext) return findNext;
    }
    return undefined;
  }

  findParent(id: number): Task | undefined {
    return this.findParentRecursive(this.tasks, id);
  }

  private subTasksCompleted(task: Task, completed: boolean) {
    task.subTasks.forEach((subtask) => {
      subtask.completed = completed;
      this.subTasksCompleted(subtask, completed);
    });
  }

  private parentTaskIsCompleted(task: Task) {
    const parentTask = this.findParent(task.id);

    if (parentTask) {
      parentTask.completed = parentTask.subTasks.every(
        (subtask) => subtask.completed
      );
      this.parentTaskIsCompleted(parentTask);
    }
  }

  toggleTask(id: number) {
    const task = this.findTask(id);
    if (task) {
      task.completed = !task.completed;
      this.subTasksCompleted(task, task.completed);
      this.parentTaskIsCompleted(task);
    }
  }

  addTask(title: string) {
    this.tasks.push({
      id: this.uniqId++,
      text: title,
      completed: false,
      subTasks: [],
    });
  }

  addSubTask(title: string, parentId: number) {
    const parentTask = this.findTask(parentId);
    if (parentTask) {
      parentTask.subTasks.push({
        id: this.uniqId++,
        text: title,
        completed: false,
        subTasks: [],
      });
    }
  }
}
