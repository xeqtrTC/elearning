const { sequelize, Sequelize } = require(".");
module.exports = (sequelize, Sequelize) => {
    const frequentlyAskedQuestions = sequelize.define('frequentlyAskedQuestions', {
        nameOfQuestion: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    frequentlyAskedQuestions.associate = (models) => {
        frequentlyAskedQuestions.belongsTo(models.course),
            frequentlyAskedQuestions.hasMany(models.answerOnQuestions, { foreignKey: 'freqQuestionId', as: 'freqQuestion' });
    };
    return frequentlyAskedQuestions;
};
