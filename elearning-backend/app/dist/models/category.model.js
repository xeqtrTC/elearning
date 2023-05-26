module.exports = (sequelize, Sequelize) => {
    const category = sequelize.define('categories', {
        nameOfCategory: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    });
    category.associate = (models) => {
        category.hasMany(models.course, { as: 'courses' });
    };
    return category;
};
