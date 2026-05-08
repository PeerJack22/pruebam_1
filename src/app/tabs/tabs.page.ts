import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: false,
})
export class TabsPage {

  constructor(private router: Router, private supabaseService: SupabaseService) {}

  async logout() {
    await this.supabaseService.logout();
    this.router.navigateByUrl('/login');
  }

}
