import { Component, computed, effect, inject, Injector, signal } from '@angular/core';

import { Task } from '../../models/task.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent {

  injector = inject(Injector);

  ngOnInit(){
    const storage = localStorage.getItem('tasks'); // -> Obtener de localStorage
    if(storage){
      const tasks = JSON.parse(storage);
      this.tasks.set(tasks);
    }
    this.trackTasks();
  }

  trackTasks(){
    effect(() => {
      const tasks = this.tasks();
      console.log(tasks)
      localStorage.setItem('tasks', JSON.stringify(tasks)); // -> Guardar en localStorage
    }, {injector: this.injector});
  }

  tasks = signal<Task[]>([]);
  filter = signal<'all'| 'pending'| 'completed'>('all');

  // --- Usar computed state para crear estado a partir de estados --- //
  taskByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();
    if(filter === 'pending'){
      return tasks.filter(task => !task.completed);
    }

    if(filter === 'completed'){
      return tasks.filter(task => task.completed);
    }

    return tasks;
  });

  // --- Crear un control de formulario para el input --- //
  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
    ]
  });

  // --- Leer el evento del input --- //
  changeHandler(event: Event){
    const input = event.target as HTMLInputElement;
    const newTask = input.value;
    this.addTask(newTask);
  }

  // --- Utilizar el form control --- //
  inputHandler(){
    const isValid = this.newTaskCtrl.valid;
    const value = this.newTaskCtrl.value;

    if(isValid && value.trim() !== ''){
      this.addTask(value);
      this.newTaskCtrl.setValue('')
    }
  }

  // --- Agregar un nuevo valor a una señal! --- //
  addTask(title: string){
    const newTask = {
      id: Date.now(),
      title: title,
      completed: false
    };
    this.tasks.update((tasks) => [...tasks, newTask]); 
  }

  // --- Filtrar un array por posición! --- //
  deleteTask(index: number){
    this.tasks.update((tasks) => tasks.filter((task, position) => position != index)); 
  }

  // --- Actualizar un campo con base en una posición --- //
  updateTaskName(index: number){
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if(position == index){
          return {
            ...task,
            completed: !task.completed
          }
        }
        return task;
      })
    }); 
  }

  // --- Activar modo de edición --- //
  updateTaskEditingMode(index: number ){
    this.tasks.update((prevState) => {
      return prevState.map((task, position) => {
        if(position === index){
          return {
            ...task,
            editing: true
          }
        }
        return {
          ...task,
          editing: false
        };
      });
    })
  }

  // --- Modificar titulo tarea --- //
  updateTaskText(index: number, event: Event){
    const input = event.target as HTMLInputElement;
    this.tasks.update((prevState) => {
      return prevState.map((task, position) => {
        if(position === index){
          return {
            ...task,
            title: input.value,
            editing: false
          }
        }
        return task;
      });
    })
  }

  // --- Filtrar por estado --- //
  changeFilter(filter: 'all'| 'pending'| 'completed'){
    this.filter.set(filter)
  }

}
