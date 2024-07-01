import { Component } from '@angular/core';
import { FormsModule} from '@angular/forms';

@Component({
  selector: 'app-conversiones',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './conversiones.component.html',
  styleUrl: './conversiones.component.css'
})
export class ConversionesComponent {
  titulo:string='Conversiones de Temperatura';
  grados: number=0.0;
  conversion: number=0.0;

  farenheit (): void{
    this.conversion = this.grados*1.8+32;
  }
  kelvin(): void{
    this.conversion= this.grados+273;
  }
}
