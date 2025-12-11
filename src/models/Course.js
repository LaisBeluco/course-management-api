import Sequelize from "sequelize";
import sequelize from "../config/db.js";

const schema = 'course';

class Course extends Sequelize.Model {}
Course.init({
    title: Sequelize.STRING,
    description: Sequelize.STRING,
}, {sequelize, modelName: 'course', schema});

sequelize.sync();
export default Course;


