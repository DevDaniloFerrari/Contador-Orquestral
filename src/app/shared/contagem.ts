import { Instrumento } from './instrumento';

export class Contagem{
    descricao: string;
    data: string;
    instrumentos: Array<Instrumento>;
    finalizada: boolean;
    contagemIntegrada: boolean;

    constructor(descricao: string, data: string, contagemIntegrada: boolean) {
        this.descricao = descricao;
        this.data = data;
        this.instrumentos = [
            new Instrumento('Violino' , 0),
            new Instrumento('Viola' , 0),
            new Instrumento('Violoncelo' , 0),
            new Instrumento('Flauta Transversal' , 0),
            new Instrumento('Oboé' , 0),
            new Instrumento("Oboé D'Amore" , 0),
            new Instrumento('Corne Inglês' , 0),
            new Instrumento('Clarinete' , 0),
            new Instrumento('Clarinete Alto' , 0),
            new Instrumento('Clarinete Baixo' , 0),
            new Instrumento('Fagote' , 0),
            new Instrumento('Saxofone Soprano' , 0),
            new Instrumento('Saxofone Alto' , 0),
            new Instrumento('Saxofone Tenor' , 0),
            new Instrumento('Saxofone Barítono' , 0),
            new Instrumento('Trompete / Cornet' , 0),
            new Instrumento('Flugelhorn' , 0),
            new Instrumento('Trompa' , 0),
            new Instrumento('Trombone / Trombonito' , 0),
            new Instrumento('Barítono' , 0),
            new Instrumento('Eufônio' , 0),
            new Instrumento('Tuba' , 0)
        ];
        this.finalizada = false;
        this.contagemIntegrada = contagemIntegrada;
    }
}
