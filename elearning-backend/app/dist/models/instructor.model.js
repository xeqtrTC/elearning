module.exports = (sequelize, Sequelize) => {
    const Instructor = sequelize.define('instructors', {
        usernameOfInstructor: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        instructorRole: {
            type: Sequelize.STRING,
            allowNull: false
        },
        descriptionOfInstructor: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        biggerDescriptionOfInstructor: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        githubLink: {
            type: Sequelize.STRING,
            allowNull: true
        },
        linkedInLink: {
            type: Sequelize.STRING,
            allowNull: true
        },
        twitterLink: {
            type: Sequelize.STRING,
            allowNull: true
        },
        youtubeLink: {
            type: Sequelize.STRING,
            allowNull: true
        },
    });
    Instructor.associate = (models) => {
        Instructor.belongsToMany(models.course, {
            through: "instructors_of_course",
            foreignKey: "instructorId",
            otherKey: "courseId"
        });
    };
    return Instructor;
};
