import PropTypes from 'prop-types';
import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { alpha } from '@mui/material/styles';
import { Box, Button, Dialog, DialogActions, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import axios from 'axios';
// import { varFade } from '../../animate';
// import FileThumbnail, { fileData } from '../../file-thumbnail';
// import { fData } from '../../../utils/formatNumber';
import Iconify from '../components/iconify';
import { varFade } from '../components/animate';
import FileThumbnail, { fileData } from '../components/file-thumbnail';
import { fData } from './formatNumber';
import { GuardarDocEnDom } from '../_Axios/AxiosFomr';



GenericMultiFilePreview.propTypes = {
    sx: PropTypes.object,
    files: PropTypes.array,
    onRemove: PropTypes.func,
    thumbnail: PropTypes.bool,
};

export default function GenericMultiFilePreview({ thumbnail, files, onRemove, sx }) {
    const [openDoc, setOpenDoc] = useState(false); // Estado para controlar si el di�logo est� abierto
    const [selectedFile, setSelectedFile] = useState(null); // Estado para almacenar el archivo seleccionado
    const [esPdf, setEsPdf] = useState(false);
    const handleOpenDocument = (file) => { // Funci�n para abrir el di�logo de vista previa del documento

        // console.log('porfa que tenga el Id', file)
        // setEsPdf(file.type === "application/pdf");
        // GuardarDocEnDom(file.id, setSelectedFile, setOpenDoc)
        GuardarDocEnDom(file.id, setSelectedFile, setOpenDoc, setEsPdf)
        // console.log('abriendo', file)
        // console.log('en URL', URL.createObjectURL(selectedFile))
        // setOpenDoc(true);
        // setSelectedFile(file);
        // console.log('es un pdf',esPdf)
    };

    const handleCloseDocument = () => { // Funci�n para cerrar el di�logo de vista previa del documento
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

            <Dialog fullScreen open={openDoc}> {/* Di�logo de vista previa del documento */}
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

                                { esPdf?
                                    <embed src={`data:application/pdf;base64,${selectedFile}`} width="100%" height="100%" type="application/pdf" />
                                    :
                                    <img src={`data:image/jpeg;base64,${selectedFile}`} alt="file-preview" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                                }
                                


                                { /* {esPdf ? (
                                    <embed src={selectedFile} width="100%" height="100%" type="application/pdf" />
                                ) : (
                                    <img src={`data:image/jpeg;base64,${selectedFile}`} alt="file-preview" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                                )} */ }
                            </Box>
                        )}
                    </Box>
                </Box>
            </Dialog>
        </>
    );
}
