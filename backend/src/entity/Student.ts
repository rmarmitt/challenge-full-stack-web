import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail, MaxLength, IsNotEmpty } from "class-validator";
import { UniqueValidator } from "../validators/UniqueConstraintValidator";
import { CpfValidator } from "../validators/CpfConstraintValidator";

@Entity("students")
export default class Student {
  @PrimaryGeneratedColumn("increment", { type: "int" })
  id: number;

  @Column({ type: "varchar", nullable: false })
  @IsNotEmpty({ message: "O campo nome não pode ser vazio." })
  @MaxLength(80, {
    message: "O campo nome deve possuir no máximo 80 caracteres.",
  })
  name: string;

  @Column({ type: "varchar", nullable: false })
  @IsNotEmpty({ message: "O campo e-mail não pode ser vazio." })
  @IsEmail({}, { message: "O e-mail informado não é válido." })
  @MaxLength(120, {
    message: "O campo e-mail deve possuir no máximo 120 caracteres.",
  })
  email: string;

  @Column({ type: "varchar", update: false, nullable: false })
  @IsNotEmpty({ message: "O campo registro acadêmico não pode ser vazio." })
  @UniqueValidator(Student, {
    message: "Já existe um estudante com este registro acadêmico.",
  })
  @MaxLength(80, {
    message: "O campo registro acadêmico deve possuir no máximo 80 caracteres."
  })
  academic_registry: string;

  @Column({ type: "varchar", length: 14, update: false, nullable: false })
  @IsNotEmpty({ message: "O campo CPF não pode ser vazio." })
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

  public setCpf(cpf: string): void {
    this.cpf = cpf;
  }
}
