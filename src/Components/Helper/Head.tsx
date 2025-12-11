import React from "react";

interface HeadProps {
    title: string;
    description?: string;
}

const Head: React.FC<HeadProps> = (props, description) => {

    React.useEffect (() => {
        document.title = props.title + ' | Dogs'

        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', description || '');
        } else {
            const meta = document.createElement('meta');
            meta.name = 'description';
            meta.content = description || '';
            document.head.appendChild(meta);
        }
            
    }, [props, description]);

    return (
        <div>

        </div>
    )
}

export default Head