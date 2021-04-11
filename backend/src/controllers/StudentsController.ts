import { Request, Response, NextFunction } from "express";
import { getRepository, SelectQueryBuilder } from "typeorm";
import { validate } from "class-validator";
import Student from "../entity/Student";
import { ValidationException } from "../exceptions/ValidationException";

export default {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const studentRepository = getRepository(Student);

      let query: SelectQueryBuilder<Student> = studentRepository.createQueryBuilder();

      if (req.query.name) {
        query = query.andWhere("UPPER(name) LIKE :name", {
          name: `%${req.query.name.toString().toUpperCase()}%`,
        });
      }

      if (req.query.email) {
        query = query.andWhere(`UPPER(email) LIKE :email`, {
          email: `%${req.query.email.toString().toUpperCase()}%`,
        });
      }

      if (req.query.cpf) {
        query = query.andWhere(`cpf = :cpf`, { cpf: req.query.cpf });
      }

      const itemsPerPage: number = parseInt(`${req.query.itemsPerPage}`);
      const currentPage: number = parseInt(`${req.query.currentPage}`);
      const itemsToSkip = itemsPerPage * (currentPage - 1);

      query.take(itemsPerPage);
      query.skip(itemsToSkip);

      if (req.query.sortBy) {
        if (req.query.sortDesc === "true") {
          query = query.orderBy(`"${req.query.sortBy}"`, "DESC");
        } else {
          query = query.orderBy(`"${req.query.sortBy}"`, "ASC");
        }
      }

      const students = await query.getMany();
      const totalStudents = await studentRepository.count();
      const totalNumOfPages = totalStudents / itemsPerPage;

      return res.json({ students, totalStudents, totalNumOfPages });
    } catch (err) {
      next(err);
    }
  },

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const studentRepository = getRepository(Student);

      const student = await studentRepository.findOneOrFail(req.params.id);

      return res.json(student);
    } catch (err) {
      next(err);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const studentRepository = getRepository(Student);

      const data = {
        name: req.body.name,
        email: req.body.email,
        academic_registry: req.body.academic_registry,
        cpf: req.body.cpf,
      };

      const student = studentRepository.create(data);

      const errors = await validate(student, { stopAtFirstError: false });

      if (errors.length) {
        throw new ValidationException(errors);
      }

      const entity = await studentRepository.save(student);

      return res.status(201).json(entity);
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const studentRepository = getRepository(Student);

      const student = await studentRepository.findOneOrFail(req.body.id);

      student.setName(req.body.name);
      student.setEmail(req.body.email);

      const errors = await validate(student, { stopAtFirstError: false });

      if (errors.length) {
        throw new ValidationException(errors);
      }

      await studentRepository.save(student);

      return res.send();
    } catch (err) {
      next(err);
    }
  },
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const studentRepository = getRepository(Student);

      const student = await studentRepository.findOneOrFail(`${req.params.id}`);

      studentRepository.delete(student);

      return res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
