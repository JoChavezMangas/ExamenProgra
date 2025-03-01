import PropTypes from 'prop-types';

import * as Yup from 'yup';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Form, useNavigate, useParams } from 'react-router-dom';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, Grid, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { DatePicker } from '@mui/x-date-pickers';
// // utils
import { fData } from '../../../utils/formatNumber';
// routes
import { PATH_AUTH, PATH_DASHBOARD } from '../../../routes/paths';
// // assets
// import { countries } from '../../../assets/data';
// // components
import Label from '../../../components/label';
import FormProvider, {
  RHFSelect,
  RHFTextField,
  RHFRadioGroup,
  RHFUploadPhoto,

} from '../../../components/hook-form';
import GenericCombo from '../../../utils/GenericCombo';
import Iconify from '../../../components/iconify';
import { AxiosMandarForm, AxiosIdSucces, AxiosActivarMulti, AxiosCrearMulti, AxiosActualziarIdExternoCRUP } from '../../../_Axios/AxiosFomr';
import { useAuthContext } from '../../../auth/useAuthContext';
import {
    END_POINT_CREAR_MULTILOGIN,
    END_POINT_ACTUALIZAR_USUARIO,
    END_POINT_CAMBIAR_PASS_MULTI,
    TEXTO_ERROR_PASS,
    END_POINT_EMPLEADO_VERIFICAR_MULTI,
    END_POINT_ACTUALIZAR_CURP_IDEXTERNO,
    END_POINT_BANDEJA_LOGS
} from '../../../config-global';
import ModalOtroSistema from '../../../pages/Empleado/ModalOtroSistema';
import HistorialSistemas from '../../../pages/Empleado/HistorialSistemas';
import GenericDataGridCustom from '../../_examples/mui/data-grid/GenericDataGridCostom';

// ----------------------------------------------------------------------


EmpleadoSoporte.propTypes = {
  isEdit: PropTypes.bool,
  currentEmpleado: PropTypes.object,
};


