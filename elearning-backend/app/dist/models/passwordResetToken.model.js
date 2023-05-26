module.exports = (sequelize, Sequelize) => {
    const PasswordResetToken = sequelize.define('passwordResetToken', {
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        token: {
            type: Sequelize.UUID,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4
        },
        expiresAt: {
            type: Sequelize.DATE,
            allowNull: false
        }
    });
    PasswordResetToken.associate = (models) => {
        PasswordResetToken.belongsTo(models.users);
    };
    return PasswordResetToken;
};
