import { Entity, Column, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("students")
export default class Student {
    @PrimaryGeneratedColumn("increment", {type: "int"})
    id: number;

    @Column({type: "varchar"})
    name: string;

    @Column({type: "varchar"})
    email: string;

    @Column({type: "varchar", update: false, unique: true})
    academic_registry: string;

    @Column({type: "varchar", length: 11, update: false})
    cpf: string;
}