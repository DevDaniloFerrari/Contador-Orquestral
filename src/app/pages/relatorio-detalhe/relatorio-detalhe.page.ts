import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Contagem } from 'src/app/shared/contagem';
import { isUndefined } from 'util';

@Component({
  selector: 'app-relatorio-detalhe',
  templateUrl: './relatorio-detalhe.page.html',
  styleUrls: ['./relatorio-detalhe.page.scss'],
})
export class RelatorioDetalhePage implements OnInit {

  @ViewChild('barCanvas', { read: null, static: true }) barCanvas: ElementRef;

  private barChart: Chart;

  public contagem: Contagem;

  public totalDeCordas: number;
  public totalDeMadeiras: number;
  public totalDeMetais: number;

  public totalEsperadoDeCordas: number;
  public totalEsperadoDeMadeiras: number;
  public totalEsperadoDeMetais: number;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.obterParametros();
  }

  private obterParametros() {
    this.route.queryParams.subscribe(params => {
      if (!isUndefined(params.contagem)) {
        this.contagem = JSON.parse(params.contagem);
        this.criarGrafico();
      }
    });
  }

  private criarGrafico() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Cordas', 'Ideal', 'Madeiras', 'Ideal', 'Metais', 'Ideal'],
        datasets: [
          {
            label: 'Relação orquestral',
            data: [
              this.obterTotalDeCordas(),
              this.totalEsperadoDeCordas,
              this.obterTotalDeMadeiras(),
              this.totalEsperadoDeMadeiras,
              this.obterTotalDeMetais(),
              this.totalEsperadoDeMetais
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(218, 223, 225, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(218, 223, 225, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(218, 223, 225, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132, 1)',
              'rgba(218, 223, 225, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(218, 223, 225, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(218, 223, 225, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }

  private obterTotalDeCordas(): number {
    const cordas = this.contagem.instrumentos.filter(
      f =>
        f.nome === 'Violino' ||
        f.nome === 'Viola' ||
        f.nome === 'Violoncelo');

    this.totalDeCordas = 0;

    cordas.forEach(f => this.totalDeCordas += f.quantidade);

    return this.totalDeCordas;
  }

  private obterTotalDeMadeiras(): number {
    const madeiras = this.contagem.instrumentos.filter(
      f =>
        f.nome === 'Flauta Transversal' ||
        f.nome === 'Oboé' ||
        f.nome === "Oboé D'Amore" ||
        f.nome === 'Corne Inglês' ||
        f.nome === 'Clarinete' ||
        f.nome === 'Clarinete Alto' ||
        f.nome === 'Clarinete Baixo' ||
        f.nome === 'Fagote' ||
        f.nome === 'Saxofone Soprano' ||
        f.nome === 'Saxofone Alto' ||
        f.nome === 'Saxofone Tenor' ||
        f.nome === 'Saxofone Barítono');

    this.totalDeMadeiras = 0;

    madeiras.forEach(f => this.totalDeMadeiras += f.quantidade);

    return this.totalDeMadeiras;
  }

  private obterTotalDeMetais(): number {
    const metais = this.contagem.instrumentos.filter(
      f =>
        f.nome === 'Trompete / Cornet' ||
        f.nome === 'Flugelhorn' ||
        f.nome === 'Trompa' ||
        f.nome === 'Trombone / Trombonito' ||
        f.nome === 'Barítono' ||
        f.nome === 'Eufônio' ||
        f.nome === 'Tuba');

    this.totalDeMetais = 0;

    metais.forEach(f => this.totalDeMetais += f.quantidade);

    return this.totalDeMetais;
  }

  public calcularTotalEsperado(quantidadeTotalDaOrquestra: number) {
    switch (quantidadeTotalDaOrquestra) {
      case (40):
        this.totalEsperadoDeCordas = 20;
        this.totalEsperadoDeMadeiras = 10;
        this.totalEsperadoDeMetais = 10;
        this.criarGrafico();
        break;
      case (60):
        this.totalEsperadoDeCordas = 30;
        this.totalEsperadoDeMadeiras = 15;
        this.totalEsperadoDeMetais = 15;
        this.criarGrafico();
        break;
      case (80):
        this.totalEsperadoDeCordas = 40;
        this.totalEsperadoDeMadeiras = 20;
        this.totalEsperadoDeMetais = 20;
        this.criarGrafico();
        break;
      case (100):
        this.totalEsperadoDeCordas = 50;
        this.totalEsperadoDeMadeiras = 25;
        this.totalEsperadoDeMetais = 25;
        this.criarGrafico();
        break;
    }
  }

  public voltarParaTelaInicial() {
    this.navCtrl.navigateForward('tela-inicial');
  }

}
