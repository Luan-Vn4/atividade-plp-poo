# 1 Especificação
Implementar um sistema de gerenciamento de notas para uma escola. O sistema deve
permitir cadastrar alunos, disciplinas e registrar as notas que cada aluno
obteve em cada disciplina.

## 2 Classes
### Aluno
#### Atributos
- nome (string)
- curso (enum: ENGENHARIA_DE_SOFTWARE, PSICOLOGIA, LICENCIATURA_EM_COMPUTACAO)
- matrícula (string)
- periodo (number)
#### Métodos
- reclamarProvaDificil (printa reclamação a um professor)
---
### Disciplina
#### Atributos
- nome (string)
- nomeDocente (string)
- alunoNota (Map<Aluno, number>)
  - Nota deve ser entre 0 e 10
#### Métodos
- adicionarAluno
  - Adiciona o aluno no map de alunoNota com nota inicial 0
- removerAluno
  - Remove o aluno do map de alunoNota
- listarAluno
  - Retorna uma lista de alunos a partir das chaves de alunoNota
- avaliar
  - Adiciona uma nota a um aluno específico
---
### Siga
#### Atributos
- executando (bool)
- disciplina (Disciplina)
#### Métodos
- main
  - Loop com execução do programa que pergunta qual disciplina você quer gerenciar
- cadastrarAluno
  - Perguntar os dados de aluno para adicionar na disciplina
- adicionarNota
  - Pergunta qual aluno que você quer adicionar a nota
- removerAluno
  - Pergunta qual aluno você quer remover daquela disciplina
- listarAlunos
  - Lista os alunos da disciplina