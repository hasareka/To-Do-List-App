import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  taskArr: Task[] = [];
  filteredTaskArr: Task[] = [];
  searchValue: string = '';
  addTaskValue: string = '';
  editTaskValue: string = '';
  selectedTask: Task | null = null;
  
  ngOnInit() {
    // when the component is initialized, load the tasks from local storage
    let storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.taskArr = JSON.parse(storedTasks);
    }
    // Also load the filtered tasks
    let storedFilteredTasks = localStorage.getItem('filteredTasks');
    if (storedFilteredTasks) {
      this.filteredTaskArr = JSON.parse(storedFilteredTasks);
    }
  }

  addTask() {
    if (this.addTaskValue !== "") {
        let task: Task = {
            id: this.taskArr.length + 1,
            task_name: this.addTaskValue
        };
        this.taskArr.push(task);
        this.filteredTaskArr.push(task);
        // After pushing new task, store it in local storage
        localStorage.setItem('tasks', JSON.stringify(this.taskArr));
        localStorage.setItem('filteredTasks', JSON.stringify(this.filteredTaskArr));
        this.addTaskValue = "";
    }
  }
  

  deleteTask(task: Task) {
    const taskIndex = this.taskArr.findIndex(t => t.id === task.id);
    if (taskIndex !== -1) {
      this.taskArr.splice(taskIndex, 1);
      this.filteredTaskArr = this.taskArr.filter(t =>
        t.task_name.toLowerCase().includes(this.searchValue.toLowerCase())
      );
      // After deleting the task, update it in local storage
      localStorage.setItem('tasks', JSON.stringify(this.taskArr));
      localStorage.setItem('filteredTasks', JSON.stringify(this.filteredTaskArr));
    }
  }

  filterTasks() {
    this.filteredTaskArr = this.taskArr.filter(task => 
        task.task_name.toLowerCase().includes(this.searchValue.toLowerCase())
    );
    // After filtering tasks, store it in local storage
    localStorage.setItem('filteredTasks', JSON.stringify(this.filteredTaskArr));
  }
  

  call(task: Task) {
    this.selectedTask = task;
    this.editTaskValue = task.task_name;
  }

  editTask() {
    if (this.selectedTask?.id && this.editTaskValue !== '') {
      const taskIndex = this.taskArr.findIndex(t => t.id === this.selectedTask?.id);
      if (taskIndex !== -1) {
        this.taskArr[taskIndex].task_name = this.editTaskValue;
        this.filteredTaskArr = this.taskArr.filter(t =>
          t.task_name.toLowerCase().includes(this.searchValue.toLowerCase())
        );
        // After editing the task, update it in local storage
        localStorage.setItem('tasks', JSON.stringify(this.taskArr));
        localStorage.setItem('filteredTasks', JSON.stringify(this.filteredTaskArr));
      }
    }
    this.selectedTask = null;
    this.editTaskValue = '';
  }
  
  

}