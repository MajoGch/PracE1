import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';  // Importa HttpClientModule


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet,HeaderComponent,FooterComponent,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  titulo = 'ProyectoBase';
}
