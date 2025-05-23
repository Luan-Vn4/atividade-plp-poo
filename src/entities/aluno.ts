export enum Curso {
    ENGENHARIA_DE_SOFTWARE = "Engenharia de Software",
    LICENCIATURA_EM_COMPUTACAO = "Licenciatura em Computação"
  }
  
  export class Aluno {
    constructor(
      public nome: string,
      public curso: Curso,
      public matricula: string,
      public periodo: number
    ) {}
  
    reclamarProvaDificil(): void {
      console.log(`\n${this.nome}: Professor, essa prova estava muito difícil!`);
    }
    
  }
  