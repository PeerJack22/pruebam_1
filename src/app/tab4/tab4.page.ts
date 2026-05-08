import { Component } from '@angular/core';
import type { UserPhoto } from "../services/photo.service";
import { PhotoService } from "../services/photo.service";
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  standalone: false,
})
export class Tab4Page {
  constructor(public photoService: PhotoService, public actionSheetController: ActionSheetController) {}

  // CHANGE: Add call to `loadSaved()` when navigating to the Photos tab
  async ngOnInit() {
    await this.photoService.loadSaved();
  }

  addPhotoToGallery() {
    console.log('Abriendo cámara...');
    this.photoService.addNewToGallery().catch(error => {
      console.error('Error al capturar foto:', error);
      alert('Error: ' + (error?.message || 'No se pudo capturar la foto'));
    });
  }

  // CHANGE: Add `showActionSheet()` method
  public async showActionSheet(photo: UserPhoto, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.photoService.deletePhoto(photo, position);
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            // Nothing to do, action sheet is automatically closed
          },
        },
      ],
    });
    await actionSheet.present();
  }
}