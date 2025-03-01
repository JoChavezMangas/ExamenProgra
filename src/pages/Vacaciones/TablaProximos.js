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




export default function TablaProximos() {

    const [refreshAUX, setRefreshAUX] = useState("");
    const columns = [
        
        {
            field: 'nombreCompleto',
            headerName: 'Colaborador',
            width: 320,
            editable: false,
        },

        {
            field: 'diasHabiles',
            headerName: 'Días Hábiles',
            width: 120,
            align: 'center',
            editable: false,
            renderCell: (params) => (
                <Typography variant="subtitle2" noWrap>
                    {params.row.vacacionesDisponibles }
                </Typography>
            ),
        },
        {
            field: 'periodo',
            headerName: 'Período',
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
    ];

    return (
            <Card>
                <TableContainer sx={{ marginTop: '0px', position: 'relative', overflow: 'unset', }}
                    style={{ width: '100%' }}>
                    <GenericDataGridCustom
                        EndPoint={END_POINT_BANDEJA_PERIODOS_VENCIMIENTO}
                        columns={columns}
                        refresh={refreshAUX}
                        genericParamAUX= "#Disponible"
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
                color='warning'
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

    // console.log('el Id', IdPeriodo)

    const onDelete = async (data) => {
        try {

            const form = new FormData();
            form.append("Id", IdPeriodo)
            form.append("statusPeriodo", "#Cerrado")
            
            AxiosMandarForm(form, END_POINT_SOLICITUDES_CERRAR_ABRIR_PERIODOS);
            setTimeout(() => {
                refreshFunc(Date.now().toString());
              }, 1200);
            handleCloseConfirm();
            enqueueSnackbar('Listo, se cerró el período');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            {/* Dibujo del botón para reabrir el periódo */}
            <Button
                color= 'error'
                onClick={() => {
                    handleOpenConfirm();
                }}
                sx={{  p: 1 }}
            >
                <Iconify icon="mdi:window-close" />
                Cerrar período
            </Button>

            {/* Aquí comienza el dialog para confirmar si desea reabrir el periódo */}
            <ConfirmDialog
                open={openConfirm}
                onClose={handleCloseConfirm}
                title="Cerrar Período"
                content="¿Seguro que deseas cerrar el período de vacaciones?"
                action={
                    <Button variant="contained" color="error" onClick={onDelete}>
                        Cerrar
                    </Button>
                }
            />
        </div>
    );
}

