import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = (): JSX.Element => {
    const { pathname }: { pathname: string } = useLocation();

    useEffect( () => {
        window.scrollTo( {top: 0} );
    }, [pathname]);

    return <div></div>;
};

export default ScrollToTop;