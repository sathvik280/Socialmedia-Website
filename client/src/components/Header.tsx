import React from 'react';
import { useLocation } from 'react-router-dom';

import Header1 from './Header1';
import Header2 from './Header2';

const Header: React.FC = (): JSX.Element => {
    const { pathname }: { pathname: string } = useLocation();

    if (
        pathname === '/home' ||
        pathname === '/chat' ||
        pathname === '/search' ||
        pathname === '/user' ||
        pathname === '/profile'
    )
    {
        return <Header2 />;
    }

    return <Header1 />;
};

export default Header;