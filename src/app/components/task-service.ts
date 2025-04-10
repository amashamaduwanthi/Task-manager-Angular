import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:6060/taskManager/api/v1/task';

  constructor(private http: HttpClient) { }
  // Add a new task
  addTask(task: any): Observable<any> {
    return this.http.post(this.apiUrl, task);
  }
  //getAll Tasks
  getAllTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
// Delete a task by ID
  deleteTask(taskId: string): Observable<any> {
    const url = `${this.apiUrl}/${taskId}`;
    return this.http.delete(url);
  }
  // get task by id
  getTaskById(taskId: string): Observable<any> {
    const url = `${this.apiUrl}/${taskId}`;
    return this.http.get<any>(url);
  }

// Update task
  updateTask(task: any): Observable<any> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.put(url, task);
  }

}
