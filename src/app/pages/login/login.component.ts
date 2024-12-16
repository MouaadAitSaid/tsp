import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        // Sauvegarde le token reçu
        this.authService.saveToken(response.token);

        // Récupère le rôle de l'utilisateur
        const role = this.authService.getRole();
        // Redirection basée sur le rôle
        if (role === 'SUPERADMIN') {
          this.router.navigate(['/user-management']);
        } else  if (role === 'MANAGER') {
          this.router.navigate(['/task-management']);

        } else{
          // Ajoutez des redirections pour d'autres rôles ici
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        // Gestion des erreurs de connexion
        if (err.status === 401) {
          this.errorMessage = 'Nom d’utilisateur ou mot de passe incorrect.';
        } else {
          this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
        }
      },
    });
  }
}
