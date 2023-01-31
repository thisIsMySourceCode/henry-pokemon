const 
{ Router }  = require('express')    ,
pokemons    = require('./pokemons') ,
types       = require('./types')    ,
router      = Router()              ;
router.use('/pokemons', pokemons);
router.use('/types', types); 
module.exports = router;
