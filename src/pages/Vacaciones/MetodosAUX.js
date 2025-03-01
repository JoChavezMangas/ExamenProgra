import * as React from 'react';

// import { paramCase } from 'change-case';
import { useState, useEffect, useCallback } from 'react';
// @mui
import {
    Stack,
    Card,
    Container,
    Tabs,
    Tab,
    Box,
    TableContainer,
    Tooltip,
    IconButton,
    Accordion,
    Typography,
    AccordionSummary,
    AccordionDetails,
    ToggleButtonGroup,
    ToggleButton,
    SwipeableDrawer,
    ListItemButton,
    ListItem,
    Divider,
    List,
    ListItemText,
    Button,
    Grid,
    Slide,
    Dialog,
    AppBar,
    Toolbar,
    Fab,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import { CloseIcon } from '../../theme/overrides/CustomIcons';
import Iconify from '../../components/iconify';
// import { _userList, _companyList } from '../../_mock/arrays';
import { _dataList } from '../../_mock/arrays';
// sections
import { END_POINT_TABLEROS_MIS_SOLICITUDES, HOST_API_LOCAL, END_POINT_TABLEROS_SOLICITUDES } from '../../config-global';
import Label from '../../components/label';
import DialogEditarSolicitud from './EdicionSolicitud';
import ModalEspeciales from './ModalEspeciales';



export function RenderPeriodo(incio, fin) {
    const theme = useTheme();
    const isLight = theme.palette.mode === 'light';

    return (
        <div>
            <Label
                variant={isLight ? 'soft' : 'filled'}
                color='success'
                sx={{ mx: 'auto' }}
            >
                {incio}
            </Label>
            /
            <Label
                variant={isLight ? 'soft' : 'filled'}
                color='success'
                sx={{ mx: 'auto' }}
            >
                {fin}
            </Label>
        </div>
    );
}

export function RenderStatus(status) {
    const theme = useTheme();
    const isLight = theme.palette.mode === 'light';
    const colorPurpura = "#ce93d8"

    let colorStatus = "info";

    if (status === "#Rechazado")
        colorStatus = "error";
    else if (status === "#Pendiente")
        colorStatus = "warning";
    else if (status === "#Autorizado")
        colorStatus = "success";
    else if (status === "#PendienteRH")
        colorStatus = "error";
    else if (status === "#AutorizadoRH")
        colorStatus = "secondary";
    return (
        <div>
            <Label
                variant={isLight ? 'soft' : 'filled'}
                color={colorStatus}
                sx={{ mx: 'auto' }}
            >
                {status}
            </Label>
        </div>
    );
}



export function RendertipoPeticion(tipo,parametro) {

    console.log("el parametro",parametro);

    const theme = useTheme();
    const isLight = theme.palette.mode === 'light';
    let text = "Falta";
    let colorStatus = "error";
    if (tipo === "1") {
        colorStatus = "primary";
        text = "Vacaciones";
    }
    else if (tipo === "2") {
        colorStatus = "secondary";
        text = "Personal";
    }
    else if (tipo === "3") {
        colorStatus = "error";
        text = "Retardo";
    }
    else {
        colorStatus = "warning";
        text = "Dia especial";
    }

    return (
        <div>
            <Label
                variant={isLight ? 'soft' : 'filled'}
                color={colorStatus}
                sx={{ mx: 'auto' }}
            >
                {text}
            </Label>
        </div>
    );
}
