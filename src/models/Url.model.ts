import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize } from "sequelize";

export class URL extends Model<InferAttributes<URL>, InferCreationAttributes<URL>> {

    declare id: CreationOptional<number>;
    declare shortUrl: string;
    declare url: string;

}

export const initURLModel = (sequelize: Sequelize) => {
    URL.init({

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true

        },
        url: DataTypes.STRING,
        shortUrl: DataTypes.STRING,

    }, {
        sequelize // Instance of sequelize that reflects the connection
    })
}