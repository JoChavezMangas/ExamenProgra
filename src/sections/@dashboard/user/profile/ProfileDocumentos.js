import PropTypes from 'prop-types';
// form
import { styled } from '@mui/material/styles';

import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Card, FormHelperText, Grid, IconButton, Typography, Button, Box } from '@mui/material';
// Import con ruta
import Iconify from '../../../../components/iconify';


// --------------------------------------------------
const StyledIcon = styled(Iconify)(({ theme }) => ({
  width: 15,
  height: 15,
  color:'#005249',
  marginTop:5,
}));

export default function ProfileDocumentos({ name, ...other }) {

  return (
    <>
      <Box sx={{paddingBottom: 2, paddingTop: 4, display:'flex'}}>
      <StyledIcon icon="mdi:cards-heart"/>
      <Typography variant='h6' sx={{color:'#005249'}}>Documentos Personales</Typography>
      </Box>
      <Grid container spacing={3} sx={{background: '#fff' }}>
        <Grid item xs={12} md={2}>
          <Button color='primary' variant='outlined' fullWidth aria-label="upload" component="label"
            sx={{
              minHeight: 120,
              display: 'block',
              textAlign:'center',
              paddingTop:3,
            }}
          >
            <Typography variant='body2' sx={{color:'#005249'}}>INE</Typography>
            <StyledIcon icon="ic:round-plus" />
            <input hidden accept="/*" type="file" />
          </Button>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button color='primary' variant='outlined' fullWidth aria-label="upload" component="label"
            sx={{
              minHeight: 120,
              display: 'block',
              textAlign:'center',
              paddingTop:3,
            }}
          >
            <Typography variant='body2'sx={{color:'#005249'}}>NSS</Typography>
            <StyledIcon icon="ic:round-plus" />
            <input hidden accept="/*" type="file" />
          </Button>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button color='primary' variant='outlined' fullWidth aria-label="upload" component="label"
            sx={{
              minHeight: 120,
              display: 'block',
              textAlign:'center',
              paddingTop:3,
            }}
          >
            <Typography variant='body2' sx={{color:'#005249'}}>CURP</Typography>
            <StyledIcon icon="ic:round-plus" />
            <input hidden accept="/*" type="file" />
          </Button>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button color='primary' variant='outlined' fullWidth aria-label="upload" component="label"
            sx={{
              minHeight: 120,
              display: 'block',
              textAlign:'center',
              paddingTop:3,
            }}
          >
            <Typography variant='body2' sx={{color:'#005249'}}>RFC</Typography>
            <StyledIcon icon="ic:round-plus" />
            <input hidden accept="/*" type="file" />
          </Button>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button color='primary' variant='outlined' fullWidth aria-label="upload" component="label"
            sx={{
              minHeight: 120,
              display: 'block',
              textAlign:'center',
              paddingTop:3,
            }}
          >
            <Typography variant='body2' sx={{color:'#005249'}}>Pasaporte</Typography>
            <StyledIcon icon="ic:round-plus" />
            <input hidden accept="/*" type="file" />
          </Button>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button color='primary' variant='outlined' fullWidth aria-label="upload" component="label"
            sx={{
              minHeight: 120,
              display: 'block',
              textAlign:'center',
              paddingTop:3,
            }}
          >
            <Typography variant='body2' sx={{color:'#005249'}}>Comprobante de domicilio</Typography>
            <StyledIcon icon="ic:round-plus" />
            <input hidden accept="/*" type="file" />
          </Button>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button color='primary' variant='outlined' fullWidth aria-label="upload" component="label"
            sx={{
              minHeight: 120,
              display: 'block',
              textAlign:'center',
              paddingTop:3,
            }}
          >
            <Typography variant='body2' sx={{color:'#005249'}}>Acta de nacimiento</Typography>
            <StyledIcon icon="ic:round-plus" />
            <input hidden accept="/*" type="file" />
          </Button>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button color='primary' variant='outlined' fullWidth aria-label="upload" component="label"
            sx={{
              minHeight: 120,
              display: 'block',
              textAlign:'center',
              paddingTop:3,
            }}
          >
            <Typography variant='body2' sx={{color:'#005249'}}>Licencia de conducir</Typography>
            <StyledIcon icon="ic:round-plus" />
            <input hidden accept="/*" type="file" />
          </Button>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button color='primary' variant='outlined' fullWidth aria-label="upload" component="label"
            sx={{
              minHeight: 120,
              display: 'block',
              textAlign:'center',
              paddingTop:3,
            }}
          >
            <Typography variant='body2' sx={{color:'#005249'}}>Comprobante de cuenta bancaria</Typography>
            <StyledIcon icon="ic:round-plus" />
            <input hidden accept="/*" type="file" />
          </Button>
        </Grid>
      </Grid>
      
      <Box sx={{paddingBottom: 2, paddingTop: 6, display:'flex'}}>
      <StyledIcon icon="ic:baseline-work" />
      <Typography variant='h6' sx={{color:'#005249'}}>Documentos Laborales</Typography>
      </Box>
      <Grid container spacing={3} sx={{ background: '#fff' }}>
        <Grid item xs={12} md={2}>
          <Button color='primary' variant='outlined' fullWidth aria-label="upload" component="label"
            sx={{
              minHeight: 120,
              display: 'block',
              textAlign:'center',
              paddingTop:3,
            }}
          >
            <Typography variant='body2' sx={{color:'#005249'}}>Currículum</Typography>
            <StyledIcon icon="ic:round-plus" />
            <input hidden accept="/*" type="file" />
          </Button>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button color='primary' variant='outlined' fullWidth aria-label="upload" component="label"
            sx={{
              minHeight: 120,
              display: 'block',
              textAlign:'center',
              paddingTop:3,
            }}
          >
            <Typography variant='body2'sx={{color:'#005249'}}>Contrato</Typography>
            <StyledIcon icon="ic:round-plus" />
            <input hidden accept="/*" type="file" />
          </Button>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button color='primary' variant='outlined' fullWidth aria-label="upload" component="label"
            sx={{
              minHeight: 120,
              display: 'block',
              textAlign:'center',
              paddingTop:3,
            }}
          >
            <Typography variant='body2' sx={{color:'#005249'}}>Carta de oferta</Typography>
            <StyledIcon icon="ic:round-plus" />
            <input hidden accept="/*" type="file" />
          </Button>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button color='primary' variant='outlined' fullWidth aria-label="upload" component="label"
            sx={{
              minHeight: 120,
              display: 'block',
              textAlign:'center',
              paddingTop:3,
            }}
          >
            <Typography variant='body2' sx={{color:'#005249'}}>Solicitud de trabajo</Typography>
            <StyledIcon icon="ic:round-plus" />
            <input hidden accept="/*" type="file" />
          </Button>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button color='primary' variant='outlined' fullWidth aria-label="upload" component="label"
            sx={{
              minHeight: 120,
              display: 'block',
              textAlign:'center',
              paddingTop:3,
            }}
          >
            <Typography variant='body2' sx={{color:'#005249'}}>Exámenes psicométricos</Typography>
            <StyledIcon icon="ic:round-plus" />
            <input hidden accept="/*" type="file" />
          </Button>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button color='primary' variant='outlined' fullWidth aria-label="upload" component="label"
            sx={{
              minHeight: 120,
              display: 'block',
              textAlign:'center',
              paddingTop:3,
            }}
          >
            <Typography variant='body2' sx={{color:'#005249'}}>Carta de recomendación</Typography>
            <StyledIcon icon="ic:round-plus" />
            <input hidden accept="/*" type="file" />
          </Button>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button color='primary' variant='outlined' fullWidth aria-label="upload" component="label"
            sx={{
              minHeight: 120,
              display: 'block',
              textAlign:'center',
              paddingTop:3,
            }}
          >
            <Typography variant='body2' sx={{color:'#005249'}}>Constancia laboral</Typography>
            <StyledIcon icon="ic:round-plus" />
            <input hidden accept="/*" type="file" />
          </Button>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button color='primary' variant='outlined' fullWidth aria-label="upload" component="label"
            sx={{
              minHeight: 120,
              display: 'block',
              textAlign:'center',
              paddingTop:2,
            }}
          >
            <Typography variant='body2' sx={{color:'#005249'}}>Aviso de retención Infonavit</Typography>
            <StyledIcon icon="ic:round-plus" />
            <input hidden accept="/*" type="file" />
          </Button>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button color='primary' variant='outlined' fullWidth aria-label="upload" component="label"
            sx={{
              minHeight: 120,
              display: 'block',
              textAlign:'center',
              paddingTop:3,
            }}
          >
            <Typography variant='body2' sx={{color:'#005249'}}>Fotografías</Typography>
            <StyledIcon icon="ic:round-plus" />
            <input hidden accept="/*" type="file" />
          </Button>
        </Grid>
      </Grid>

      <Box sx={{paddingBottom: 2, paddingTop: 6, display:'flex'}}>
      <StyledIcon icon="ic:round-school"/>
      <Typography variant='h6' sx={{color:'#005249'}}>Académicos</Typography>
      </Box>
      <Grid container spacing={3} sx={{ background: '#fff' }}>
        <Grid item xs={12} md={2}>
          <Button color='primary' variant='outlined' fullWidth aria-label="upload" component="label"
            sx={{
              minHeight: 120,
              display: 'block',
              textAlign:'center',
              paddingTop:3,
            }}
          >
            <Typography variant='body2' sx={{color:'#005249'}}>Certificado</Typography>
            <StyledIcon icon="ic:round-plus" />
            <input hidden accept="/*" type="file" />
          </Button>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button color='primary' variant='outlined' fullWidth aria-label="upload" component="label"
            sx={{
              minHeight: 120,
              display: 'block',
              textAlign:'center',
              paddingTop:3,
            }}
          >
            <Typography variant='body2'sx={{color:'#005249'}}>Comprobante de estudios</Typography>
            <StyledIcon icon="ic:round-plus" />
            <input hidden accept="/*" type="file" />
          </Button>
        </Grid>
      </Grid>

      <Box sx={{paddingBottom: 2, paddingTop: 6, display:'flex'}}>
      <StyledIcon icon="mingcute:certificate-fill"/>
      <Typography variant='h6' sx={{color:'#005249'}}>Certificado de vacunación</Typography>
      </Box>
      <Grid container spacing={3} sx={{ background: '#fff' }}>
        <Grid item xs={12} md={2}>
          <Button color='primary' variant='outlined' fullWidth aria-label="upload" component="label"
            sx={{
              minHeight: 120,
              display: 'block',
              textAlign:'center',
              paddingTop:3,
            }}
          >
            <Typography variant='body2' sx={{color:'#005249'}}>Certificado</Typography>
            <StyledIcon icon="ic:round-plus" />
            <input hidden accept="/*" type="file" />
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

