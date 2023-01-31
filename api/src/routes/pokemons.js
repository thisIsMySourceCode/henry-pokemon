const 
axios               = require ('axios') ,
{ Router }          = require('express'),
router              = Router()          ,
{ Pokemon, Type }   = require('../db')  ,
pk                  = { hp:0, attack:1, defense:2, speed:5 }
api                 = 'https://pokeapi.co/api/v2/pokemon';

const pokemonGetApi = async () => {
    const pokemonFirst = await axios.get(api)                    // Default : 20
    const pokemonNext  = await axios.get(pokemonFirst.data.next) //         + 20
    const pokemonGroup = pokemonFirst.data.results.concat(pokemonNext.data.results) // = 40
    try {
        const pokemonUrl = pokemonGroup.map(e => axios.get(e.url)) 
        let pokemonResponse = Promise.all(pokemonUrl)
            .then(e => {
                let pokemon = e.map(e => e.data)
                let pokemonArrangement = [] 
                pokemon.map(e => {
                    pokemonArrangement.push({
                             id: e.id,
                           name: e.name,
                             hp: e.stats[0].base_stat,
                         attack: e.stats[pk.attack].base_stat,
                        defense: e.stats[pk.defense].base_stat,
                          speed: e.stats[pk.speed].base_stat,
                         height: e.height,
                         weight: e.weight,
                         sprite: e.sprites.front_default,
                          types: e.types.length < 2 ? [{name: e.types[0].type.name}] : [{name: e.types[0].type.name}, {name: e.types[1].type.name}]
                    })
                })
                return pokemonArrangement;
            })
            return pokemonResponse;
    } catch (e) {
        res.json(e.message);
    }
}

const pokemonGetDb = async () => {
    try {
        return await Pokemon.findAll({
            include: {
                model: Type, // pokemon <--> type relationship
                attributes: ['name'], 
                through: {
                    attributes: []
                }
            }
        })
    } catch (e) {
        res.json(e.message);
    }
}

const pokemonGetAll = async () => {
    const pokemonApi = await pokemonGetApi();
    const pokemonDb = await pokemonGetDb();
    const pokemonResponse = pokemonApi.concat(pokemonDb);
    return pokemonResponse;
}

// GET pokemons & GET pokemons?name=full%20name
router.get('/', async (req, res, next) => {
    const {name} = req.query;
    try {
        const pokemonGroup = await pokemonGetAll();
        if(name) {  
            let pokemonName = await pokemonGroup.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
            return pokemonName.length ? 
            res.status(200).send(pokemonName) :
            res.status(404).send('Pokemon not found')
        } else { 
            return res.status(200).send(pokemonGroup);
        }
    } catch (e) {
        return next(e);
    }
});

// POST pokemons
router.post('/', async (req, res, next) => {
    const {name, hp, attack, defense, speed, height, weight, sprite, createdInDb, types} = req.body;
    try {
        const pokemonCreate = await Pokemon.create({
            name,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            sprite,
            createdInDb
        }); 
        const pokemonCreateType = await Type.findAll({
            where: {name: types}
        });
        pokemonCreate.addType(pokemonCreateType);
        return res.status(200).send('Pokemon created successfully')
    } catch (e) {
        next(e)    
    }
})

//GET /pokemons/{idPokemon}
router.get('/:id', async (req, res) => {
    const 
    {id} = req.params,
    pokemonAll = await pokemonGetAll();
    if(id) {
        const pokemonId = await pokemonAll.filter(e => e.id == id);
        pokemonId.length ?
        res.status(200).json(pokemonId) :
        res.status(404).send('Pokemon not found')
    }
})

module.exports = router;
