import { QrcodeModalPage } from './../qrcode-modal/qrcode-modal.page';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { NavController, AlertController, Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Contagem } from 'src/app/shared/contagem';
import { isUndefined } from 'util';
import { ModalController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;




@Component({
  selector: 'app-relatorio-detalhe',
  templateUrl: './relatorio-detalhe.page.html',
  styleUrls: ['./relatorio-detalhe.page.scss'],
})
export class RelatorioDetalhePage implements OnInit {

  @ViewChild('barCanvas', { read: null, static: true }) barCanvas: ElementRef;

  private barChart: Chart;

  public contagem: Contagem;
  public qrcode: string;

  public contagemEscaneada: Contagem;

  public chave: string;

  public totalDeCordas: number;
  public totalDeMadeiras: number;
  public totalDeMetais: number;

  public totalEsperadoDeCordas: number;
  public totalEsperadoDeMadeiras: number;
  public totalEsperadoDeMetais: number;

  pdfObj = null;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private modalController: ModalController,
    private platform: Platform,
    private file: File,
    private fileOpener: FileOpener
  ) { }

  ngOnInit() {
    this.obterParametros();
    this.gerarQrCode();
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

  private obterTotalGeral(): number {
    return this.totalDeCordas + this.totalDeMadeiras + this.totalDeMetais;
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

  private gerarQrCode() {
    this.qrcode = JSON.stringify(this.contagem);
  }

  public async abrirModalDoQrCode() {
    const modal = await this.modalController.create({
      component: QrcodeModalPage, componentProps: {
        qrcode: this.qrcode
      }
    });
    return await modal.present();
  }

  public exportarPdf() {
    const docDefinition = {
      content: [
        { text: this.contagem.descricao, style: 'header' },
        { text: this.contagem.data, alignment: 'right' },

        { text: 'Cordas', style: 'subheader', alignment: 'center' },
        {
          table: {
            headerRows: 1,
            widths: [100, 50],

            body: [
              ['Violino', { text: this.obterQuantidade('Violino'), alignment: 'center' }],
              ['Viola', { text: this.obterQuantidade('Viola'), alignment: 'center' }],
              ['Violoncelo', { text: this.obterQuantidade('Violoncelo'), alignment: 'center' }]
            ]
          },

        },

        { text: 'Madeiras', style: 'subheader', alignment: 'center' },
        {
          table: {
            headerRows: 1,
            widths: [100, 50],

            body: [
              ['Flauta Transversal', { text: this.obterQuantidade('Flauta Transversal'), alignment: 'center' }],
              ['Oboé', { text: this.obterQuantidade('Oboé'), alignment: 'center' }],
              ["Oboé D'Amore", { text: this.obterQuantidade("Oboé D'Amore"), alignment: 'center' }],
              ['Corne Inglês', { text: this.obterQuantidade('Corne Inglês'), alignment: 'center' }],
              ['Clarinete', { text: this.obterQuantidade('Clarinete'), alignment: 'center' }],
              ['Clarinete Alto', { text: this.obterQuantidade('Clarinete Alto'), alignment: 'center' }],
              ['Clarinete Baixo', { text: this.obterQuantidade('Clarinete Baixo'), alignment: 'center' }],
              ['Fagote', { text: this.obterQuantidade('Fagote'), alignment: 'center' }],
              ['Saxofone Soprano', { text: this.obterQuantidade('Saxofone Soprano'), alignment: 'center' }],
              ['Saxofone Alto', { text: this.obterQuantidade('Saxofone Alto'), alignment: 'center' }],
              ['Saxofone Tenor', { text: this.obterQuantidade('Saxofone Tenor'), alignment: 'center' }],
              ['Saxofone Barítono', { text: this.obterQuantidade('Saxofone Barítono'), alignment: 'center' }],
            ]
          },

        },

        { text: 'Metais', style: 'subheader', alignment: 'center' },
        {
          table: {
            headerRows: 1,
            widths: [150, 50],

            body: [
              ['Trompete / Cornet', { text: this.obterQuantidade('Trompete / Cornet'), alignment: 'center' }],
              ['Flugelhorn', { text: this.obterQuantidade('Flugelhorn'), alignment: 'center' }],
              ['Trompa', { text: this.obterQuantidade('Trompa'), alignment: 'center' }],
              ['Trombone / Trombonito', { text: this.obterQuantidade('Trombone / Trombonito'), alignment: 'center' }],
              ['Barítono', { text: this.obterQuantidade('Barítono'), alignment: 'center' }],
              ['Eufônio', { text: this.obterQuantidade('Eufônio'), alignment: 'center' }],
              ['Tuba', { text: this.obterQuantidade('Tuba'), alignment: 'center' }]
            ]
          }
        },

        { text: 'Total', style: 'subheader', alignment: 'center' },
        {
          table: {
            headerRows: 1,
            widths: [150, 50],
            alignment: 'center',

            body: [
              ['Cordas', { text: this.totalDeCordas, alignment: 'center' }],
              ['Madeiras', { text: this.totalDeMadeiras, alignment: 'center' }],
              ['Metais', { text: this.totalDeMetais, alignment: 'center' }],
              [{ text: 'Total geral', bold: true }, { text: this.obterTotalGeral(), alignment: 'center', bold: true }],
            ]
          }
        },

      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        story: {
          italic: true,
          alignment: 'center',
          width: '50%',
        }
      }
    }

    this.pdfObj = pdfMake.createPdf(docDefinition);

    this.downloadPdf();
  }

  private downloadPdf() {
    if (this.platform.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        const blob = new Blob([buffer], { type: 'application/pdf' });

        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'contagem.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'contagem.pdf', 'application/pdf');
        });
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  }

  private obterQuantidade(nomeDoInstrumento: string) {
    return this.contagem.instrumentos.find(f => f.nome === nomeDoInstrumento).quantidade;
  }

  public voltarParaTelaInicial() {
    this.navCtrl.navigateForward('tela-inicial');
  }

}
