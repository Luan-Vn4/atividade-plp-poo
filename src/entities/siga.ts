import { Disciplina } from "./disciplina";
import { Aluno, Curso } from "./aluno";
import * as readline from "readline";

export class Siga {
  private executando: boolean = true;
  private disciplina: Disciplina;

  constructor(disciplina: Disciplina) {
    this.disciplina = disciplina;
  }

  async main(): Promise<void> {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const ask = (question: string): Promise<string> =>
      new Promise(resolve => rl.question(question, resolve));

    while (this.executando) {
      console.log("\nMenu:");
      console.log("1. Cadastrar aluno");
      console.log("2. Adicionar nota");
      console.log("3. Remover aluno");
      console.log("4. Listar alunos");
      console.log("5. Sair");

      const opcao = await ask("Escolha uma opção: ");

      switch (opcao) {
        case "1":
          await this.cadastrarAluno(ask);
          break;
        case "2":
          await this.adicionarNota(ask);
          break;
        case "3":
          await this.removerAluno(ask);
          break;
        case "4":
          this.listarAlunos();
          break;
        case "5":
          this.executando = false;
          break;
        default:
          console.log("Opção inválida.");
      }
    }

    rl.close();
  }

  private async cadastrarAluno(ask: (q: string) => Promise<string>): Promise<void> {
    const nome = await ask("Nome do aluno: ");
    const matricula = await ask("Matrícula: ");
    const periodo = parseInt(await ask("Período: "));
    const cursoOpcoes = Object.values(Curso);

    console.log("Cursos disponíveis:");
    cursoOpcoes.forEach((curso, index) => {
      console.log(`${index + 1}. ${curso}`);
    });

    const cursoIndex = parseInt(await ask("Escolha o curso (número): ")) - 1;
    const curso = Curso[Object.keys(Curso)[cursoIndex] as keyof typeof Curso];

    const aluno = new Aluno(nome, curso, matricula, periodo);
    this.disciplina.adicionarAluno(aluno);
    console.log("Aluno cadastrado com sucesso!");
  }

  private async adicionarNota(ask: (q: string) => Promise<string>): Promise<void> {
    const alunos = this.disciplina.listarAlunos();

    if (alunos.length === 0) {
      console.log("Nenhum aluno cadastrado.");
      return;
    }

    alunos.forEach((aluno, index) => {
      console.log(`${index + 1}. ${aluno.nome}`);
    });

    const escolha = parseInt(await ask("Escolha o aluno (número): ")) - 1;
    const nota = parseFloat(await ask("Digite a nota (0 a 10): "));

    this.disciplina.avaliar(alunos[escolha], nota);
    console.log("Nota registrada!");
  }

  private async removerAluno(ask: (q: string) => Promise<string>): Promise<void> {
    const alunos = this.disciplina.listarAlunos();

    if (alunos.length === 0) {
      console.log("Nenhum aluno cadastrado.");
      return;
    }

    alunos.forEach((aluno, index) => {
      console.log(`${index + 1}. ${aluno.nome}`);
    });

    const escolha = parseInt(await ask("Escolha o aluno para remover (número): ")) - 1;
    this.disciplina.removerAluno(alunos[escolha]);
    console.log("Aluno removido com sucesso!");
  }

  private listarAlunos(): void {
    const alunos = this.disciplina.listarAlunos();
    if (alunos.length === 0) {
      console.log("Nenhum aluno cadastrado.");
      return;
    }

    console.log("Lista de alunos:");
    alunos.forEach(aluno => {
      console.log(`- ${aluno.nome} (${aluno.matricula})`);
    });
  }
}
