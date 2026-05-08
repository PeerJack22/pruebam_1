import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    try {
      const user = await this.supabaseService.getCurrentUser();
      
      if (user) {
        return true;
      } else {
        this.router.navigateByUrl('/login');
        return false;
      }
    } catch (error) {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
