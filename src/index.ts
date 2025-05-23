import { Disciplina } from "./entities/disciplina";
import { Siga } from "./entities/siga";

const disciplina = new Disciplina("Paradigmas de Linguagens de Programação", "Professor X");
const siga = new Siga(disciplina);
siga.main();
