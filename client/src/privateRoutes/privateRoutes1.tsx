import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { PrivateRoutesProps, Store } from '../types/interface';

const PrivateRoutes1: React.FC<PrivateRoutesProps> = (props): JSX.Element => {
    const { children } = props;
    const { token } = useSelector( (store: Store) => store.auth );

    if (token)
    {
        return <Navigate to='/home' replace={true}/>;
    }

    return children;
};

export default PrivateRoutes1;