import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../app/model/task';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(tasks: Task[], searchValue: string): Task[] {
    if (!tasks || !searchValue) {
      return tasks;
    }
    return tasks.filter(task => task.task_name.toLowerCase().includes(searchValue.toLowerCase()));
  }
}
