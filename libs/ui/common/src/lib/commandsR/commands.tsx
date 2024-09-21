import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import NavBar from '../utils/navbar';
import Orders from '../orders/orders';
import BackButton from '../utils/backButton';

const tables = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
];

export function Commands() {
    return (
        <div>
            <NavBar tables={tables} />
            <BackButton color={'black'} top={20} left={150}></BackButton>
            <Orders></Orders>
        </div>
    );
}
export default Commands;
