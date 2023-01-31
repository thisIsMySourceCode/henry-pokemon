/* eslint-disable array-callback-return */
/* eslint-disable default-case          */
/* eslint no-fallthrough: "error"       */



const initialState = {
load: [
{ last   : 0     },
{ all    : false },
{ type   : false },
{ filter : false },
{ order  : false }]
,       data : [] ,
        type : [] ,
filter       : [] ,
order        : [] ,
pokemons     : [] ,
pokByName    : [] ,
pokeName     : [] ,
pokeNameLower: [] ,
allPokemons  : [] ,
orderPokemon : [] ,
pokeTypes    : [] ,
pokeFilter   : [] ,
detail       : [] ,
default      : [] ,
pokByName    : [] ,
pokeById     : [] , 
create       : '' ,
post         : {
name    : '',
hp      : 450,
attack  :  50,
defense :  50,
speed   :  50,
height  :  90,
weight  :  50,
sprite  :  '',
type    : [{name: 'normal'}]
} ,
}
const 
reducer = ( state = initialState, action ) => {

let parameter, output

switch (action.type) {


case 'CREATE':
    return {
        ...state,
        create: action.payload,
    }


case 'POST_EDIT': 
    parameter = Object.keys(action.payload)
    output = state.post
    for(let key of parameter) {
        output[key] = action.payload[key]
    }
    return {
        ...state,
        post: output
    }



    case 'CLEAN': 
    state.load['last']='clean'
    return {
        ...state,
        data: [], 
    }
case 'GET_ALL':
    state.load['last'] ='getall'
    state.load['all' ] = true
    state.filter = action.payload
    return {
        ...state,
        data: action.payload,
    }
case 'GET_TYPE':
    state.load['last'] ='gettype'
    state.load['type'] = true
    output = action.payload
    output = output.sort((a, b) => { if (a < b) { return -1 } return 1 })
    return {
        ...state,
        type: output,
        loaded: false
    }        

case 'FILTER_TYPE':
    if (state.load['all'] && state.load['type'])
    {
        state.load['last']='filter'
        parameter = action.payload
        if (parameter === 'all') return { 
            ...state, filter: state.data 
        }
        output = []
        for (let pokemon of state.data) {
            for (let type of pokemon.types) {
                if ( type.name === parameter ) {
                    output.push(pokemon)
                }
            }
        }
        state.load['filter']=true
        return {
            ...state,
            filter: output,
        }
    }

    break; // (lugo del filter ordena automatico si saco el break)

    case 'ORDER':
        output = state.filter  // output = (state.filter.length === 0) ? state.data : state.filter
        switch(action.payload)
        {
            case  'nameAsc':
                output = output.sort((a, b) => { if (a.name < b.name) { return -1 } return 1 })
                break
            case 'nameDesc':
                output = output.sort((a, b) => { if (a.name > b.name) { return -1 } return 1 })
                break
            case  'attackAsc':
                output = output.sort((a, b) => { if (a.name < b.name) { return -1 } return 1 })
                output = output.sort((a, b) => { if (a.attack < b.attack) { return -1 } return 1 })
                break
            case 'attackDesc':
                output = output.sort((a, b) => { if (a.name < b.name) { return -1 } return 1 })
                output = output.sort((a, b) => { if (a.attack > b.attack) { return -1 } return 1 })
                break
            case 'none':
            default:
                output = output.sort((a, b) => { if (a.id < b.id) { return -1 } return 1 })
                break
        }
        state.load['order']=true
        return{
            ...state, 
            order: output
        }


        case 'GET_POKE_BY_ID':
        return{
            ...state, 
            pokeById: action.payload
        }


        case 'RESET_DETAILS':
            return {
              ...state,
              pokeById: ''
            }




        case 'GET_POK_BY_NAME':

        output = ( 
        Array.isArray(action.payload) 
        && action.payload.length > 0 
        && action.requested.toLowerCase() === action.payload[0].name 
        ) ? action.payload
        : 'not found'
        return {
              ...state,
              pokByName: output
        };

    case 'GET_NAME':
        return {
            ...state,
            pokeName: action.payload,
            pokeNameLower: state.pokeName.filter ( (e) => e.name?.toLowerCase() === action.str?.toLowerCase() ) ,
        }
    default: return state 
    }
}   ; export default reducer


