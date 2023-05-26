module.exports = (sequelize, Sequelize) => {
    const Whatyoulearn = sequelize.define("whatyoulearn", {
        whatyoulearn_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.TEXT,
            allowNull: false
        },
    });
    Whatyoulearn.associate = (models) => {
        Whatyoulearn.belongsTo(models.course);
    };
    return Whatyoulearn;
};
