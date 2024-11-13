import { Component, signal } from '@angular/core';

import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  welcome = 'Bienvenido a mi primer proyecto en Angular';
  tasks = signal([
    'Instalar el Angular CLI',
    'Crear proyecto',
    'Crear componentes'
  ]);

  colorCtrl = new FormControl();
  widthCtrl = new FormControl(50, {
    nonNullable: true,
  });

  nameCtrl = new FormControl(50, {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(3)
    ]
  });


  constructor(){
    this.colorCtrl.valueChanges.subscribe(value => {
      console.log(value)
    });
  }

  name = signal('Higuita');
  disabled = false;
  person = signal({
    name: 'Higuita',
    age: 26,
    avatar: 'https://w3schools.com/howto/img_avatar.png'
  });

  clickHandler(){
    alert('Evento Click!')
  }

  DoubleClickHandler(){
    alert('Evento Doble Click!')
  }

 changeHandler(event: Event){
  const input = event.target as HTMLInputElement;
  const newValue = input.value;
  this.name.set(newValue);

 }

 keydownHandler(event: KeyboardEvent){
  const input = event.target as HTMLInputElement;
  console.log(input.value);
 }

 changeAge(event: Event){
  const input = event.target as HTMLInputElement;
  const newValue = input.value;
  this.person.update((prevState) => {
    return{
      ...prevState,
      age: parseInt(newValue, 10)
    }
  });
 }

 changeName(event: Event){
  const input = event.target as HTMLInputElement;
  const newValue = input.value;
  this.person.update((prevState) => {
    return{
      ...prevState,
      name: newValue
    }
  });
 }

}
