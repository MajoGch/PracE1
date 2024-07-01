import { Component } from '@angular/core';
import { FormsModule} from '@angular/forms';

@Component({
  selector: 'app-actividades',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './actividades.component.html',
  styleUrl: './actividades.component.css'
})
export class ActividadesComponent {
  titulo:string='Operaciones Básicas';
  numero1: number=0;
  numero2: number=0;
  resultado: number=0;
 

  sumar(): void{
    this.resultado=this.numero1+this.numero2;
  }

  restar(): void{
    this.resultado=this.numero1-this.numero2;
  }

  multiplica(): void{
    this.resultado=this.numero1*this.numero2;
  }

  divide(): void{
    this.resultado=this.numero1/this.numero2;
  }


}
