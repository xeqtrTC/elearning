module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define('roles', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
    });
    Role.associate = (models) => {
        Role.belongsToMany(models.users, {
            through: "user_roles",
            foreignKey: "roleId",
            otherKey: "userId",
        });
    };
    return Role;
};
