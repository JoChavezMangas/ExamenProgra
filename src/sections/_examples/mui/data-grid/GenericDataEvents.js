import PropTypes from 'prop-types';
import { useState, useCallback, useEffect } from 'react';

import axios from 'axios';
// @mui
// import { useTheme } from '@mui/material/styles';
import { Box, Rating, Typography, Button, Stack, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@mui/material';
import {
    DataGrid,
    GridFooter,
    // GridToolbar,
    getGridNumericOperators,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    // GridToolbarExport,
    // GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import { DatePicker} from '@mui/x-date-pickers';

import { Controller } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';

import { GenericFileInput } from '../../../../utils/GenericFileInput';
import Editor from '../../../../components/editor/Editor';
import FormProvider, { RHFTextField, RHFUploadBox } from '../../../../components/hook-form';
import Iconify from '../../../../components/iconify/Iconify';
// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

function CustomToolbar() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        console.log('miauuuuuu')
    };
    const handleClose = () => {
        setOpen(false);
    };
    const [startDate, setStartDate] = useState(new Date());

    return (
        <>
        <GridToolbarContainer
            sx={{
                // backgroundColor: 'rgb(249, 250, 251)',
                maxheight: 55,
                paddingTop: 2,
                paddingBottom: 2,
                alignItems: "center",
                justifyContent: "space-between"
            }}
        >
            <Grid >
                <Typography variant='h5' color='primary'>Comunicados</Typography>
            </Grid>
            <Grid >
                <LoadingButton size="small" color="primary" variant="contained"
                    onClick={handleClickOpen}
                    startIcon={<Iconify icon="eva:plus-fill" />}
                    style={{backgroundColor: '#00AB55', color: '#fff'}}
                    >
                    Nuevo Comunicado
                </LoadingButton>
            </Grid>
        </GridToolbarContainer>

    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle variant='h5' color='primary'>Comunicados</DialogTitle>
        <FormProvider>
            <DialogContent>
                <DialogContentText pb={3}>
                    Por favor, ingresa los datos de tu comunicado
                </DialogContentText>
                <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <TextField fullWidth label='Título' name='titulo' />
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField fullWidth multiline maxRows={4} label='Descripción' name='descripcion' />
                </Grid>

                </Grid>
            </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="outlined" color='error'>
                Cancelar
            </Button>
            <Button onClick={handleClose} variant="contained">
                Crear un Nuevo Comunicado
            </Button>
        </DialogActions>
        </FormProvider>
    </Dialog>
    </>
    );
}


GenericDataEvents.propTypes = {
    EndPoint: PropTypes.string,
    columns: PropTypes.array,
};

export default function GenericDataEvents({ EndPoint, columns }) {
    const [endPontURL] = useState(EndPoint)
    // const [selectionModel] = useState([]);
    if (columns.length > 0) {
        const ratingColumn = columns.find((column) => column.field === 'rating');
        const ratingColIndex = columns.findIndex((col) => col.field === 'rating');

        const ratingFilterOperators = getGridNumericOperators().map((operator) => ({
            ...operator,
            InputComponent: RatingInputValue,
        }));

        columns[ratingColIndex] = {
            ...ratingColumn,
            filterOperators: ratingFilterOperators,
        };

    }

    const [pageSize, setPageSize] = useState(10);

    /// Metodo que dispara el axios
    function loadServerRows(urlEndpoint, filter_Value, operator_Value, column_Field) {

        console.log('field', column_Field);
        const AUT = `Bearer ${localStorage.getItem('accessToken')}`
        return new Promise((resolve) => {
            axios.get(urlEndpoint,
                {
                    params: { filterValue0: filter_Value, operatorValue0: operator_Value, columnField0: column_Field },
                    headers: { 'Authorization': AUT },
                    // data: { FilterValue: filterValue0, operatorValue: operatorValue0, columnField: columnField0 }
                }).
                then(response => {
                    setDataRow(response.data)
                })
        });

    }


    const [dataRow, setDataRow] = useState([])

    return (
        <DataGrid
            autoHeight
            sx={{
                '.MuiDataGrid-columnSeparator': {
                    display: 'none',
                },
                '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: 'rgba(0, 171, 85, 0.08)',
                    borderRadius: '0px',
                },
                '& .MuiDataGrid-row': {
                    color: 'rgb(69, 79, 91)',
                }
            }}
            // checkboxSelection
            disableSelectionOnClick
            header
            rows={dataRow}
            columns={columns}
            onSelectionModelChange={(newSelectionModel) => {
                // setSelectionModel(newSelectionModel);
            }}

            components={{
                Toolbar: CustomToolbar,
            }}

            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            hideFooterRowCount='true'
        hideFooterSelectedRowCount='true'
        hideFooterPagination='true'

        />
    );
}

// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

RatingInputValue.propTypes = {
    item: PropTypes.object,
    applyValue: PropTypes.func,
};

function RatingInputValue({ item, applyValue }) {
    return (
        <Box sx={{ p: 1, height: 1, alignItems: 'flex-end', display: 'flex' }}>
            <Rating
                size="small"
                precision={0.5}
                placeholder="Buscar"
                value={Number(item.value)}
                onChange={(event, newValue) => {
                    applyValue({ ...item, value: newValue });
                }}
            />
        </Box>
    );
}
