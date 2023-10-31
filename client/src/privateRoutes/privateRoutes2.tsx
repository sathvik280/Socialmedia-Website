import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { PrivateRoutesProps, Store } from '../types/interface';

const PrivateRoutes2: React.FC<PrivateRoutesProps> = (props): JSX.Element => {
    const { children } = props;
    const { token } = useSelector( (store: Store) => store.auth );

    if (!token)
    {
        return <Navigate to='/' replace={true}/>;
    }

    return children;
};

export default PrivateRoutes2;