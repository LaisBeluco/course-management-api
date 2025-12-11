import Course from "../models/Course.js";
import { Op } from "sequelize";

class CourseController {
    async list(req, res) {
        try {
            const courses = await Course.findAll();
            return res.json(courses);
        } catch (error) {
            console.error("Erro na listagem:", error);
            return res.status(500).json({ error: "Erro ao listar cursos" });
        }
    }

    async show(req, res) {
        try {
            const course = await Course.findByPk(req.params.id);

            if (!course)
                return res.status(404).json({ error: "Curso não encontrado" });

            return res.json(course);
        } catch (error) {
            console.error("Erro na busca:", error);
            return res.status(500).json({ error: "Erro ao buscar curso" });
        }
    }

    async create(req, res) {
        const { title, description } = req.body;

        try {
            const course = await Course.create({ title, description });
            return res.status(201).json(course);
        } catch (error) {
            console.error("Erro na criação:", error);
            return res.status(500).json({ error: "Erro ao criar curso" });
        }
    }

    async update(req, res) {
        const { title, description } = req.body;
        const id = req.params.id;

        try {
            const [updated] = await Course.update(
                { title, description },
                { where: { id: { [Op.eq]: id } } }
            );

            if (!updated)
                return res.status(404).json({ error: "Curso não encontrado" });

            return res.json({ msg: `Curso ${title} atualizado com sucesso!` });
        } catch (error) {
            console.error("Erro na atualização:", error);
            return res.status(500).json({ error: "Erro ao atualizar curso" });
        }
    }

    async delete(req, res) {
        try {
            const deleted = await Course.destroy({
                where: { id: req.params.id },
            });

            if (!deleted)
                return res.status(404).json({ error: "Curso não encontrado" });

            return res.json({
                msg: `Exclusão do item de ID ${req.params.id} feita com sucesso!`,
            });
        } catch (error) {
            console.error("Erro na exclusão:", error);
            return res.status(500).json({ error: "Erro ao excluir curso" });
        }
    }
}

export default new CourseController();
