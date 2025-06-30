import React from "react";

interface ErrorProps {
    error?: { message: string };
}

const Errorp: React.FC<ErrorProps> = ({ error }) => {
    if(!error) return null;
    return (
        <div>
            <p style={{ color: 'red', margin: '1rem 0' }}>{error.message}</p>
        </div>
    );
}

export { Errorp };
