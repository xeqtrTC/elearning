module.exports = (sequelize, Sequelize) => {
    const liveRoomMessages = sequelize.define('liveMessages', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        message: {
            type: Sequelize.STRING,
            allowNull: false
        },
        idOfRoom: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    liveRoomMessages.associate = (models) => {
        liveRoomMessages.belongsTo(models.liveRooms, { foreignKey: 'liveRoomId' });
    };
    return liveRoomMessages;
};
