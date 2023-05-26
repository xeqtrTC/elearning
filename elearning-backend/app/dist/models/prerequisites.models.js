module.exports = (sequelize, Sequelize) => {
    const Prerequisites = sequelize.define('prerequisites', {
        nameOfPrerequisites: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    Prerequisites.associate = (models) => {
        Prerequisites.belongsTo(models.course);
    };
    return Prerequisites;
};
