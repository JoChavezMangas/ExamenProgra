import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';

import { Link, Card, CardHeader, Stack, Typography } from '@mui/material';
// _mock
import { _socials } from '../../../../../_mock/arrays';
// components
import Iconify from '../../../../../components/iconify';

// ----------------------------------------------------------------------
const StyledIcon = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

ProfileCard.propTypes = {
    nacimiento: PropTypes.string,
    area: PropTypes.string,
    ingreso: PropTypes.string,
    antiguedad: PropTypes.string,
    colaborador: PropTypes.string,
    modalidad: PropTypes.string,

};

export default function ProfileCard({ nacimiento, area, ingreso, antiguedad, colaborador, modalidad}) {

  return (
    <Card>
      {/* <CardHeader title="Social" /> */}

      <Stack spacing={2} sx={{ p: 3 }}>
          <Stack direction="row" sx={{ wordBreak: 'break-all' }}>
          <Typography variant="subtitle2">Cumpleaños: &nbsp;</Typography>
          <Typography variant="body2">{nacimiento}</Typography>     
          </Stack>

          <Stack direction="row" sx={{ wordBreak: 'break-all' }}>
          <Typography variant="subtitle2">Área: &nbsp;</Typography>
          <Typography variant="body2">{area}</Typography>     
          </Stack>

          <Stack direction="row" sx={{ wordBreak: 'break-all' }}>
          <Typography variant="subtitle2">Fecha de Ingreso: &nbsp;</Typography>
          <Typography variant="body2">{ingreso}</Typography>     
          </Stack>

          <Stack direction="row" sx={{ wordBreak: 'break-all' }}>
          <Typography variant="subtitle2">Antigüedad: &nbsp;</Typography>
          <Typography variant="body2">{antiguedad}</Typography>     
          </Stack>

          <Stack direction="row" sx={{ wordBreak: 'break-all' }}>
          <Typography variant="subtitle2">No. Colaborador: &nbsp;</Typography>
          <Typography variant="body2">{colaborador}</Typography>     
          </Stack>

          <Stack direction="row" sx={{ wordBreak: 'break-all' }}>
          <Typography variant="subtitle2">Modalidad: &nbsp;</Typography>
          <Typography variant="body2">{modalidad}</Typography>     
          </Stack>
      </Stack>
    </Card>
  );
}
