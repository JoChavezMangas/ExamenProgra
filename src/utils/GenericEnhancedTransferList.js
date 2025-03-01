import { useState, useEffect } from 'react';
// @mui
import {
    Card,
    List,
    Grid,
    Button,
    Divider,
    Checkbox,
    CardHeader,
    ListItemText,
    ListItemIcon,
    ListItemButton,
    Typography,
    Box,
} from '@mui/material';
import PropTypes from 'prop-types';
import Iconify from '../components/iconify';

// components
// import Iconify from '../../../../components/iconify';

// ----------------------------------------------------------------------

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
    return [...a, ...not(b, a)];
}

function hasValue() {

}

GenericEnhancedTransferList.prototype = {
    valoresEspeciales: PropTypes.array,
    funcionEspecial: PropTypes.func,
    left: PropTypes.array,
    setLeft: PropTypes.any,
    right: PropTypes.array,
    setRight: PropTypes.func,
};


export default function GenericEnhancedTransferList({ right, setRight, left, setLeft, valoresEspeciales, funcionEspecial }) {

    const [checked, setChecked] = useState([]);

    const leftChecked = intersection(checked, left);

    const rightChecked = intersection(checked, right);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);

        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);

    };

    const numberOfChecked = (items) => intersection(checked, items).length;

    const handleToggleAll = (items) => () => {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items));
        } else {
            setChecked(union(checked, items));
        }
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
        // console.log('derecha', right.concat(leftChecked));
        // console.log('izquierda', left);

        const valorEspecial = (right.concat(leftChecked)).filter(value => valoresEspeciales.map(obj => obj.id).includes(value.id));

        // valorEspecial.forEach((element) => { funcionEspecial(element.id); console.log('en el forEach', element) })
        funcionEspecial(valorEspecial)
        // console.log('logintud', valorEspecial)
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
        const valorEspecial = (not(right, rightChecked)).filter(value => valoresEspeciales.map(obj => obj.id).includes(value.id));
        funcionEspecial(valorEspecial)
    };

    const customList = (title, items) => (
        <>
            <CardHeader
                // este es el título
                title={
                    <Typography variant='subtitle' color="success">{title}</Typography>
                }
                // este es el número de elementos seleccionados
                subheader={`${numberOfChecked(items)}/${items.length} seleccionados`}
                sx={{ pl: -20, ml: -2, }}
            />

            {/* // este es el checkbox para seleccionar toda la lista */}
            <Box sx={{ p: 1, }}>
                Seleccionar todos
                <Checkbox
                    onClick={handleToggleAll(items)}
                    checked={numberOfChecked(items) === items.length && items.length !== 0}
                    indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
                    disabled={items.length === 0}
                    inputProps={{ 'aria-label': 'todos fueron seleccionados' }}
                />
            </Box>
            <Divider />

            <List
                dense
                component="div"
                role="list"
                sx={{
                    height: 210,
                    overflow: 'auto',
                }}
            >
                {items.map((value) => {

                    const labelId = `transfer-list-all-item-${value}-label`;
                    return (
                        <ListItemButton key={value.id} role="listitem" onClick={handleToggle(value)}>
                            <ListItemIcon>
                                <Checkbox
                                    disableRipple
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${value.nombre}`} />
                        </ListItemButton>
                    );
                }
                )
                }
            </List>
        </>
    );

    return (
        <>
            <Grid
                container
                spacing={1}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                >  

                <Grid item sx={{ border: 1, borderRadius: 2, marginTop:1 }}>{customList('Selecciona los Sistemas', left)}</Grid>

                <Grid item md={2}>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                        sx={{ mt: 1, mb: 1 }}
                        fullWidth
                    >
                        <Iconify icon="eva:arrow-ios-forward-fill" />
                    </Button>
                    <Button
                        color="error"
                        variant="outlined"
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                        sx={{ mt: 1, mb: 1 }}
                        fullWidth
                    >
                        <Iconify icon="eva:arrow-ios-back-fill" />
                    </Button>
                </Grid>
                <Grid item sx={{ border: 1, borderRadius: 2, marginTop:1 }} color='secondary'>{customList('Sistemas Asignados', right)}</Grid>
            </Grid>
        </>
    );
}
