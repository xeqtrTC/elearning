module.exports = (sequelize, Sequelize) => {
    const Course = sequelize.define("course", {
        course_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        levelOfCourse: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        overview: {
            type: Sequelize.TEXT,
        },
        biggerOverview: {
            type: Sequelize.TEXT
        },
        private: {
            type: Sequelize.BOOLEAN
        },
        imageLink: {
            type: Sequelize.STRING,
            allowNull: false
        },
    });
    Course.associate = (models) => {
        Course.hasMany(models.lesson),
            Course.hasMany(models.whatyoubuild),
            Course.hasMany(models.whatyoulearn),
            Course.hasMany(models.enrollment),
            Course.hasMany(models.reviews),
            Course.hasMany(models.courseIncludes),
            Course.hasMany(models.prerequisites),
            Course.hasMany(models.frequentlyAskedQuestions),
            Course.belongsTo(models.categories, { as: 'category' }),
            Course.belongsToMany(models.instructors, {
                through: "instructors_of_course",
                foreignKey: "courseId",
                otherKey: "instructorId"
            });
    };
    return Course;
};
