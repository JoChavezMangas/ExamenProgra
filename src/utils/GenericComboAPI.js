import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { RHFSelect } from "../components/hook-form";
import { AxiosCombo, AxiosComboSistemas } from '../_Axios/AxiosFomr';


// Parametros que va a recibir
GenericComboAPI.propTypes = {
    endPointURL: PropTypes.string,
    nameAUX: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    valorFiltro: PropTypes.any,
    onChangeFunc: PropTypes.func,
    useChange: PropTypes.bool,
    disabled: PropTypes.bool,
    valorDefault: PropTypes.any,
    error: PropTypes.bool,
};

export default function GenericComboAPI({ endPointURL, nameAUX, label, placeholder, valorFiltro, useChange = false, onChangeFunc, disabled, valorDefault, error }) {

    const [valor, setValor] = useState(valorDefault);
    const [comboSistemas, setComboSistemas] = useState([]);

    useEffect(() => {
        AxiosComboSistemas(endPointURL, valorFiltro, setComboSistemas)
        setValor(valorDefault)
    }, [endPointURL, valorFiltro, valorDefault]);

    const handleChange = (event) => {
        onChangeFunc(event.target.value)
        setValor(event.target.value)
    }

    const singleChange = (event) => {
        onChangeFunc(event.target.value)
        setValor(event.target.value)
    }


let result;
    if (useChange) {
        result =
            (<RHFSelect
                native
                name={nameAUX}
                disabled={disabled}
                label={label}
                value={valor}
                placeholder={placeholder}
                onChange={(e) => handleChange(e)}
                error={error}
            >
                {/* <option value={disabled} /> */}
                {comboSistemas.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>

                ))}
            </RHFSelect>)
    } else {
        result =
                (<RHFSelect
                native
                name={nameAUX}
                disabled={disabled}
                label={label}
                placeholder={placeholder}
                value={valor}
                onChange={singleChange}
                error={error}
                >
                    <option value={disabled} />
                    {comboSistemas.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name} 
                        </option>

                    ))}
                </RHFSelect>)
    }

    return (
        <>
            {result}
        </>
    )
}




