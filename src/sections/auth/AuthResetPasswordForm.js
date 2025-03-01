import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
// routes
import { useSnackbar } from '../../components/snackbar';
import { PATH_AUTH } from '../../routes/paths';
// components
import FormProvider, { RHFTextField } from '../../components/hook-form';
import { AxiosPasswordOlvidado } from '../../_Axios/AxiosFomr';


// ----------------------------------------------------------------------

export default function AuthResetPasswordForm() {
  const navigate = useNavigate();

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().required('El correo electrónico es requerido').email('Debe ingresar un correo valido'),
  });

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { email: '' },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
        AxiosPasswordOlvidado(data.email, succesfunc, errorFunc);


      // await new Promise((resolve) => setTimeout(resolve, 500));
      // sessionStorage.setItem('email-recovery', data.email);
      // succesfunc();
      // navigate(PATH_AUTH.newPassword);
    } catch (error) {
      console.error(error);
    }
  };
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const succesfunc = (data) => {
    const snackbar = enqueueSnackbar("Se envió una respuesta a tu correo electrónico", { variant: 'success' });

      console.log('miau',data)

      if (data === "OK") {
          closeSnackbar(snackbar);
          navigate(PATH_AUTH.login);
      } else {
          enqueueSnackbar("Error", { variant: 'error' });
      }

    //  setTimeout(() => {
    //    closeSnackbar(snackbar);
    //    navigate(PATH_AUTH.login);
    //  }, 1000);
  };

  const errorFunc = () => {
        const snackbar = enqueueSnackbar("Por favor verifica tu usuario", { variant: 'success' });
        setTimeout(() => {
            closeSnackbar(snackbar);
            // navigate(PATH_AUTH.login);
        }, 3000);
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <RHFTextField name="email" label="Correo electrónico" variant="filled" />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        // onClick={succesfunc}
        sx={{ mt: 3 }}
      >
        Recuperar contraseña
      </LoadingButton>
    </FormProvider>
  );
}
