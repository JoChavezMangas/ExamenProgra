import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { FormHelperText, Typography } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { useDropzone } from 'react-dropzone';

// Import con ruta
import Iconify from '../components/iconify';
import { MultiFilePreview } from '../components/upload';



// --------------------------------------------------

GenericFileCard.propTypes = {
    name: PropTypes.string,
};

export function GenericFileCard({ name, ...other }) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <ZonaDropDocumento files={field.value} error={!!error} {...other} />
            )}
        />
    );
}



// Estilos de a drop Zone
const StyledDropZone = styled('div')(({ theme }) => ({
    width: 34,
    height: 64,
    fontSize: 24,
    display: 'flex',
    flexShrink: 0,
    cursor: 'pointer',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0.5em 0 0 0',
    color: theme.palette.text.disabled,
    borderRadius: theme.shape.borderRadius,
    border: `dashed 1px ${theme.palette.divider}`,
    backgroundColor: alpha(theme.palette.grey[500], 0.08),
    '&:hover': {
        opacity: 0.72,
    },
}));


ZonaDropDocumento.propTypes = {
    sx: PropTypes.object,
    error: PropTypes.bool,
    disabled: PropTypes.bool,
    placeholder: PropTypes.node,
    files: PropTypes.array,
    onRemove: PropTypes.func,
};

function ZonaDropDocumento({ placeholder, error, disabled, sx, files, onRemove, ...other }) {

    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
        disabled,
        ...other,
    });

    const isError = isDragReject || error;

    return (
        <>
        <StyledDropZone
            {...getRootProps()}
            sx={{
                ...(isDragActive && {
                    opacity: 0.72,
                }),
                ...(isError && {
                    color: 'error.main',
                    bgcolor: 'error.lighter',
                    borderColor: 'error.light',
                }),
                ...(disabled && {
                    opacity: 0.48,
                    pointerEvents: 'none',
                }),
                ...sx,
            }}
        >
            <input {...getInputProps()} />
            <Typography sx={{fontSize:'18px'}}>
                Documentos 
            </Typography>
            {placeholder || <Iconify icon="eva:cloud-upload-fill" width={30} />}
            </StyledDropZone>

            <MultiFilePreview files={files} onRemove={onRemove} />

        </>
    )

}





