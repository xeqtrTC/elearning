module.exports = (sequelize, Sequelize) => {
    const CourseIncludes = sequelize.define('courseIncludes', {
        nameOfInclude: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    CourseIncludes.associate = (models) => {
        CourseIncludes.belongsTo(models.course);
    };
    return CourseIncludes;
};
