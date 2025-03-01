import PropTypes from 'prop-types';
import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { alpha } from '@mui/material/styles';
import { Box, Button, Dialog, DialogActions, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import Iconify from '../../iconify';
import { varFade } from '../../animate';
import FileThumbnail, { fileData } from '../../file-thumbnail';
import { fData } from '../../../utils/formatNumber';

MultiFilePreview.propTypes = {
  sx: PropTypes.object,
  files: PropTypes.array,
  onRemove: PropTypes.func,
  thumbnail: PropTypes.bool,
};

export default function MultiFilePreview({ thumbnail, files, onRemove, sx }) {
  const [openDoc, setOpenDoc] = useState(false); // Estado para controlar si el diálogo está abierto
  const [selectedFile, setSelectedFile] = useState(null); // Estado para almacenar el archivo seleccionado

  const handleOpenDocument = (file) => { // Función para abrir el diálogo de vista previa del documento
      setOpenDoc(true);
      setSelectedFile(file);

      // console.log('el file en el original', file)
      // console.log('el selected en el original', selectedFile)

  };

  const handleCloseDocument = () => { // Función para cerrar el diálogo de vista previa del documento
    setOpenDoc(false);
    setSelectedFile(null);
  };

  if (!files?.length) {
    return null; // Si no hay archivos, se retorna null y no se muestra nada
  }

  return (
    <>
      <AnimatePresence initial={false}>
        {files.map((file) => {
          //  console.log("esto es lo que se debe de cargar",files)
          const { key, name = '', size = 0 } = fileData(file);
          const isNotFormatFile = typeof file === 'string';

          if (thumbnail) {
            // Renderizar una vista en miniatura de los archivos
            return (
              <Stack
                key={key}
                component={m.div}
                {...varFade().inUp}
                alignItems="center"
                display="inline-flex"
                justifyContent="center"
                sx={{
                  m: 0.5,
                  width: 80,
                  height: 80,
                  borderRadius: 1.25,
                  overflow: 'hidden',
                  position: 'relative',
                  border: (theme) => `solid 1px ${theme.palette.divider}`,
                  ...sx,
                }}
              >
                <FileThumbnail
                  tooltip
                  imageView
                  file={file}
                  sx={{ position: 'absolute' }}
                  imgSx={{ position: 'absolute' }}
                />

                {onRemove && (
                  <IconButton
                    size="small"
                    onClick={() => onRemove(file)}
                    sx={{
                      top: 4,
                      right: 4,
                      p: '1px',
                      position: 'absolute',
                      color: (theme) => alpha(theme.palette.common.white, 0.72),
                      bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48),
                      '&:hover': {
                        bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
                      },
                    }}
                  >
                    <Iconify icon="eva:close-fill" width={16} />
                  </IconButton>
                )}
              </Stack>
            );
          }

          // Renderizar una lista de archivos
          return (
            <Stack
              key={key}
              component={m.div}
              {...varFade().inUp}
              spacing={2}
              direction="row"
              alignItems="center"
              sx={{
                my: 1,
                px: 1,
                py: 0.75,
                borderRadius: 0.75,
                border: (theme) => `solid 1px ${theme.palette.divider}`,
                ...sx,
              }}
            >
              <FileThumbnail file={file} />

              <Stack flexGrow={1} sx={{ minWidth: 0 }}>
                <Typography variant="subtitle2" noWrap>
                  {isNotFormatFile ? file : name}
                </Typography>

                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {isNotFormatFile ? '' : fData(size)}
                </Typography>
              </Stack>

              <Tooltip title="Ver">
                <IconButton onClick={() => handleOpenDocument(file)}>
                  <Iconify icon="eva:eye-fill" />
                </IconButton>
              </Tooltip>

              {onRemove && (
                <Tooltip title="Eliminar">
                  <IconButton edge="end" size="small" onClick={() => onRemove(file)}>
                    <Iconify icon="iconamoon:trash" />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
          );
        })}
      </AnimatePresence>

      <Dialog fullScreen open={openDoc}> {/* Diálogo de vista previa del documento */}
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <DialogActions
            sx={{
              zIndex: 9,
              padding: '12px !important',
              boxShadow: (theme) => theme.customShadows.z8,
            }}
          >
              <Typography variant="subtitle2" sx={{ textAlign: 'center', flexGrow: 1 }}>{selectedFile?.name}</Typography> {/* Agregar el nombre del archivo seleccionado */}

            <Tooltip title="Cerrar">
              <IconButton color="inherit" onClick={handleCloseDocument}>
                <Iconify icon="eva:close-fill" />
              </IconButton>
            </Tooltip>
          </DialogActions>

          <Box sx={{ flexGrow: 1 }}>
            {selectedFile && (
              <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {selectedFile.type === 'application/pdf' ? (
                  <embed src={URL.createObjectURL(selectedFile)} width="100%" height="100%" type="application/pdf" />
                ) : (
                  <img src={URL.createObjectURL(selectedFile)} alt="file-preview" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                )}
              </Box>
            )}
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
