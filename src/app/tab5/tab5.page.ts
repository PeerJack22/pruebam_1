import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss'],
  standalone: false,
})
export class Tab5Page implements OnInit {
  isLoading = true;
  displayName = 'Paulo Cisneros';
  userEmail = '';
  accountStatus = 'Sesión activa';
  profileLabel = 'PC';
  github = 'PeerJack22';
  phone = '0960075234';
  location = 'Quito, Ecuador';

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    await this.loadProfile();
  }

  async loadProfile() {
    this.isLoading = true;

    const user = await this.supabaseService.getCurrentUser();

    this.userEmail = user?.email ?? '';
    this.accountStatus = user ? 'Sesión iniciada' : 'Sin sesión';
    this.profileLabel = 'PC';

    this.isLoading = false;
  }

}
