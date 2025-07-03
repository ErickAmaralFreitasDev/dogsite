import React from "react";

const useMedia = (media: string) => {
    const [match, setMatches] = React.useState<boolean | null>(null);
    React.useEffect(() => {
        function changeMatch() {
            const { matches } = window.matchMedia(media);
            setMatches(matches);
        }
        window.addEventListener('resize', changeMatch);
        
        changeMatch();
        return () => {
            window.removeEventListener('resize', changeMatch);
        }
    }, [media])

    return match;
}

export default useMedia;