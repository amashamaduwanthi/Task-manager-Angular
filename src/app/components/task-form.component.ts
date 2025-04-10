import { Component, OnInit } from '@angular/core';
import { TaskService } from './task-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-task-form',
  standalone: true,
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
  imports: [FormsModule, CommonModule],
})
export class TaskFormComponent implements OnInit {
  task = {
    id: '',
    title: '',
    description: '',
    completed: ''
  };
  tasks: any[] = [];
  selectedTask: any;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getTasks();  // Fetch tasks on component initialization
  }

  // Fetch all tasks from the service
  getTasks(): void {
    this.taskService.getAllTasks().subscribe({
      next: (response) => {
        this.tasks = response;  // Assign the fetched tasks to the tasks array
      },
      error: (err) => {
        console.error('Error fetching tasks:', err);
        alert('Error fetching tasks');
      }
    });
  }

  // Add a new task
  onSubmit(): void {
    this.taskService.addTask(this.task).subscribe({
      next: (response) => {
        console.log('Task successfully added:', response);
        alert('Task successfully added');
        this.resetForm();
        this.getTasks();
      },
      error: (err) => {
        console.error('Error adding task:', err);
        alert('Error adding task');
      }
    });
  }
  // Delete task method
  deleteTask(taskId: string): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId).subscribe({
        next: (response) => {
          console.log('Task deleted successfully:', response);
          alert('Task deleted successfully');
          this.getTasks(); // Refresh the task list
        },
        error: (err) => {
          console.error('Error deleting task:', err);
          alert('Error deleting task');
        }
      });
    }
  }
  // getSelectedTask(id: string): void {
  //   this.taskService.getTaskById(id).subscribe({
  //     next: (response) => {
  //       console.log('Selected task:', response);
  //       this.selectedTask = response;
  //     },
  //     error: (err) => {
  //       console.error('Error fetching task:', err);
  //       alert('Error fetching task');
  //     }
  //   });
  // }
  //
  // updateTask(): void {
  //   this.taskService.updateTask(this.task).subscribe({
  //     next: (response) => {
  //       console.log('Task successfully updated:', response);
  //       alert('Task successfully updated');
  //       this.resetForm();
  //       this.getTasks(); // Refresh task list
  //     },
  //     error: (err) => {
  //       console.error('Error updating task:', err);
  //       alert('Error updating task');
  //     }
  //   });
  // }
  //


  getSelectedTask(id: string): void {
    this.taskService.getTaskById(id).subscribe({
      next: (response) => {
        console.log('Selected task:', response);
        this.task = response; // Populate the form fields with the selected task's data
      },
      error: (err) => {
        console.error('Error fetching task:', err);
        alert('Error fetching task');
      }
    });
  }

  updateTask(): void {
    this.taskService.updateTask(this.task).subscribe({
      next: (response) => {
        console.log('Task updated successfully:', response);
        alert('Task updated successfully');
        this.getTasks();
      },
      error: (err) => {
        console.error('Error updating task:', err);
        alert('Error updating task');
      }
    });
  }


//reset form
  resetForm(): void {
    this.task = {
      id: '',
      title: '',
      description: '',
      completed: ''
    };
  }
}
