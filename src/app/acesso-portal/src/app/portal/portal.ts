import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-portal',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './portal.html',
  styleUrl: './portal.css'
})
export class Portal {

  constructor(private router: Router) {}

  materiaAberta: number | null = null;

  voltarLogin() {
    this.router.navigate(['/']);
  }

  toggleMaterial(index: number) {
    if (this.materiaAberta === index) {
      this.materiaAberta = null;
    } else {
      this.materiaAberta = index;
    }
  }

}