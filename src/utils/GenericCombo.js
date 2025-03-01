import axios from 'axios';
import PropTypes from 'prop-types';
import { RHFSelect } from "../components/hook-form";
import { AxiosCombo } from '../_Axios/AxiosFomr';


const { useState, useEffect } = require("react");


 GenericCombo.propTypes = {
    endPointURL: PropTypes.string,
    nameAUX: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    valorFiltro: PropTypes.any,
    onChangeFunc: PropTypes.any,
    useChange: PropTypes.bool,
    disabled: PropTypes.bool,
     valorDefault: PropTypes.any,
     revisarValorFiltro: PropTypes.bool,
     error:PropTypes.bool,
 };

export default function GenericCombo({ endPointURL, nameAUX, label, placeholder, valorFiltro, useChange = false, onChangeFunc, disabled, error, valorDefault, revisarValorFiltro = false }) {

    const [primerRender, setPrimerRender] = useState(true);

    useEffect(() => {

         if (revisarValorFiltro) {
            if (primerRender) {
                if (valorFiltro > 0) {
                    AxiosCombo(endPointURL, valorFiltro, SetCombo)
                }
                setPrimerRender(false);
            } else {
                AxiosCombo(endPointURL, valorFiltro, SetCombo);
            }
         } else {
            AxiosCombo(endPointURL, valorFiltro, SetCombo);
         }
         setValor(valorDefault);

        const paraLetrero = `estoe s lo que trajeron ${endPointURL}||${valorFiltro}||${valorDefault}||${  revisarValorFiltro } `

        // console.log(paraLetrero)

    }, [endPointURL, valorFiltro, valorDefault, revisarValorFiltro, primerRender]);

    const handleChange = (event) => {
        onChangeFunc(event.target.value)
        setValor(event.target.value)
        
    }


    const [valor, setValor] = useState(valorDefault);
    const [combo, SetCombo] = useState([]);

    let result;

    if (useChange) {
        result =
            (<RHFSelect native
                name={nameAUX}
                disabled={disabled}
                label={label}
                value={valor }
                placeholder={placeholder}
                onChange={(e) => handleChange(e)}
                error={error}
            >
                <option value="" />
                {combo.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.nombre}
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
                error={error}
            >
            <option value={disabled} />
                {combo.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.nombre}
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

