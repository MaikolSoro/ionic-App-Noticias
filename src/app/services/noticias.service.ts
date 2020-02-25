import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apikey;
const apiUlr = environment.apiUlr;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinesPage = 0;

  categoriaActual = '';
  categoriaPage = 0;

  constructor(private  http: HttpClient) { }

  private ejecutarQuery<T>( query: string ) {

    query = apiUlr + query;

    return this.http.get<T>( query, { headers } );

  }
  

  getTopHeadlines() {
    this.headlinesPage++;

    // tslint:disable-next-line: max-line-length
    // return this.http.get<RespuestaTopHeadlines>(`http://newsapi.org/v2/top-headlines?country=ca&apiKey=5bd1d09c17ad4dc28801c4c81728f2fc`);
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=ca&page=${ this.headlinesPage }`);
  }

  getTopHeadlinesCategoria(categoria: string) {

    if ( this.categoriaActual === categoria ) {
      this.categoriaPage++;
    } else {
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }

    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=ca&category=${ categoria }&page=${ this.categoriaPage }`);
    
  }
}
