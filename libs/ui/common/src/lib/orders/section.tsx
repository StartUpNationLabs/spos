
import { Button, Typography, Box } from "@mui/material";
import { useState } from 'react';
import CommandNumber from "./commandNumber";
import "./section.css";

const Section = ({ title, orders }) => (
    <Box sx={{ marginBottom: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ color: 'black', fontSize: 24 }}>
            {title}
        </Typography>
        {Object.entries(orders).map(([table, ordersList], idx) => (
            <Box key={idx} sx={{ marginBottom: 2 }}>
                <Typography variant="subtitle1" sx={{ color: 'black', fontSize: 20 }}>
                    {table}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    {ordersList.map((order, index) => (
                        <CommandNumber 
                            key={index} 
                            number={order.order} 
                            status={order.status} 
                        />
                    ))}
                </Box>
            </Box>
        ))}
    </Box>
);
export default Section;