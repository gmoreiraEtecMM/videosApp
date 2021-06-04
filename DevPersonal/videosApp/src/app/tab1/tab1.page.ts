import { IFilme } from '../models/IFilme.model';
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { DadosService } from '../services/dados.service';
import { Router } from '@angular/router';
import { FilmeService } from '../services/filme.service';
import { IListaFilmes, IFilmeApi } from '../models/IFilmeAPI.model';
import { GeneroService } from '../services/genero.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  titulo = 'Filmes';

  listaVideos: IFilme[] = [
    {
      nome: 'A guerra dos tronos',
      lancamento: '11/02/2018',
      duracao: '1h 50m',
      classificacao: 45,
      cartaz: 'https://www.themoviedb.org/t/p/w1280/mQ9cyw1gfpK1M3a69cgXFHvWkih.jpg',
      generos: ['Ação','Ficção'],
      pagina:'/mortal-kombat'

    },
    {
      nome: 'Rota de fuga 3',
      lancamento: '10/02/2020',
      duracao: '1h 30m',
      classificacao: 76,
      cartaz: 'https://www.themoviedb.org/t/p/w1280/mQ9cyw1gfpK1M3a69cgXFHvWkih.jpg',
      generos: ['Fatos reais','Romance'],
      pagina:'/liga-justica'
    },
    {
      nome: 'Falcão o Soldado Universal',
      lancamento: '15/04/2019',
      duracao: '1h 23m',
      classificacao: 80,
      cartaz: 'https://www.themoviedb.org/t/p/w1280/w8Hi3GI4q1oR6EImrDWrAQFn8Ha.jpg',
      generos: ['Ação','Ficção'],
      pagina:'/liga-justica'
    },
    {
      nome: 'TOM & JERRY',
      lancamento: '15/04/2021',
      duracao: '1h 00m',
      classificacao: 90,
      cartaz: 'https://www.themoviedb.org/t/p/w1280/9NvYyM8H6d5KAVGqpyFV9YPO5cU.jpg',
      generos: ['Ficção','Romance'],
      pagina:'/liga-justica'
    },
    {
      nome: 'Autodestruição ',
      lancamento: '15/04/2020',
      duracao: '2h 10m',
      classificacao: 55,
      cartaz: 'https://www.themoviedb.org/t/p/w1280/2A3FETGysWKyYREI3YGzfpNKr8K.jpg',
      generos: ['Ação','Fatos reais'],
      pagina:'/liga-justica'
    }

  ];

  listaFilmes: IListaFilmes;

  generos: string[] = [];

  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
    public dadosService: DadosService,
    public filmeServices: FilmeService,
    public generoService: GeneroService,
    public route: Router) {  }

  buscarFilmes(evento: any){
    console.log(evento.target.value);
    const busca = evento.target.value;
    if(busca && busca.trim() !== ''){
      this.filmeServices.buscarFilmes(busca).subscribe(dados => {
          console.log(dados);
          this.listaFilmes = dados;
      });
    }
  }

  exibirFilme(filme: IFilmeApi){
    this.dadosService.guardarDados('filme', filme);
    this.route.navigateByUrl('/dados-filme');
  }

  async exibirAlertaFavorito() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta!',
      message: 'Deseja realmente favoritar o filme?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.apresentarToast();
          }
        }
      ]
    });

    await alert.present();
  }

  async apresentarToast() {
    const toast = await this.toastController.create({
      message: 'Filme adicionado aos favoritos.',
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }

  ngOnInit(){
    this.generoService.buscarGeneros().subscribe(dados => {
      console.log('Generos', dados.genres);
      dados.genres.forEach(genero => {
        this.generos[genero.id] = genero.name;
      });

      this.dadosService.guardarDados('generos', this.generos);

    });

  }

}
