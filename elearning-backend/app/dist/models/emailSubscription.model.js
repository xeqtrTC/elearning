module.exports = (sequelize, Sequelize) => {
    const emailSubscription = sequelize.define('emailSubscription', {
        emailOfSub: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        uniqueID: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return emailSubscription;
};
