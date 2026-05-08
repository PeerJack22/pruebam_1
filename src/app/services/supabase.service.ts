import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class SupabaseService {
    private supabase: SupabaseClient | null = null;

  constructor() {
    this.initializeSupabase();
  }

  private initializeSupabase() {
    const supabaseUrl = environment.supabaseUrl;
    const supabaseKey = environment.supabaseKey;

    if (supabaseUrl && supabaseKey) {
      try {
        this.supabase = createClient(supabaseUrl, supabaseKey);
      } catch (error) {
        console.warn('Supabase not initialized. Check your credentials.', error);
      }
    } else {
      console.warn('Supabase credentials not found in environment configuration.');
    }
  }

  async login(email: string, password: string) {
    try {
      if (!this.supabase) {
        return { data: null, error: { message: 'Supabase not configured. Please set your credentials.' } };
      }
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email,
        password
      });
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  }

  async register(email: string, password: string) {
    try {
      if (!this.supabase) {
        return { data: null, error: { message: 'Supabase not configured. Please set your credentials.' } };
      }
      const { data, error } = await this.supabase.auth.signUp({
        email,
        password
      });
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  }

  async logout() {
    try {
      if (!this.supabase) {
        return { error: 'Supabase not configured' };
      }
      return await this.supabase.auth.signOut();
    } catch (error) {
      return error;
    }
  }

  async getCurrentUser() {
    try {
      if (!this.supabase) {
        return null;
      }
      const { data: { user } } = await this.supabase.auth.getUser();
      return user;
    } catch (error) {
      return null;
    }
  }
}
