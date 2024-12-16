import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'auth_token'; // Clé pour stocker le token dans localStorage

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Appelle l'API de connexion pour authentifier l'utilisateur.
   * @param username Nom d'utilisateur
   * @param password Mot de passe
   */
  login(username: string, password: string) {
    return this.http.post<{ token: string }>('http://localhost:8080/auth/login', { username, password });
  }

  /**
   * Stocke le token dans localStorage
   * @param token Token JWT
   */
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  /**
   * Retourne le token stocké
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Décode le rôle depuis le token JWT
   */
  getRole(): string | null {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1])); // Décodage du payload
      return payload.role; // Assurez-vous que "role" est inclus dans le token
    }
    return null;
  }

  /**
   * Déconnexion : supprime le token
   */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  /**
   * Vérifie si l'utilisateur est authentifié
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
