import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAll,getType, setOrder }            from '../actions';

export default function ReadData() {
const 
data     = useSelector ( (state) => state.data   ) ,
type     = useSelector ( (state) => state.type   ) ,
//filter   = useSelector ( (state) => state.filter ) ,
//order    = useSelector ( (state) => state.order  ) ,
load     = useSelector ( (state) => state.load   ) ,
dispatch = useDispatch ();

useEffect(() => {

if ( !load.all ) {
//  dispatch(clean())
  dispatch(getAll())
//  dispatch(filterType())
//  dispatch(setOrder())
}
if ( !load.type ) {
  dispatch(getType());
}
}, [dispatch]);

}

