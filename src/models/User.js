import Sequelize from "sequelize";
import sequelize from "../config/db.js";

const schema = 'course';

class User extends Sequelize.Model {}
User.init({
    email: Sequelize.STRING,
    name: Sequelize.STRING,
    password: Sequelize.STRING,
    role: Sequelize.NUMBER
}, {sequelize, modelName: 'user', schema});

sequelize.sync();
export default User;