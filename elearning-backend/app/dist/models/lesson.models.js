module.exports = (sequelize, Sequelize) => {
    const Lesson = sequelize.define("lesson", {
        lesson_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        instructor_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    });
    Lesson.associate = (models) => {
        Lesson.belongsTo(models.course);
        Lesson.hasMany(models.lessondetails, { foreignKey: 'lessonLessonId', as: 'details' });
    };
    return Lesson;
};
