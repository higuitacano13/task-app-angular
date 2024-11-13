import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
 // -> Importar componente

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], //-> Instancias de componentes ya creados
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
