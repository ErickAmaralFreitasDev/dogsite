import React from 'react'

const types = {
    email: {
        regex: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: 'Preencha um e-mail válido',
    },

    username: {
        regex: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 
        message: 'Usuário deve apresentar e-mail válido',
    }
}

type ValidationType = keyof typeof types;

const useForm = (type: ValidationType | false) => {
    const [value, setValue] = React.useState('');
    const [error, setError] = React.useState<string | null>(null);

    function validate(value: string): boolean {
        if (value.length === 0) {
            setError('Preencha um Valor.');
            return false;
        }

        if (type === false) {
            setError(null);
            return true;
        }

        if (types[type] && !types[type].regex.test(value)) {
            setError(types[type].message);
            return false;
        }

        setError(null);
        return true;
    }

    function onChange(event: React.ChangeEvent<HTMLInputElement>) {
        const newValue = event.target.value;
        setValue(newValue);
        if (error) validate(newValue);
    }

    return {
        value,
        setValue,
        onChange,
        error,
        validate: () => validate(value),
        onBlur: () => validate(value), 
    };
}

export default useForm
