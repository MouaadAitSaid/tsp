import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService<T> {
  private baseUrl = 'http://localhost:8080/api'; // URL de base de ton API

  constructor(private http: HttpClient) {
  }

  // Récupérer tous les éléments
  getAll(endpoint: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}/${endpoint}`);
  }

  // Récupérer un élément par ID
  getById(endpoint: string, id: number): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}/${id}`);
  }

  // Créer un nouvel élément
  create(endpoint: string, item: T): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, item);
  }

  // Mettre à jour un élément
  update(endpoint: string, id: number, item: T): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}/${id}`, item);
  }

  // Supprimer un élément
  delete(endpoint: string, id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${endpoint}/${id}`);
  }

  // Recherche avec pagination et filtres
  searchFilterPagination(
    endpoint: string,
    searchRequest: {
      searchTerm?: string;
      page?: number;
      size?: number;
      filters?: { [key: string]: any };
      searchableFields?: string[]
    }
  ): Observable<any> {
    return this.http.post(`${this.baseUrl}/${endpoint}/search`, searchRequest);
  }
}


