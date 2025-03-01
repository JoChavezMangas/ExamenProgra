import * as React from 'react';
import { useState } from 'react';
import {
    Card,
    TableContainer,
    Typography,
    Button
} from '@mui/material';
import { useTheme } from '@mui/material/styles'
import { END_POINT_BANDEJA_PETICIONES_ESPECIALES } from '../../config-global';
import Label from '../../components/label';
import Iconify from '../../components/iconify';
import ModalPeticionesEspeciales from './ModalPeticionesEspeciales';
import HistorialPeticionesEspeciales from './HistorialPeticionesEspeciales';
import { RenderStatus } from './MetodosAUX';
import GenericDataGridCustom from '../../sections/_examples/mui/data-grid/GenericDataGridCostom';



export default function TablaPeticionesEspeciales() {

    // constantes del modal
    // Esto quiere decir que por un laod tengo la variable, y por otro laod tengo el método o la función para actualizar la constante y días petición
    // el set es el método y le cambia el valor a días petición
    const [nombreEmpleado, setNombreEmpleado] = useState("");
    const [idSolicitud, setIdSolicitud] = useState("");
    const [idTipoPeticionEspecial, SetIdTipoPeticionEspecial] = useState("");
    const [diasPeticion, setDiasPeticion] = useState("");
    // const [comentario, setComentArray] = useState("");
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    // const [comentarios, setComentarios] = useState( [["nombre", "comentario", "fecha"]])
    const [comentario, setComentario] = useState( "mis mil comentarios")


    console.log('aquí hay un comentario', comentario)

    // coloco las variables que son las que están entre parentesis
    const handleClickOpen = (SolicitudId, empeladoNombre, tipoPeticionEspecial, diastotales) => {

        // estos colocan o datos
        SetIdTipoPeticionEspecial(tipoPeticionEspecial)
        setNombreEmpleado(empeladoNombre);
        setIdSolicitud(SolicitudId);
        setDiasPeticion(diastotales)
        // console.log('se coloco dias Peticion',diasPeticion)
        setOpen(true);
    };

    // Constantes de la bandeja
    const [refreshAUX, setRefreshAUX] = useState("");
    const columns = [
        {
            field: 'estatus',
            headerName: 'Estatus',
            width: 120,
            editable: false,
            renderCell: (params) => RenderStatus(params.row.estatus),
        },
        {
            field: 'fechaCreacion',
            headerName: 'Fecha',
            width: 120,
            editable: false,
        },
        {
            field: 'action',
            headerName: 'Acciones',
            width: 150,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => (

                <Button color='secondary' onClick={(e) =>
                    handleClickOpen(
                        params.row.id,
                        params.row.empleadoSolicitanteNombre,
                        params.row.tipoPeticionEspecial,
                        params.row.diasTotales
                    )
                }>
                    <Iconify icon="ic:outline-remove-red-eye" />Ver Solicitud
                </Button>

            ),
        },
        {
            field: 'empleadoSolicitanteNombre',
            headerName: 'Colaborador',
            width: 300,
            editable: false,
        },
        {
            field: 'nombreEmpresa',
            headerName: 'Empresa',
            width: 150,
            editable: false,
        },
        {
            field: 'nombreArea',
            headerName: 'Área',
            width: 200,
            editable: false,
            disableExtendRowFullWidth: true,
        },
        {
            field: 'nombreDepartamento',
            headerName: 'Departamento',
            width: 200,
            editable: false,
            disableExtendRowFullWidth: true,
        },
        {
            field: 'nombrePuesto',
            headerName: 'Puesto',
            width: 180,
            editable: false,
            renderCell: (params) => (
                <Typography variant="body2" noWrap>
                    {params.row.nombrePuesto}
                </Typography>
            ),
        },

    ];
    const parametroBandeja = `#Especiales`;


    return (
        <>
            {/* <HistorialPeticionesEspeciales /> */}
            <Card>
                <TableContainer sx={{ marginTop: '0px', position: 'relative', overflow: 'unset', }}
                    style={{ width: '100%' }}>
                    <GenericDataGridCustom
                        EndPoint={END_POINT_BANDEJA_PETICIONES_ESPECIALES}
                        columns={columns}
                        refresh={refreshAUX}
                        genericParamAUX={parametroBandeja}
                    />
                </TableContainer>
            </Card>

            <ModalPeticionesEspeciales
                NombreEmpleado={nombreEmpleado}
                SolicitudId={idSolicitud}
                refreshFunc={setRefreshAUX}
                abrirModal={open}
                metodoCerrar={handleClose}
                tipoPeticionEspecial={idTipoPeticionEspecial}
                diasTotales={diasPeticion}
            />


        </>

    )
}



function RenderEmpresaAreaDepto(empresa, area, dpto, toshow) {
    const theme = useTheme();
    const isLight = theme.palette.mode === 'light';
    let result;


    if (dpto !== '') {

        result = (
            <a>
                <Label
                    variant={isLight ? 'soft' : 'filled'}
                    color='secondary'
                    sx={{ mx: 'auto' }}
                >
                    {area}
                </Label>
                <Label
                    variant={isLight ? 'soft' : 'filled'}
                    color='success'
                    sx={{ mx: 'auto' }}
                >
                    {dpto}
                </Label>
            </a>
        );

    } else {
        result = (
            <a>
                <Label
                    variant={isLight ? 'soft' : 'filled'}
                    color='secondary'
                    sx={{ mx: 'auto' }}
                >
                    {area}
                </Label>
            </a>
        );
    }

    return (
        <>
            {result}
        </>
    )
}








