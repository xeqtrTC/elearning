const User = require('./');
module.exports = (sequelize, Sequelize) => {
    const Enrollment = sequelize.define('enrollment', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
    });
    Enrollment.associate = (models) => {
        Enrollment.belongsTo(models.users),
            Enrollment.belongsTo(models.course);
    };
    return Enrollment;
};
