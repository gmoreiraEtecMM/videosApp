import { ISerie } from '../models/ISerie.model';
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { DadosService } from '../services/dados.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  titulo = 'Séries';

  listaSeries: ISerie[] = [
    {
      nome: 'Loki',
      lancamento: '09/06/2021',
      duracao: '52 m',
      classificacao: 82,
      cartaz: 'https://www.themoviedb.org/t/p/w1280/ukR0MkCQE6IylzBPd61txJi1L3E.jpg',
      generos: ['Ação','Ficção']

    },
    {
      nome: 'Flash',
      lancamento: '07/10/2014',
      duracao: '44 m',
      classificacao: 77,
      cartaz: 'https://www.themoviedb.org/t/p/w1280/wHa6KOJAoNTFLFtp7wguUJKSnju.jpg',
      generos: ['Ação','Ficção']

    },
    {
      nome: 'Game of Thrones',
      lancamento: '2011',
      duracao: '1h',
      classificacao: 84,
      cartaz: 'https://www.themoviedb.org/t/p/w1280/mQ9cyw1gfpK1M3a69cgXFHvWkih.jpg',
      generos: ['Ação','Drama','Ficção']

    },
    {
      nome: 'The Good Doctor: O Bom Doutor',
      lancamento: '25/07/2017',
      duracao: '43m',
      classificacao: 86,
      cartaz: 'https://www.themoviedb.org/t/p/w1280/jtLB7xJKcbekmOYkb5NZditBsgk.jpg',
      generos: ['Drama']

    },
    {
      nome: 'Grey s Anatomy',
      lancamento: '27/03/2005',
      duracao: '43m',
      classificacao: 82,
      cartaz: 'https://www.themoviedb.org/t/p/w1280/1HAm7sxXu9eGVvs8BIAlkCKGaTd.jpg',
      generos: ['Drama']

    }
  ];

  constructor(public alertController: AlertController, public toastController: ToastController, public dadosService: DadosService,
    public route: Router) {  }

  exibirSerie(serie: ISerie){
    this.dadosService.guardarDados('serie', serie);
    this.route.navigateByUrl('/dados-serie');
  }

  async exibirAlertaFavorito() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta!',
      message: 'Deseja realmente favoritar a série?',
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
      message: 'Série adicionada aos favoritos.',
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }

}
