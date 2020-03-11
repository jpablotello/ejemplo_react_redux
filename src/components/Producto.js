import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

//redux
import {useDispatch} from 'react-redux';
import { borrarProductoAction, obtenerProductoEditar }  from '../actions/productosActions';

const Producto = ({producto}) => {
    const {nombre, precio, id} = producto;

    const dispatch = useDispatch();
    const history = useHistory();

    //confirmar si desea eliminar
    const confirmarEliminarProducto = id => {
        //preguntar al usuario
        Swal.fire({
            title: 'Estás seguro?',
            text: "Una vez eliminado, no se podrá recuperar el Producto",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!'
          }).then((result) => {
            if (result.value) {
                dispatch(borrarProductoAction(id));
            }
          })

        //pasarlo al action
    }

    const redireccionarEdicion = producto => {
        dispatch(obtenerProductoEditar(producto));
        history.push(`/producto/editar/${id}`);
    }

    return ( 
    <tr>
        <td>{nombre}</td>
        <td><span className="font-weight-bold"></span>$ {precio}</td>
        <td className="acciones">
            <button 
                onClick={() => redireccionarEdicion(producto)} 
                className="btn btn-primary mr-2"
                type="button"
            >
                Editar
            </button>
            <button 
                type="button"
                className="btn btn-danger"
                onClick={() => confirmarEliminarProducto(id)}
            >
                Eliminar
            </button>
        </td>
    </tr> 
    );
}
 
export default Producto;