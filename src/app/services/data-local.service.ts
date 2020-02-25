import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];
  constructor(private storage: Storage) { }

  // guardamos la noticia
 guardarNoticia(noticia: Article) {

  const existe = this.noticias.find( noti => noti.title === noticia.title ); // tiene la noticia si existe sino no la guarda

  if ( !existe ) {
    this.noticias.unshift( noticia );
    this.storage.set('favoritos', this.noticias );
  }


 }
 cargarNoticia(){

 }
}
