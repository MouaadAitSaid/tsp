import {HttpEvent, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const token = localStorage.getItem('auth_token'); // Récupérer le token depuis le localStorage

  if (token) {
    // Ajouter le header Authorization
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('authInterceptor - Token ajouté:', token); // Debugging
    return next(authReq);
  }

  console.log('authInterceptor - Aucun token trouvé'); // Debugging
  return next(req);
}
