import Sequelize from "sequelize";
import 'dotenv/config';

const sequelize = new Sequelize('coursesdb', process.env.DB_USER, process.env.DB_PASS, {
    host: 'localhost',
    dialect: 'postgres'
});

export default sequelize;