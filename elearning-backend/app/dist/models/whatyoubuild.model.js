module.exports = (sequelize, Sequelize) => {
    const Whatyoubuild = sequelize.define("whatyoubuild", {
        wub_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        wub_imageLink: {
            type: Sequelize.STRING,
            allowNull: false
        },
        wub_title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        wub_description: {
            type: Sequelize.TEXT,
            allowNull: false
        },
    });
    Whatyoubuild.associate = (models) => {
        Whatyoubuild.belongsTo(models.course);
    };
    return Whatyoubuild;
};
