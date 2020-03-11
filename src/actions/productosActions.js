import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITAR_EXITO,
    PRODUCTO_EDITAR_ERROR
} from '../types';

import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

//Crear Nuevos Productos
export function crearNuevoProductoAction(producto){
    return async (dispatch) => {
        dispatch(agregarProducto())
        try{
            //Inserto en la Api
            await clienteAxios.post('/productos', producto)

            //Si no rompe, salio todo bien, entonces agrego producto al state
            dispatch(agregarProductoExito(producto))

            //Alerta
            Swal.fire(
                'Correcto',
                'El producto se agrego correctamente',
                'success'
            );
        } catch(error){
            console.log(error);
            dispatch(agregarProductoError(true))
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intente de nuevo'
            })

        }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO
})

//si se guarda correctamente
const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

//si hubo error
const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
})

//Funcion que descarga los productos de la base de datos
export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch(descargarProductos())

        try {
                const respuesta = await clienteAxios.get('/productos');
                dispatch( descargarProductosExitoso(respuesta.data));

            // setTimeout( async () => {
            //     const respuesta = await clienteAxios.get('/productos');
            //     dispatch( descargarProductosExitoso(respuesta.data));
            // },3000)
        } catch (error) {
            console.log(error);
            dispatch(descargarProductosError());
        }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
});

const descargarProductosExitoso = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
});

const descargarProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
})

export function borrarProductoAction(id){
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id));
        try {
            const resultado = await clienteAxios.delete(`productos/${id}`);

            Swal.fire(
                'Eliminado!',
                'El producto se eliminó correctamente.',
                'success'
            )

            dispatch(eliminarProductoExito());
        } catch (error) {
            dispatch(eliminarProductoError());
            console.log(error);
        }
    }
};

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
});

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
});

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
});

export function obtenerProductoEditar(producto) {
    return async (dispatch) => {
        dispatch(obtenerProductoEditarAction(producto))
    }
}

const obtenerProductoEditarAction = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

export function editarProductoAction (producto) {
    return async (dispatch) => {
        dispatch(editarProducto())

        try {
            const result = await clienteAxios.put(`/productos/${producto.id}`, producto);   
            dispatch(editarProductoExito(producto)); 
        } catch (error) {
            dispatch(editarProductoError());
        }
    }
};

const editarProducto = producto => ({
    type: COMENZAR_EDICION_PRODUCTO
})

const editarProductoExito = producto => ({
    type: PRODUCTO_EDITAR_EXITO,
    payload: producto
})

const editarProductoError = ({
    type: PRODUCTO_EDITAR_ERROR
})