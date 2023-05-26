module.exports = (sequelize, Sequelize) => {
    const Review = sequelize.define('reviews', {
        usernameOfReview: {
            type: Sequelize.STRING,
            allowNull: false
        },
        descriptionOfReview: {
            type: Sequelize.TEXT,
            allowNull: false
        }
    });
    Review.associate = (models) => {
        Review.belongsTo(models.course);
    };
    return Review;
};
