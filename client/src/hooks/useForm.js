import { useState } from 'react';

export const useForm = (initialState = {}) => {
    const [values, setValues] = useState(initialState);

    const reset = () =>{
        setValues(initialState);
    }

    const handleInputChange = ({ target }) => {
        setValues({
            ...values,
            [target.name]: target.value
        })
    }

    const setManual = (field) =>{
        setValues({
            ...values,
            ...field
        })
    }

    return [values, handleInputChange, reset, setManual];
}