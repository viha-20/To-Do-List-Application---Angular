import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../service/crud.service';
import { Task } from '../../model/task';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  taskObj: Task = new Task();
  taskArr: Task[] = [];

  addTaskValue: string = '';
  editTaskValue: string = '';

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.editTaskValue = '';
    this.addTaskValue = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();
  }
  // getAllTask() {
  //   this.crudService.getAllTask().subscribe(res => {
  //     this.taskArr = res;
  //   }, err => {
  //     alert("Unable to get list of tasks");
  //   });
  // }

  // addTask() {
  //   this.taskObj.task_name = this.addTaskValue;
  //   this.crudService.addTask(this.taskObj).subscribe(res => {
  //     this.ngOnInit();
  //     this.addTaskValue = '';
  //   }, err => {
  //     alert(err);
  //   })
  // }


  getAllTask() {
    this.crudService.getAllTask().subscribe({
      next: (res) => {
        console.log('Response:', res);
        this.taskArr = res;
      },
      error: (err) => {
        console.error('Error:', err);
        alert("Unable to get list of tasks");
      }
    });
  }


  addTask() {
    this.taskObj.task_name = this.addTaskValue;

    this.crudService.addTask(this.taskObj).subscribe({
      next: (res: Task) => {
        this.ngOnInit();
        this.addTaskValue = '';
      },
      error: (err: any) => {
        alert(err);
      }
    });
  }

  editTask() {
    this.taskObj.task_name = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe({
      next: (res) => {
        this.ngOnInit();
      },
      error: (err) => {
        alert("Failed to update task");
      }
    });
  }

  deleteTask(etask: Task) {
    this.crudService.deleteTask(etask).subscribe({
      next: (res) => {
        console.log('Delete success:', res);
        this.ngOnInit();
      },
      error: (err) => {
        console.error('Delete error:', err);
        alert("Failed to delete task");
      }
    });
  }




  // editTask() {
  //   this.taskObj.task_name = this.editTaskValue;
  //   this.crudService.editTask(this.taskObj).subscribe(res => {
  //     this.ngOnInit();
  //   }, err => {
  //     alert("Failed to update task");
  //   })
  // }

  // deleteTask(etask: Task) {
  //   this.crudService.deleteTask(etask).subscribe(res => {
  //     this.ngOnInit();
  //   }, err => {
  //     alert("Failed to delete task");
  //   });
  // }

  call(etask: Task) {
    this.taskObj = etask;
    this.editTaskValue = etask.task_name;
  }

}