export default function EmpleadoSoporte({ isEdit = false, currentEmpleado }) {

  // Constantes
  const [disabledUS, setDisabledUS] = useState(true);
    const [disabledPas, setDisabledPas] = useState(true);
    const [disabledCURP, setDisabledCURP] = useState(true);
  const [mostrarGuardarUS, setMostrarGuardarUS] = useState(false);
  const [mostrarGuardarPAS, setMostrarGuardarPAS] = useState(false);
  const [mostrarGuardarCURP, setMostrarGuardarCURP] = useState(false);
  const [mostrarBotonEditarUS, setMostrarBotonEditarUS] = useState(true);
  const [mostrarBotonEditarPAS, setMostrarBotonEditarPAS] = useState(true);
    const [mostrarBotonEditarCURP, setMostrarBotonEditarCURP] = useState(true);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [Idempleado, setIdEmpleado] = useState(0);
  const [nombre, setNombre] = useState("");
  const [mostrarBotonActivar, setMostrarBotonActivar] = useState(false);
  const [mostrarBotonCrearEnMulti, setMostrarBotonCrearEnMulti] = useState(false);

  // Acordeón
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const { enqueueSnackbar } = useSnackbar();

  // Formulario
  const navigate = useNavigate();

  const NewEmpleadoSchema = Yup.object().shape({
    correoEmpresarial: Yup
      .string(),
    nuevaContrasena: Yup
      .string(),
    confirmarContrasena: Yup
      .string()
      .oneOf([Yup.ref('nuevaContrasena'), null], 'Las contraseñas deben coincidir'),
    nuevoUsuario: Yup
      .string().required('Ingresa el usuario'),
    correo: Yup
      .string().required('Ingresa el correo'),

  });

  const [defaultValues, setDefaultValues] = useState({
    correoEmpresarial: currentEmpleado?.correoEmpresarial || '',
    userName: currentEmpleado?.userName || '',
    curp: currentEmpleado?.curp || '',
    IdempleadoExterno: currentEmpleado?.idUser || '',
    nuevaContrasena: currentEmpleado?.nuevaContrasena || '',
  });

  useEffect(() => {
    setDefaultValues({
      correoEmpresarial: currentEmpleado?.correoEmpresarial || '',
      userName: currentEmpleado?.userName || '',
      nuevaContrasena: currentEmpleado?.nuevaContrasena || '',
      curp: currentEmpleado?.curp || '',
      IdempleadoExterno: currentEmpleado?.idUser || '',
    });

      console.log('el empleado',currentEmpleado)
      setIdEmpleadoExteno(currentEmpleado.idUser);
      setIdEmpleado(currentEmpleado.id);

  }, [currentEmpleado]);

  const methods = useForm({
    resolver: yupResolver(NewEmpleadoSchema),
    defaultValues,
  });

  const {
    control,
    watch,
    setValue,
    getValues,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const submtUS = () => {
      // console.log('el primer submit', nombreUsuario, correoUsuario, currentEmpleado.id);
      const url = END_POINT_ACTUALIZAR_USUARIO;

      const form = new FormData();
      form.append("userId", currentEmpleado.id)
      form.append("userName", nombreUsuario)
      form.append("userEmail", correoUsuario)
      
      AxiosMandarForm(form, url, succesFunc, errorFunc)

  }

  const submitActivarMulti = () => {
      AxiosActivarMulti(END_POINT_EMPLEADO_VERIFICAR_MULTI, currentEmpleado.id, succesFuncActivarMulti)
  }

  const submitCrearMulti = () => {
      AxiosCrearMulti(END_POINT_CREAR_MULTILOGIN, currentEmpleado.id, succesFuncCrearMulti)
  }

  const submitEditDatos = () => {

        if (curp !== "" && IdempleadoExterno!=="")
            AxiosActualziarIdExternoCRUP(END_POINT_ACTUALIZAR_CURP_IDEXTERNO, currentEmpleado.id, curp, IdempleadoExterno, succesFunc, errorFunc)
        else
            errorFunc("Todos los datos son requeridos.")

    }

  const submtPas = () => {
      const url = END_POINT_CAMBIAR_PASS_MULTI;

      const form = new FormData();
      form.append("Id", currentEmpleado.id)
      form.append("Username", "...")
      form.append("Email", "...")
      form.append("Password", nuevoPas)
      form.append("ConfirmPassword", confirmPas)

      if (nuevoPas === confirmPas)
          AxiosMandarForm(form, url, succesFunc, errorFunc)
      else
          enqueueSnackbar(TEXTO_ERROR_PASS,{ variant: 'error' })
  }

  const succesFunc = (data) => {
      enqueueSnackbar(data)
  }

  const succesFuncActivarMulti = (data) => {
      enqueueSnackbar(data.status)
  }

  const succesFuncCrearMulti = (data) => {
     enqueueSnackbar(data.message)
  }

  const errorFunc = (data) => {
      enqueueSnackbar(data, { variant: 'error' })
  }

    const [nombreUsuario, setNombreUsuario] = useState(defaultValues.userName);
    const [correoUsuario, setCorreoUsuario] = useState(defaultValues.correoEmpresarial);
    const [curp, setcurp] = useState(defaultValues.curp);
    const [nuevoPas, setNuevoPas] = useState("");
    const [IdempleadoExterno, setIdEmpleadoExteno] = useState(defaultValues.idUser);
    const [confirmPas, setConfirmPas] = useState("");

    /// const MemoizedHistorialSistemas = React.memo(HistorialSistemas, { empleadoId = 302, empleadoExternoId="22e4e93c-c1f1-42dd-88a2-dbc24961f2f0" });

    const columns = [
      
        {
            field: 'status',
            headerName: 'status',
            editable: false,
            width: 230,
            // renderCell: (params) => RenderStatus(params.row.nombreDepartamento, params.row),
        },
        {
            field: 'urlEnpoint',
            headerName: 'urlEnpoint',
            flex: 1,
            editable: false,
        },
        {
            field: 'message',
            headerName: 'message',
            flex: 1,
            editable: false,
        },
        {
            field: 'json',
            headerName: 'json',
            flex: 1,
            editable: false,
        }
       
    ];

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>


                      <Accordion expanded={expanded === 'panel0'} onChange={handleChange('panel0')}>
                          <AccordionSummary
                              expandIcon={<Iconify icon="iconamoon:arrow-down-2" />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                          >
                              <Typography
                                  style={{ fontWeight: expanded === 'panel0' ? 'bold' : '500', color: expanded === 'panel0' ? '#1f9382' : 'black' }}>
                                  Informacion basica
                              </Typography>
                          </AccordionSummary>


                          <AccordionDetails>
                              <FormProvider methods={methods}>
                                  <Box
                                      rowGap={6}
                                      columnGap={6}
                                      display="grid"
                                      gridTemplateColumns={{
                                          xs: 'repeat(1, 1fr)',
                                          sm: 'repeat(2, 1fr)',
                                      }}
                                  >


                                      <RHFTextField disabled={disabledCURP} type="text" name="curp" label="curp" value={curp} onChange={(e) => { setcurp(e.target.value) }} />
                                      <RHFTextField disabled={disabledCURP} type="text" name="IdExterno" label="IdExterno" value={IdempleadoExterno} onChange={(e) => { setIdEmpleadoExteno(e.target.value) }} />

                                     
                                  </Box>


                                  <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                                      {mostrarGuardarCURP ? (
                                          <LoadingButton variant="contained" loading={isSubmitting} onClick={submitEditDatos}>
                                              Guardar Cambios
                                          </LoadingButton>
                                      ) : null}

                                      {mostrarBotonEditarCURP ? (
                                          <LoadingButton
                                              onClick={() => { setDisabledCURP(false); setMostrarGuardarCURP(true); setMostrarBotonEditarCURP(false); }}>
                                              <Iconify icon="eva:edit-fill" /> Editar
                                          </LoadingButton>
                                      ) : null}
                                  </Stack>


                              </FormProvider>
                          </AccordionDetails>

                      </Accordion>



            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <AccordionSummary
                expandIcon={<Iconify icon="iconamoon:arrow-down-2" />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography
                  style={{ fontWeight: expanded === 'panel1' ? 'bold' : '500', color: expanded === 'panel1' ? '#1f9382' : 'black' }}>
                  Cambio de Usuario
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormProvider methods={methods}>
                  <Box
                    rowGap={3}
                    columnGap={3}
                    display="grid"
                    gridTemplateColumns={{
                      xs: 'repeat(1, 1fr)',
                      sm: 'repeat(4, 1fr)',
                    }}
                                  >


                    <RHFTextField disabled={disabledUS} type="text" name="usuario" label="Usuario Actual" value={nombreUsuario} onChange={(e) => { setNombreUsuario(e.target.value) }} />
                    <RHFTextField disabled={disabledUS} type="text" name="correoEmpresarial" label='Correo Empresarial' value={correoUsuario} onChange={(e) => { setCorreoUsuario(e.target.value) }} />
                   </Box>
                  <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                    {mostrarGuardarUS ? (
                      <LoadingButton variant="contained" loading={isSubmitting} onClick={submtUS}>
                        Guardar Cambios
                      </LoadingButton>
                    ) : null}

                    {mostrarBotonEditarUS ? (
                        <LoadingButton
                            onClick={() => { setDisabledUS(false); setMostrarGuardarUS(true); setMostrarBotonEditarUS(false); }}>
                        <Iconify icon="eva:edit-fill" /> Editar
                      </LoadingButton>
                    ) : null}
                  </Stack>
                </FormProvider>
              </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
              <AccordionSummary
                expandIcon={<Iconify icon="iconamoon:arrow-down-2" />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography
                  style={{ fontWeight: expanded === 'panel2' ? 'bold' : '500', color: expanded === 'panel2' ? '#1f9382' : 'black' }}>
                  Cambio de Contraseña
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormProvider methods={methods}>
                  <Box
                    rowGap={3}
                    columnGap={3}
                    display="grid"
                    gridTemplateColumns={{
                      xs: 'repeat(1, 1fr)',
                      sm: 'repeat(4, 1fr)',
                    }}>
                    <RHFTextField disabled={disabledPas} type="password" name="nuevaContrasena" label="Nueva Contraseña" value={nuevoPas} onChange={(e) => { setNuevoPas(e.target.value) }} />
                    <RHFTextField disabled={disabledPas} type="password" name="confirmarContrasena" label="Confirmar Contraseña" value={confirmPas} onChange={(e) => { setConfirmPas(e.target.value) }} />

                    *La nueva Contraseña debe de contener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial

                    </Box>
                  <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                    {mostrarGuardarPAS ? (
                      <LoadingButton variant="contained" loading={isSubmitting} onClick={submtPas}>
                        Guardar Cambios
                      </LoadingButton>
                    ) : null}

                    {mostrarBotonEditarPAS ? (
                      <LoadingButton
                        onClick={() => { setDisabledPas(false); setMostrarGuardarPAS(true); setMostrarBotonEditarPAS(false); }}>
                        <Iconify icon="eva:edit-fill" /> Editar
                      </LoadingButton>
                    ) : null}

                  </Stack>
                </FormProvider>
              </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
              <AccordionSummary
                expandIcon={<Iconify icon="iconamoon:arrow-down-2" />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography
                  style={{ fontWeight: expanded === 'panel3' ? 'bold' : '500', color: expanded === 'panel3' ? '#1f9382' : 'black' }}>
                  Editar Sistemas
                </Typography>
              </AccordionSummary>

              <AccordionDetails>
                    <Box
                        rowGap={3}
                        columnGap={3}
                        display="grid"
                        gridTemplateColumns={{
                            xs: 'repeat(1, 1fr)',
                            sm: 'repeat(4, 1fr)',
                        }}>
                                  {mostrarBotonActivar?
                                      <LoadingButton variant="contained" onClick={submitActivarMulti}>
                                          Confirmar Activar en multilogin
                                      </LoadingButton>
                                      :
                                      <LoadingButton variant="outlined" onClick={() => { setMostrarBotonActivar(true); }}>
                                          Activar en multilogin
                                      </LoadingButton>
                                  }

                             

                                  {
                                      mostrarBotonCrearEnMulti?
                                          <LoadingButton variant="contained" onClick={submitCrearMulti}>
                                          Confirmar Crear en multilogin
                                      </LoadingButton>
                                          :
                                          <LoadingButton variant="outlined" onClick={() => { setMostrarBotonCrearEnMulti(true); }}>
                                        Crear en multilogin
                                     </LoadingButton>
                                  }

                              

                                  { /*     <LoadingButton variant="outlined" onClick={() => { setOpen(true); }}>
                                  Añadir Empleado a Otro Sistema
                              </LoadingButton> */ }
                    </Box>
                 
               
                              { /* <HistorialSistemas empleadoId={302} empleadoExternoId="22e4e93c-c1f1-42dd-88a2-dbc24961f2f0" /> */ }

                </AccordionDetails>

            </Accordion>

                   { /* <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                          <AccordionSummary
                              expandIcon={<Iconify icon="iconamoon:arrow-down-2" />}
                              aria-controls="panel4a-content"
                              id="panel4a-header"
                          >
                              <Typography
                                  style={{ fontWeight: expanded === 'panel4' ? 'bold' : '500', color: expanded === 'panel4' ? '#1f9382' : 'black' }}>
                                  Log de errores
                              </Typography>
                          </AccordionSummary>

                          <AccordionDetails>

                              <GenericDataGridCustom EndPoint={END_POINT_BANDEJA_LOGS} columns={columns} />

                          </AccordionDetails>
                      </Accordion> */ }

          </Card>
        </Grid>
          </Grid>
            
          { /* <HistorialSistemass /> */ }

    { /* <ModalOtroSistema
        openModal={open}
        openFunc={setOpen}
        openLoading={isLoading}
        loadingFunc={setIsLoading}
        emploadoId={Idempleado}
        emploadoIdExterno={IdempleadoExterno}
        nombre={nombre}
        isEdit
      />
           */ }
    </>
  );
}



function HistorialSistemass() {


    console.log('render local','LOCAL')

    return (
        
        <Box
            mt={4}
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(3, 1fr)',
            }}
        >
            <Card sx={{ padding: 4, }} >
                <Typography >Sistema: SISEC</Typography>
                <Typography >Rol: CUENTA MAESTRA</Typography>
                <Typography >Otros Datos: OTROS DATOS</Typography>
            </Card> 


        </Box>
        )

}




