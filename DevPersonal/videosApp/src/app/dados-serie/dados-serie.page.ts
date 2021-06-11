import { Component, OnInit } from '@angular/core';
import { DadosService } from '../services/dados.service';
import { ISerie } from '../models/ISerie.model';

@Component({
  selector: 'app-dados-serie',
  templateUrl: './dados-serie.page.html',
  styleUrls: ['./dados-serie.page.scss'],
})
export class DadosSeriePage implements OnInit {

  serie: ISerie;

  constructor(public dadosService: DadosService) { }

  ngOnInit() {
    this.serie = this.dadosService.pegarDados('serie');
    console.log('Serie enviada', this.serie);
  }

}
