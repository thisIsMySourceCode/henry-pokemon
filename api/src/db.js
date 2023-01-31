require('dotenv').config();
const 
  { Sequelize }                               = require('sequelize')      ,
  { clear }                                   = require('console')        ,
  fs                                          = require('fs')             ,
  path                                        = require('path')           ,
  basename                                    = path.basename(__filename) ,
  modelDefiners                               = []                        ,
  { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST }  = process.env               ,
  sequelize = new Sequelize 
(
  {
    database: DB_NAME,
    dialect: 'postgres',
    host: DB_HOST,
    port: 5432,
    username: DB_USER,
    password: DB_PASSWORD,
    pool: 
    {
      max: 3,
      min: 1,
      idle: 10000,
    },
    ssl: process.env.NODE_ENV === 'production' 
    ? 
    {
      require: true,
      rejectUnauthorized : false,
    }
    : {},
    dialectOptions: 
    {
      keepAlive: true,
      logging:  process.env.NODE_ENV === 'production' ? false : console.log ,
      native:   process.env.NODE_ENV === 'production' ? true : false ,
      ssl:      process.env.NODE_ENV === 'production' ? { require: true } : false ,
    },
  }
)

console.clear(); // limpio consola
sequelize
.authenticate()
.then(() => {
  console.log('Conectado a la DB correctamente.');
})
.catch(err => {
  console.error('Error al conectarme a la DB:', err);
});

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));

// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);

sequelize.models = Object.fromEntries(capsEntries);

const { Pokemon, Type } = sequelize.models; // , Deleted

  Type.belongsToMany(Pokemon, {through : 'pokemon_type'});
  Pokemon.belongsToMany(Type, {through: 'pokemon_type'});

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
