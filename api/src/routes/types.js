const
{ Router }  = require('express'),
{ Type   }  = require('../db')  ,
axios       = require('axios')  ,
router      = Router()          ,
api         = 'https://pokeapi.co/api/v2/type'
router.get('/', async (req, res) => {
 const typeData = await Type.findOne({where: {name:'normal'}});
 if(!typeData) {
   try {
     const types = await axios.get(api);
     const typesData = types.data.results.map(e => e.name);
     res.status(200).send(typesData);
   } catch (e) {
     res.json(e.message);
   };
  } else {
   const types = await Type.findAll();
   const typesData = types.map(e => e.name);
   return res.status(200).send(typesData);
  };
})

module.exports = router;
