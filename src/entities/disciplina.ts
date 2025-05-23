import { Aluno } from "./aluno";

export class Disciplina {
  public alunoNota: Map<Aluno, number> = new Map();

  constructor(
    public nome: string,
    public nomeDocente: string
  ) {}

  adicionarAluno(aluno: Aluno): void {
    if (!this.alunoNota.has(aluno)) {
      this.alunoNota.set(aluno, 0);
    }
  }

  removerAluno(aluno: Aluno): void {
    this.alunoNota.delete(aluno);
  }

  listarAlunos(): Aluno[] {
    return Array.from(this.alunoNota.keys());
  }

  listarAlunosNotas(): Map<Aluno, number> {
    return this.alunoNota;
  }

  avaliar(aluno: Aluno, nota: number): void {
    if (!this.alunoNota.has(aluno)) {
      console.log("Aluno não está matriculado na disciplina.");
      return;
    }
    if (nota < 0 || nota > 10) {
      console.log("Nota inválida. Insira uma nota entre 0 e 10.");
      return;
    }
    if (nota < 5) {
      aluno.reclamarProvaDificil();
    }

    this.alunoNota.set(aluno, nota);
  }
}
