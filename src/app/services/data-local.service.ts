import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];
  constructor(private storage: Storage, public toastController: ToastController) { 

    this.cargarFavoritos();
  }

  // creamos toast para que el usuario verifique que se guardo en favoritos
  async presentToast( message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500
    });
    toast.present();
  }

  // guardamos la noticia
 guardarNoticia(noticia: Article) {

  const existe = this.noticias.find( noti => noti.title === noticia.title ); // tiene la noticia si existe sino no la guarda

  if ( !existe ) {
    this.noticias.unshift( noticia );
    this.storage.set('favoritos', this.noticias );
  }

  this.presentToast( 'Agregado a favorito' );
 }

 // cargar favoritos 
  async  cargarFavoritos() {
    const favoritos = await this.storage.get('favoritos');

    if ( favoritos ) {
      this.noticias = favoritos;
    }
 }

 // Borramos la noticia
 borrarNoticia(noticia: Article) {
  this.noticias = this.noticias.filter(noti => noti.title !== noticia.title);
  this.storage.set('favoritos', this.noticias);
  this.presentToast( 'Borrado de favoritos' );
}
}
