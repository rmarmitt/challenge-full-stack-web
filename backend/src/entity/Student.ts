import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail, MaxLength, IsNotEmpty } from "class-validator";
import { UniqueValidator } from "../validators/UniqueConstraintValidator";
import { CpfValidator } from "../validators/CpfConstraintValidator";

@Entity("students")
export default class Student {
  @PrimaryGeneratedColumn("increment", { type: "int" })
  id: number;

  @Column({ type: "varchar", length: 80 })
  @IsNotEmpty({message: "O campo nome não pode ser vazio."})
  @MaxLength(80, {
    message: "O campo nome deve possuir no máximo 80 caracters.",
  })
  name: string;

  @Column({ type: "varchar"})
  @IsNotEmpty({message: "O campo e-mail não pode ser vazio."})
  @IsEmail({}, { message: "O e-mail informado não é válido." })
  email: string;

  @Column({ type: "varchar", update: false })
  @IsNotEmpty({message: "O campo registro acadêmico não pode ser vazio."})
  @UniqueValidator(Student, {
    message: "Já existe um estudante com este registro acadêmico.",
  })
  academic_registry: string;

  @Column({ type: "varchar", length: 14, update: false })
  @IsNotEmpty({message: "O campo CPF não pode ser vazio."})
  @CpfValidator(Student)
  cpf: string;

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public getAcademicRegistry(): string {
    return this.academic_registry;
  }

  public setAcademicRegistry(academic_registry: string): void {
    this.academic_registry = academic_registry;
  }

  public getCpf(): string {
    return this.cpf;
  }

  public setCpf(cpf: string) {
    this.cpf = cpf;
  }
}
