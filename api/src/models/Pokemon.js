const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    }, 
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hp:{
      type: DataTypes.INTEGER,
      defaultValue: 50
    },
    attack:{
      type: DataTypes.INTEGER,
      defaultValue: 50
    },
    defense:{
      type: DataTypes.INTEGER,
      defaultValue: 50
    },
    speed:{
      type: DataTypes.INTEGER,
      defaultValue: 50
    },
    height:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    weight:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sprite: {
      type: DataTypes.STRING,
    },
    createdInDb: { 
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {timestamps:false});  
};
