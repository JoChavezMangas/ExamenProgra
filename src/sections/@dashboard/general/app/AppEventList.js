import { Helmet } from 'react-helmet-async';
// import { paramCase } from 'change-case';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import {
  Card,
  Button,
  // Divider,
  Container,
  IconButton,
  TableContainer,
  Typography,
  MenuItem
} from '@mui/material';

import { useTheme } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
// routes
import { paramCase } from 'change-case';
import { PATH_DASHBOARD } from '../../../../routes/paths';
// _mock_
import { _dataList } from '../../../../_mock/arrays';
// components
import Iconify from '../../../../components/iconify';
import ConfirmDialog from '../../../../components/confirm-dialog';
// sections
import GenericDataEvents from '../../../_examples/mui/data-grid/GenericDataEvents';
import Label from '../../../../components/label';
import { CustomAvatar } from '../../../../components/custom-avatar';
import MenuPopover from '../../../../components/menu-popover';



export default function AppEventList() {

  const [openConfirm, setOpenConfirm] = useState(false);
  const [openPopover, setOpenPopover] = useState(null);
  const [tableData, setTableData] = useState(_dataList);
  const [IdAUX, setIdAUX] = useState('');
  const navigate = useNavigate();
  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };
  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };
  const handleOpenPopover = (e, Id) => {
    setIdAUX(Id)
    setOpenPopover(e.currentTarget);
  };
  const handleClosePopover = () => {
    setOpenPopover(null);
  };
  const handleEditRow = (id) => {
    console.log(id)
    navigate(PATH_DASHBOARD.empresa.edit(paramCase(id)));
  };
  const JustAfterClicDelete = () => {
    handleDeleteRow(IdAUX);
    onDelete(IdAUX);
  }
  const handleDeleteRow = (id) => {
    const deleteRow = tableData.filter((row) => row.id !== id);
    setTableData(deleteRow);
    setOpenConfirm(false);
  };

  const { enqueueSnackbar } = useSnackbar();
  const onDelete = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      enqueueSnackbar('El comunicado fue borrado');
    } catch (error) {
      console.error(error);
    }
  };



  const columns = [
    {
      field: 'avatar',
      headerName: '',
      align: 'center',
      headerAlign: 'center',
      width: 64,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => <CustomAvatar name={params.row.name} sx={{ width: 36, height: 36 }} />,
    },
    {
      field: 'name',
      headerName: 'Descripción',
      flex: 1,
      editable: false,
    },

    {
      field: 'action',
      headerName: 'Acciones',
      align: 'center',
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <IconButton color={openPopover ? 'inherit' : 'default'} onClick={(e) => handleOpenPopover(e, params.row.id)}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      ),
    },
  ];

  return (
    <>
      <Card>
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <GenericDataEvents data={tableData} columns={columns} />
        </TableContainer>
      </Card>



      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:download-fill" />
          Descargar
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleEditRow(IdAUX);
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:share-fill" />
          Compartir
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Borrar
        </MenuItem>
      </MenuPopover>


      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Borrar"
        content="¿Deseas borrar esta comunicado?"
        action={
          <Button variant="contained" color="error" onClick={JustAfterClicDelete}>
            Borrar
          </Button>
        }
      />

    </>
  );
}
