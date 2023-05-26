module.exports = (sequelize, Sequelize) => {
    const LessonDetails = sequelize.define("lessondetails", {
        lesson_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        video_link: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        private: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    });
    LessonDetails.associate = (models) => {
        LessonDetails.belongsTo(models.lesson, { foreignKey: 'lessonLessonId' });
    };
    return LessonDetails;
};
