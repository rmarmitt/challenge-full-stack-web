import { Request, Response } from "express";
import { getRepository, Like, QueryBuilder, SelectQueryBuilder } from 'typeorm';
import * as Yup from 'yup';
import { CpfValidator } from "../validators/CpfValidator";
import Student from "../entity/Student";

export default {
  async list(req: Request, res: Response) {
    const studentRepository = getRepository(Student);

    let query: SelectQueryBuilder<Student> = studentRepository.createQueryBuilder();

    console.log(req.query.q)

    if(req.query.q) {
        const expression : string = req.query.q.toString();
        console.log(expression);
        query = query.where([
            { name: Like(`%${req.query.q}%`)},
            { email: Like(`%${req.query.q}%`)},
            { cpf: Like(`%${expression.replace(/\D/g, '')}%`)},
            { academic_registry: Like(`%${req.query.q}%`)}
        ]);
    }

    const students = await query.getMany();

    return res.json(students);
    //return res.json(orphanageView.renderMany(orphanages));
  },

  async create(req: Request, res: Response) {
    try {
        const studentRepository = getRepository(Student);

        const data = {
            name: req.body.name,
            email: req.body.email,
            academic_registry: req.body.academic_registry,
            cpf: req.body.cpf
        }

        //debug
        console.log(CpfValidator.validate(req.body.cpf));

        Yup.addMethod(Yup.string, "cpf", function(errorMessage) {
            return this.test('test-cpf', errorMessage, function(value) {
                const { path, createError } = this;

                if(CpfValidator.validate(value)) {
                    return true;
                }

                createError({path, message: errorMessage})
            });
        });

        const schema = Yup.object().shape({
            name: Yup.string().trim().required('O campo "Nome" é obrigatório.'),
            email: Yup.string().trim().required('O campo "E-mail" é obrigatório.').email('O e-mail informado é inválido!'),
            academic_registry: Yup.string().trim().required('O campo "Registro acadêmico" é obrigatório.'),
            //cpf: Yup.string().required().cpf()
        });

        await schema.validate(data, {
            abortEarly: false
        });

        const student = studentRepository.create(data);

        const entity = await studentRepository.save(student)
           
        return res.status(201).json({message: 'Registro criado com sucesso!', student: entity});
    } catch (exception) {
        if (exception instanceof Yup.ValidationError) {
            return res.status(422).json({errors: exception.errors});
        }

        console.error(exception);
        return res.status(500).json({message: 'Ocorreram erros ao processas sua solicitação.', errors: [ exception.message ]});
    } 
  },

  async update() {},
};
