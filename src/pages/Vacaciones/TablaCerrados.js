import { useState } from 'react';
// @mui
import {
    Card,
    Button,
    Container,
    TableContainer,
    Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
// routes
import { _employeeList } from '../../_mock/arrays';
// components
import Iconify from '../../components/iconify';
import ConfirmDialog from '../../components/confirm-dialog';
// sections
import Label from '../../components/label';
import { HOST_API_LOCAL, END_POINT_BANDEJA_PERIODOS_VENCIMIENTO, END_POINT_SOLICITUDES_CERRAR_ABRIR_PERIODOS } from '../../config-global';
import { AxiosMandarForm } from '../../_Axios/AxiosFomr'
import GenericDataGridCustom from '../../sections/_examples/mui/data-grid/GenericDataGridCostom';



export default function TablaCerrados() {

    const [refreshAUX, setRefreshAUX] = useState("");

    const parametro = localStorage.getItem('RolId') === 'RecursosHumanos' ? `#Cerrado` : `#Cerrado#Gerente#${localStorage.getItem('EmpleadoId')}`
    const columns = localStorage.getItem('RolId') === 'RecursosHumanos' ?
    [

        {
            field: 'nombreCompleto',
            headerName: 'Colaborador',
            width: 320,
            editable: false,
        },

        {
            field: 'vacacionesDisponibles',
            headerName: 'Días vencidos',
            width: 120,
            align: 'center',
            editable: false,
            renderCell: (params) => (
                <Typography variant="subtitle2" noWrap>
                    {params.row.vacacionesDisponibles}
                </Typography>
            ),
        },
        {
            field: 'periodo',
            headerName: 'Período Vencido',
            width: 150,
            editable: false,
            renderCell: (params) => RenderPeriodo(params.row.periodo),
        },
        {
            field: 'fechaFinString',
            headerName: 'Fecha de Vencimiento',
            width: 180,
            editable: false,
            renderCell: (params) => RenderFecha(params.row.fechaFinString),
        },
        
        {
            field: 'action',
            headerName: 'Acciones',
            align: 'center',
            width: 125,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => RenderAccion(params.row.id, setRefreshAUX),
        },
    ]:
    [

        {
            field: 'nombreCompleto',
            headerName: 'Colaborador',
            width: 320,
            editable: false,
        },

        {
            field: 'diasHabiles',
            headerName: 'Días Vencidos',
            width: 120,
            align: 'center',
            editable: false,
            renderCell: (params) => (
                <Typography variant="subtitle2" noWrap>
                    {params.row.vacacionesDisponibles}
                </Typography>
            ),
        },
        {
            field: 'periodo',
            headerName: 'Período Vencido',
            width: 150,
            editable: false,
            renderCell: (params) => RenderPeriodo(params.row.periodo),
        },
        {
            field: 'fechaVencimiento',
            headerName: 'Fecha de Vencimiento',
            width: 180,
            editable: false,
            renderCell: (params) => RenderFecha(params.row.fechaFinString),
        },
    ]


    return (
            <Card>
                <TableContainer sx={{ marginTop: '0px', position: 'relative', overflow: 'unset', }}
                    style={{ width: '100%' }}>
                    <GenericDataGridCustom EndPoint={END_POINT_BANDEJA_PERIODOS_VENCIMIENTO}
                        columns={columns}
                        genericParamAUX={parametro}
                        refresh={refreshAUX}
                    />
                </TableContainer>
            </Card>
    );
}



function RenderPeriodo(periodo) {
    const theme = useTheme();
    const isLight = theme.palette.mode === 'light';

    return (
        <div>
            <Label
                variant={isLight ? 'soft' : 'filled'}
                color='success'
                sx={{ mx: 'auto' }}
            >
                {periodo}
            </Label>
        </div>
    );
}


function RenderFecha(fechaVencimiento) {
    const theme = useTheme();
    const isLight = theme.palette.mode === 'light';

    return (
        <div>
            <Label
                variant={isLight ? 'soft' : 'filled'}
                color='error'
                sx={{ mx: 'auto' }}
            >
                {fechaVencimiento}
            </Label>
        </div>
    );
}

// Aquí comienza el botón para re abririr el periódo de vacaciones
function RenderAccion(IdPeriodo, refreshFunc) {
    const [openConfirm, setOpenConfirm] = useState(false);
    const [tableData, setTableData] = useState(_employeeList);

    const [IdAUX, setIdAUX] = useState('');

    const handleOpenConfirm = () => {
        setOpenConfirm(true);
    };
    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };
    const handleDeleteRow = (id) => {
        const deleteRow = tableData.filter((row) => row.id !== id);
        setTableData(deleteRow);
        setOpenConfirm(false);
    };
    const JustAfterClicDelete = () => {
        handleDeleteRow(IdAUX);
        onDelete(IdAUX);
    }
    const { enqueueSnackbar } = useSnackbar();

    const onDelete = async (data) => {
        try {
            
            const form = new FormData();
            form.append("Id", IdPeriodo)
            form.append("statusPeriodo", "#Disponible")
            AxiosMandarForm(form, END_POINT_SOLICITUDES_CERRAR_ABRIR_PERIODOS, succesFunc, succesFunc)

        } catch (error) {
            console.error(error);
        }
    };

    const succesFunc = () => {
        refreshFunc(Date.now());
        enqueueSnackbar('¡Listo, se abrió el período!');
    }

    return (
        <div>
            {/* Dibujo del botón para reabrir el periódo */}
            <Button
                onClick={() => {
                    handleOpenConfirm();
                }}
                sx={{ color: 'primary', p: 1 }}
            >
                <Iconify icon="tabler:arrow-back-up-double" />
                Reabrir periódo
            </Button>

            {/* Aquí comienza el dialog para confirmar si desea reabrir el periódo */}
            <ConfirmDialog
                open={openConfirm}
                onClose={handleCloseConfirm}
                title="Reabrir"
                content="¿Deseas reabrir el período de vacaciones?"
                action={
                    <Button variant="contained" color="primary" onClick={JustAfterClicDelete}>
                        Reabrir
                    </Button>
                }
            />
        </div>
    );
}

