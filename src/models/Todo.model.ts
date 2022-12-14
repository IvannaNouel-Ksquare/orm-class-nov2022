import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize } from "sequelize";

export class Todo extends Model<InferAttributes<Todo>, InferCreationAttributes<Todo>>{

    declare id: CreationOptional<number>;
    declare description: string;
    declare is_completed: CreationOptional<boolean>;
}

export const initTodoModel = (sequelize: Sequelize) => {
    Todo.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true

        },
        description: DataTypes.STRING,
        is_completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },


    },
        {
            sequelize,// Instance of sequelize that reflects the connection
            timestamps: false,
        
        })
       

}