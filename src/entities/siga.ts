import { Disciplina } from "./disciplina";
import { Aluno, Curso } from "./aluno";
import * as readline from "readline";

export class Siga {
  private disciplinas: Disciplina[] = [];
  private rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  private ask(question: string): Promise<string> {
    return new Promise(resolve => this.rl.question(question, resolve));
  }

  async executar(): Promise<void> {
    let executando = true;

    while (executando) {
      console.log("\n--- MENU PRINCIPAL ---");
      console.log("1. Adicionar disciplina");
      console.log("2. Remover disciplina");
      console.log("3. Listar disciplinas");
      console.log("4. Gerenciar disciplina");
      console.log("5. Encerrar");

      const opcao = await this.ask("Escolha uma opção: ");

      switch (opcao) {
        case "1":
          await this.adicionarDisciplina();
          break;
        case "2":
          await this.removerDisciplina();
          break;
        case "3":
          this.listarDisciplinas();
          break;
        case "4":
          await this.gerenciarDisciplina();
          break;
        case "5":
          executando = false;
          break;
        default:
          console.log("Opção inválida.");
      }
    }

    this.rl.close();
    console.log("Sistema encerrado.");
  }

  private async adicionarDisciplina(): Promise<void> {
    const nome = await this.ask("Nome da disciplina: ");
    const docente = await this.ask("Nome do docente: ");
    this.disciplinas.push(new Disciplina(nome, docente));
    console.log("Disciplina adicionada com sucesso.");
  }

  private async removerDisciplina(): Promise<void> {
    if (this.disciplinas.length === 0) {
      console.log("Nenhuma disciplina cadastrada.");
      return;
    }

    this.disciplinas.forEach((d, i) => {
      console.log(`${i + 1}. ${d.nome}`);
    });

    const escolha = parseInt(await this.ask("Escolha a disciplina para remover (número): ")) - 1;
    if (escolha >= 0 && escolha < this.disciplinas.length) {
      this.disciplinas.splice(escolha, 1);
      console.log("Disciplina removida.");
    } else {
      console.log("Escolha inválida.");
    }
  }

  private listarDisciplinas(): void {
    if (this.disciplinas.length === 0) {
      console.log("Nenhuma disciplina cadastrada.");
    } else {
      console.log("Disciplinas cadastradas:");
      this.disciplinas.forEach((d, i) => {
        console.log(`${i + 1}. ${d.nome} - ${d.nomeDocente}`);
      });
    }
  }

  private async gerenciarDisciplina(): Promise<void> {
    if (this.disciplinas.length === 0) {
      console.log("Nenhuma disciplina disponível.");
      return;
    }

    this.disciplinas.forEach((d, i) => {
      console.log(`${i + 1}. ${d.nome}`);
    });

    const escolha = parseInt(await this.ask("Escolha a disciplina para gerenciar: ")) - 1;

    if (escolha >= 0 && escolha < this.disciplinas.length) {
      await this.menuGerenciamento(this.disciplinas[escolha]);
    } else {
      console.log("Escolha inválida.");
    }
  }

  private async menuGerenciamento(disciplina: Disciplina): Promise<void> {
    let gerenciando = true;

    while (gerenciando) {
      console.log(`\n--- Gerenciando: ${disciplina.nome} ---`);
      console.log("1. Cadastrar aluno");
      console.log("2. Adicionar nota");
      console.log("3. Remover aluno");
      console.log("4. Listar alunos");
      console.log("5. Voltar");

      const opcao = await this.ask("Escolha uma opção: ");

      switch (opcao) {
        case "1":
          await this.cadastrarAluno(disciplina);
          break;
        case "2":
          await this.adicionarNota(disciplina);
          break;
        case "3":
          await this.removerAluno(disciplina);
          break;
        case "4":
          this.listarAlunos(disciplina);
          break;
        case "5":
          gerenciando = false;
          break;
        default:
          console.log("Opção inválida.");
      }
    }
  }

  private async cadastrarAluno(disciplina: Disciplina): Promise<void> {
    const nome = await this.ask("Nome do aluno: ");
    const matricula = await this.ask("Matrícula: ");
    const periodo = parseInt(await this.ask("Período: "));
    const cursoOpcoes = Object.values(Curso);

    console.log("Cursos disponíveis:");
    cursoOpcoes.forEach((curso, index) => {
      console.log(`${index + 1}. ${curso}`);
    });

    const cursoIndex = parseInt(await this.ask("Escolha o curso (número): ")) - 1;
    const curso = Curso[Object.keys(Curso)[cursoIndex] as keyof typeof Curso];

    const aluno = new Aluno(nome, curso, matricula, periodo);
    disciplina.adicionarAluno(aluno);
    console.log("Aluno cadastrado com sucesso!");
  }

  private async adicionarNota(disciplina: Disciplina): Promise<void> {
    const alunos = disciplina.listarAlunos();
    if (alunos.length === 0) {
      console.log("Nenhum aluno cadastrado.");
      return;
    }

    alunos.forEach((aluno, index) => {
      console.log(`${index + 1}. ${aluno.nome}`);
    });

    const escolha = parseInt(await this.ask("Escolha o aluno (número): ")) - 1;
    const nota = parseFloat(await this.ask("Digite a nota (0 a 10): "));

    disciplina.avaliar(alunos[escolha], nota);
    console.log("Nota registrada!");
  }

  private async removerAluno(disciplina: Disciplina): Promise<void> {
    const alunos = disciplina.listarAlunos();
    if (alunos.length === 0) {
      console.log("Nenhum aluno cadastrado.");
      return;
    }

    alunos.forEach((aluno, index) => {
      console.log(`${index + 1}. ${aluno.nome}`);
    });

    const escolha = parseInt(await this.ask("Escolha o aluno para remover (número): ")) - 1;
    disciplina.removerAluno(alunos[escolha]);
    console.log("Aluno removido com sucesso!");
  }

  private listarAlunos(disciplina: Disciplina): void {
    const alunos = disciplina.listarAlunosNotas();
    if (alunos.size === 0) {
      console.log("Nenhum aluno cadastrado.");
      return;
    }

    console.log("Lista de alunos:");
    alunos.forEach((nota, aluno) => {
      console.log(`- ${aluno.nome} (${aluno.matricula}): ${nota}`);
    });
  }
}
