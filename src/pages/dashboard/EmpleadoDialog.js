import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import Iconify from '../../components/iconify/Iconify';
// import EmpleadoDialogForm from '../../sections/@dashboard/empleado/EmpleadoDialogForm';

export default function EmpleadoDialog() {
  const [open, setOpen] = React.useState(true);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Dialog
      fullScreen
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle 
        id="scroll-dialog-title" 
        display='flex'
        justifyContent='space-between'
        sx={{background:'#00AB55'}}
        color='white'
        >
        Subscribe
        <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
        >
            <Iconify icon="ic:round-close"/>
            </IconButton>
        </DialogTitle>
        <DialogContent dividers={scroll === 'paper'} sx={{paddingTop:'20px'}}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            { /* <EmpleadoDialogForm/> */ }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
           <Button variant='contained' onClick={handleClose}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
