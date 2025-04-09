import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TaskFormComponent} from './components/task-form.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,TaskFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'task-manager';
}
