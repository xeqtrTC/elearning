module.exports = (sequelize, Sequelize) => {
    const liveRooms = sequelize.define('liveRooms', {
        idOfRoom: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        socketId: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    });
    liveRooms.associate = (models) => {
        liveRooms.hasMany(models.liveMessages);
    };
    return liveRooms;
};
