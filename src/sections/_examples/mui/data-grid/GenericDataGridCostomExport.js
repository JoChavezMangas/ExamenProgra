import PropTypes from 'prop-types';
import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
// @mui
import { Box, Rating, } from '@mui/material';
import {
    DataGrid,
    // GridToolbar,
    GridCsvExportOptions,
    getGridNumericOperators,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import { AxiosBandejaGenerica } from '../../../../_Axios/AxiosFomr';


// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

function CustomToolbar() {
    return (
        <GridToolbarContainer
        sx={{
            backgroundColor: 'rgb(249, 250, 251)',
            height:45,
            paddingTop:1,
            paddingBottom:4,
            color:'rgb(196, 205, 213)',
        }}
        >
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarExport
                printOptions={{ disableToolbarButton: true }} 
                csvOptions={{
                    utf8WithBom: true,
                }}
            />
        </GridToolbarContainer>
    );
}


GenericDataGridCustomExport.propTypes = {
    EndPoint: PropTypes.string,
    columns: PropTypes.array,
    refresh: PropTypes.string,
    genericParamAUX: PropTypes.string,
};

export default function GenericDataGridCustomExport({ EndPoint, columns, refresh, genericParamAUX }) {
    const [endPontURL] = useState(EndPoint)
    // const paramaAUX = "#2023-04-14#Historial";
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

    /// constantes para filtros
    const [filterValue, setFilterValue] = useState("");
    const [operatorValue, setOperatorValue] = useState("");
    const [columnField, setColumnField] = useState("");


    /// Metodo que cambia los valores para filtros
    const onFilterChange = useCallback((filterModel) => {
        setFilterValue(filterModel.items[0].value)
        setOperatorValue(filterModel.items[0].operatorValue)
        setColumnField(filterModel.items[0].columnField)
    }, []);




    /// Metodo que dispara el axios
    function loadServerRows(urlEndpoint, filter_Value, operator_Value, column_Field, paramaAUX) {     

        // const AUT = `Bearer ${localStorage.getItem('accessToken')}`
        // const empleadoActual = localStorage.getItem('EmpleadoId')

        return new Promise((resolve) => {

            AxiosBandejaGenerica(urlEndpoint, setDataRow, filter_Value, operator_Value, column_Field, paramaAUX)

            // axios.get(urlEndpoint,
            //    {
            //        params: { filterValue0: filter_Value, operatorValue0: operator_Value, columnField0: column_Field, EmpleadoActual: empleadoActual, genericParam: paramaAUX },
            //        headers: { 'Authorization': AUT },
            //        // data: { FilterValue: filterValue0, operatorValue: operatorValue0, columnField: columnField0 }
            //    }).then(response =>
            //    {
            //        setDataRow(response.data)
            //    })            
        });
        
    }

    /// Use efect que verifica que se esta cambiando el valor del filtro
    useEffect(() => {

        const paramaAUX = genericParamAUX;

        (async () => {
            loadServerRows(endPontURL, filterValue, operatorValue, columnField, paramaAUX)
        })();
    }, [endPontURL, filterValue, operatorValue, columnField, refresh, genericParamAUX ]);

    const [dataRow, setDataRow] = useState([])

    return (
        <DataGrid
            autoHeight
            sx={{
                '.MuiDataGrid-columnSeparator': {
                    display: 'none',
                  },
                '& .MuiDataGrid-columnHeaders':{
                    backgroundColor: 'rgba(0, 171, 85, 0.08)',
                    borderRadius: '0px',
                },
                '& .MuiDataGrid-row':{
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
            localeText={{
                noRowsLabel: 'No se encontraron datos de la búsqueda',
                noResultsOverlayLabel: 'Resultados no encontrados',
                toolbarColumns: 'Columnas',
                toolbarFilters: 'Filtros',
                toolbarExport:'Exportar',
                toolbarExportCSV:'Descargar como CSV',
                columnsPanelTextFieldPlaceholder: 'Columna',
                columnsPanelTextFieldLabel: 'Búsqueda',
                columnsPanelShowAllButton:'Mostrar',
                columnsPanelHideAllButton:'Ocultar',
                filterPanelOperators:'Tipo de Filtro',
                filterPanelOperatorAnd:'y',
                filterPanelOperatorOr:'o',
                filterOperatorIs: 'es',
                filterOperatorNot: 'no es',
                filterPanelColumns: 'Columna',
                filterPanelInputLabel: 'Valor',
                filterPanelInputPlaceholder: 'Valor',
                filterOperatorContains: 'Contiene el Valor',
                filterOperatorEquals: 'Es igual a',
                filterOperatorStartsWith: 'Comienza con',
                filterOperatorEndsWith: 'Termina con',
                filterOperatorIsEmpty: 'No tiene Valor',
                filterOperatorIsNotEmpty: 'Tiene Valor',
                filterOperatorIsAnyOf: 'Tiene el Valor',
                columnMenuUnsort: 'Sin orden',
                columnMenuSortAsc: 'Orden Ascendente',
                columnMenuSortDesc: 'Orden Descendete',
                columnMenuShowColumns:'Mostrar Columna',
                columnMenuFilter: 'Filtros',
                columnMenuHideColumn: 'Ocultar Columna',
                footerTotalRows: 'Filas Totales:',
            }}
            components={{
                Toolbar: CustomToolbar,
                
            }}
            componentsProps={{
                pagination:{
                labelRowsPerPage: "Filas por página",   
            }
        }}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[10, 25, 50]}
            pagination
            filterMode="server"
            onFilterModelChange={onFilterChange}
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
