import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Grid, Hidden, Stack, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useSnackbar } from '../../components/snackbar';
import FormProvider, {
    RHFTextField,
} from '../../components/hook-form';
import GenericCombo from '../../utils/GenericCombo';
import Iconify from '../../components/iconify';
import { HOST_API_LOCAL, END_POINT_CREAR_DEPARTAMENTO, END_POINT_EDITAR_DEPARTAMENTO, END_POINT_COMBO_LISTA_EMPRESA, END_POINT_COMBO_LISTA_AREA_POR_EMPRESAS } from '../../config-global';
import { PATH_DASHBOARD } from '../../routes/paths';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs/CustomBreadcrumbs';





// ----------------------------------------------------------------------



export default function CrearPedido() {

    const { enqueueSnackbar } = useSnackbar();

    // Validaciones para que campos sea requeridos
    const NewDepartamentoSchema = Yup.object().shape({});

    // ??
    const methods = useForm({
        resolver: yupResolver(NewDepartamentoSchema),
    });

    // ??
    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    // constante para disablear en caso de que se este editando
    



    const onSubmit = async (data) => {
        try {

            console.log('DATA', data);

        } catch (error) {
            console.error(error);
        }
    };

    const [idDepartamento, setIdDepartamento] = useState(0)

    const [filtroValor, setfiltroValor] = useState(0)
    const [empresaValor, setempresaValor] = useState(0)
    const [areaValor, setAreaValor] = useState(0)

    const changeFunc = (param) => {
        setfiltroValor(param);
    }

    return (
        <>

            <Helmet>
                <title> Registrar pedidosSSS </title>
            </Helmet>


            <Hidden smDown>
                <CustomBreadcrumbs
                    heading={
                        <>Registrar pedido</>
                    }
                    links={[
                        {
                            name: 'Por favor llena los datos',
                            href: PATH_DASHBOARD.root,
                        }
                    ]}

                    action={<Button component={RouterLink}
                        to={PATH_DASHBOARD.inicio.root}
                        variant="contained"
                        startIcon={<Iconify icon="ic:round-arrow-back" />}
                    >
                        Regresar
                    </Button>}
                />
            </Hidden>

            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                        <Card sx={{ p: 3 }}>
                            <Box
                                rowGap={3}
                                columnGap={3}
                                display="grid"
                                gridTemplateColumns={{
                                    xs: 'repeat(1, 1fr)',
                                    sm: 'repeat(3, 1fr)',
                                }}
                            >
                                <RHFTextField name="Broker" label="Broker" />
                                <RHFTextField name="Estado" label="Estado" />
                                <RHFTextField name="Empleado" label="Empleado" />
                                <RHFTextField  name="Fecha" label="Fecha de firma" />
                                <RHFTextField  name="Monto" label="Monto" />
                                <RHFTextField  name="Banco" label="Banco" />
                                

                               

                            </Box>

                            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                                    Guardar
                                </LoadingButton>
                            </Stack>
                        </Card>
                    </Grid>
                </Grid>
            </FormProvider>
            <br />

        </>
    );
}
