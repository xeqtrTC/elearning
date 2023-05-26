module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        username: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: true,
            },
            unique: true
        },
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true,
                notEmpty: true,
            },
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: true,
            },
        },
        isVerificated: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        verificationToken: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });
    User.associate = (models) => {
        User.belongsToMany(models.roles, {
            through: "user_roles",
            foreignKey: "userId",
            otherKey: "roleId",
        }),
            User.hasMany(models.enrollment);
        User.hasMany(models.passwordResetToken);
    };
    // sequelize.sync({ force: true })
    return User;
};
