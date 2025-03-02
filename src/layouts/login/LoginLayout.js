import PropTypes from 'prop-types';
// @mui
import { Typography, Stack } from '@mui/material';
// components
import Logo from '../../components/logo';
import Image from '../../components/image';
//
import { StyledRoot, StyledSectionBg, StyledSection, StyledContent, StyledVideo, StyledOverlay, StyledPortraitOverlay } from './styles';
import LogoHorizontal from '../../components/logo/LogoHorizontal';
import LogoBlanco from '../../components/logo/LogoBlanco';

// ----------------------------------------------------------------------

LoginLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  illustration: PropTypes.string,
};

export default function LoginLayout({ children, illustration, title }) {
  return (
    <StyledRoot>
      <LogoHorizontal
        sx={{
          zIndex: 9,
          position: 'absolute',
          mt: { xs: 1.5, md: 9 },
          ml: { xs: 3, md: 22 },
        }}
      />
          <br />
          <br />
          <br />
      <StyledContent>
        <Stack sx={{ width: 1 }}> {children} </Stack>
      </StyledContent>
      <StyledSection>

        {/* <Typography variant="h3" sx={{ mb: 2, maxWidth: 480, textAlign: 'center' }}>
          {title || 'Hi, Welcome back'}
        </Typography> */}

        {/* <Image
          disabledEffect
          visibleByDefault
          alt="auth"
          src={illustration || '/assets/illustrations/loginDashboard.png'}
          // sx={{ maxWidth: 720 }}
        /> */}

        <StyledSectionBg>
          <LogoBlanco
            sx={{
              position: 'absolute', bottom: 30,
              right: 30,
              zIndex: 4,
            }}
          />
          <StyledOverlay />
          <StyledVideo autoPlay loop muted preload='auto' >
            <source src="/assets/background/videoConecta.mp4" type="video/mp4" />
          </StyledVideo>
          <StyledPortraitOverlay/>
        </StyledSectionBg>
      </StyledSection>

    </StyledRoot>
  );
}
