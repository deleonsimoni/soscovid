import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
@Injectable({
	providedIn: 'root'
})
export class AuthHeaderInterceptor implements HttpInterceptor {

	constructor(
		private authService: AuthService
	) { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		const token = this.authService.getToken();

		if (token) {
			const request = req.clone({
				headers: req.headers.set('Authorization', 'Bearer ' + token)
			});

			return next.handle(request);
		}

		return next.handle(req);

	}
}
