import 
axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3001'

export const clean = () => {
    return{
        type: 'CLEAN',
        payload: [] 
    }
}

export const create = (e) => async (dispatch) => {
    console.log(e);
    await axios.post('/pokemons', e)
    dispatch({ type: 'CREATE', e })
}

export const postEdit = (payload='') => {
    return { type: 'POST_EDIT', payload: payload }
}

export function getAll() {
    return async function (dispatch) {
        return axios.get('/pokemons')
        .then((response)=>{
            dispatch({ type: 'GET_ALL', payload: response.data})
        })
    }
}

export function getType() {
    return async function (dispatch) {
        return axios.get('/types')
        .then((response)=>{
            dispatch({ type: 'GET_TYPE', payload: response.data})
        }
    )}
}

export const filterType = (payload='all') => {
    return {
        type : 'FILTER_TYPE',
        payload: payload.toLowerCase()
    }
}

export const setOrder = (payload='none') => {
    return {
        type : 'ORDER', 
        payload
    }
}


export const getPokeByName = (str) => {
    return async function (dispatch,query) {
        return axios.get(`/pokemons?name=${str}`)
        .then((response) => {
            const data = (response.status===204) ? 'not found' : response.data
            return dispatch({ type: 'GET_POK_BY_NAME', payload: data, requested: str})
        })
    }
}



export function getPokeByParams(id){
    return async function (dispatch){
        try {
            let json = await axios.get(`/pokemons/${id}`)

//            console.log(json.data[0])

            return dispatch({
                type: 'GET_POKE_BY_ID',
                payload: json.data[0]
            })
        } catch (error) {
            console.log(error)
        }
    }
}



export function resetDetails() {
    return {
      type: 'RESET_DETAILS',
    }
  }
  


/*

*/

/*
export function create(dispatch) {
    return async function (dispatch) {
        return axios.post('/pokemons')
        .then((response)=>{
            dispatch({ type: 'CREATE', payload: response.data})
        })
    }
}
*/

/*
export const create = (payload) => {

    console.log(payload)

    return async function (payload) {
        try {
            const response = await axios.post ('/pokemons', payload)
            return response;
        }   catch (e)   {
            console.log(e.response.data)            
        }
    }
}
*/







export function getName(name) {
//    try {
            return async function (dispatch) {
            return axios.get('http://localhost:3001/pokemons')
                .then((response)=>{
                dispatch({ type: 'GET_NAME', payload: response.data})
                })
            } 
//        }
/*
        catch (e) {
        dispatch( {
        type: ERROR_MESSAGE,
        payload: e,
        } )
    }
*/
}



/*

export function getNamePokemons(name){
    console.log('asd ')
    return async function (dispatch){
        try {
            var json = await axios.get("http://localhost:3001/pokemons?name=" + name);
            return dispatch({type:'GET_NAME_POKEMONS', payload: json.data});   
        }catch (error) {
            console.log(error) }
            }
}


*/
