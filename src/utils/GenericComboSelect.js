import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, ClickAwayListener, Grid, StepLabel, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField'; // Import TextField from MUI
import Chip from '@mui/material/Chip';
import { AxiosComboSistemas } from '../_Axios/AxiosFomr';
import Iconify from '../components/iconify/Iconify';


GenericComboSelect.propTypes = {
  endPointURL: PropTypes.string,
  nameAUX: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  valorFiltro: PropTypes.any,
  useChange: PropTypes.bool,
  disabled: PropTypes.bool,
  valorDefault: PropTypes.array,
    actualizarArray: PropTypes.any,
    errorColor: PropTypes.bool,
};

function GenericComboSelect({
  endPointURL,
  nameAUX,
  label,
  placeholder,
  valorFiltro,
  useChange = false,
  disabled,
  valorDefault,
    actualizarArray,
    errorColor=false
}) {
  const theme = useTheme();
  const [comboSistemas, setComboSistemas] = useState([]);
  const [selectCheckbox, setselectCheckbox] = useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    AxiosComboSistemas(endPointURL, "", setComboSistemas);
  }, [endPointURL]);

  useEffect(() => {
    setselectCheckbox(valorDefault);
  }, [valorDefault]);

  useEffect(() => {
    setSelectedOptions(
      comboSistemas.filter((item) => selectCheckbox.includes(item.id))
    );
  }, [comboSistemas, selectCheckbox]);

  const handleChangeAcordeon = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleDelete = (chipToDelete) => {
    if (selectCheckbox.includes(chipToDelete)) {
      setselectCheckbox((prevSelected) =>
        prevSelected.filter((id) => id !== chipToDelete)
      );
      actualizarArray((prevSelected) =>
        prevSelected.filter((id) => id !== chipToDelete)
      );
    }
    };

    const color = errorColor ? { border: '0.8px solid rgba(	246, 47, 74, 1)', padding: '3px' } : { border: '0.8px solid rgba(145, 158, 171, 0.5)', padding: '3px' };


  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <ClickAwayListener onClickAway={() => setExpanded(false)}>
          <Accordion expanded={expanded === 'panel1'}
            onChange={handleChangeAcordeon('panel1')}
                      sx={color}
                      // sx={{ border: '0.8px solid rgba(	145, 158, 171, 0.5)', padding: '3px' }}
                      // sx={{ border: '0.8px solid  rgba(	246, 47, 74, 1)', padding: '3px' }}
                      
                  >
                      
            <AccordionSummary
              expandIcon={<Iconify icon="iconamoon:arrow-down-2" />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              sx={{
                color: expanded === 'panel1' ? '#000' : '#919EAB'
              }}
            >
              <Grid container>
                <Grid item md={12}>
                                  <Typography>{label}:&nbsp;</Typography>

                </Grid>
                <Grid item md={12}>
                  {selectedOptions.map((option) => (
                    <Chip
                      key={option.id}
                      label={option.name}
                      color='primary'
                      size="small"
                      onDelete={() => handleDelete(option.id)}
                    />
                  ))}
                </Grid>
              </Grid>
            </AccordionSummary>

            <AccordionDetails sx={{ fontSize: '12px', maxHeight: '180px', overflowY: 'scroll' }}>
              {comboSistemas.map((item) => (
                <Grid item key={item.id}>
                  <Checkbox
                    checked={selectCheckbox.includes(item.id)}
                    onChange={(event) => {
                      const isChecked = event.target.checked;
                      setselectCheckbox((prevSelected) =>
                        isChecked
                          ? [...prevSelected, item.id]
                          : prevSelected.filter((id) => id !== item.id)
                      );
                      actualizarArray((prevSelected) =>
                        isChecked
                          ? [...prevSelected, item.id]
                          : prevSelected.filter((id) => id !== item.id)
                      )
                      console.log("los id seleccionados", selectCheckbox)
                    }}
                  />
                  {item.name}
                </Grid>
              ))}
            </AccordionDetails>
          </Accordion>
        </ClickAwayListener>
      </Box>
    </div>
  );
}




export default GenericComboSelect;