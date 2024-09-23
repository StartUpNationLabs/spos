import { Category, CenterFocusStrong } from '@mui/icons-material';
import './summary.css';
import { useNavigate } from "react-router-dom";
import { Button, Typography, ButtonGroup, Box, Card, CardContent } from "@mui/material";
import { red } from '@mui/material/colors';
import * as React from 'react';
import { useState } from 'react';
import { Router } from 'react-router-dom';
import NavBar from '../utils/navbar';
import { setSelectedTableById, tablesMenu } from '../utils/tableUtils';
import BackButton from '../utils/backButton';
import { useTableSummary, TableState } from '../commandsR/stores/tableSummary'

export function Summary() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const [selectedTable, setSelectedTable] = useState(tablesMenu[1]);
    const tablesSummary = useTableSummary(state=>state.tables);
    const summaryContent = summaryContentAdapt(tablesSummary);
    
    function togglePopup(): void {
        setOpen(true);
    }

    return (
        <Box margin={10}>
        <Box className="bottom-button">
            <Button
                    onClick={togglePopup}
                    variant="contained"
                    color="primary"
                    style={{
                        padding: '20px 50px', 
                        borderRadius: '50px',  
                        fontSize: '4vw', 
                        backgroundColor: '#003366'    
                    }}
                    >
                    Summary
            </Button>
        </Box>

        {open && ( 
            < Box className="popup-fullscreen">
                    <BackButton onClick={() => setOpen(false)} color={'white'} top={20} left={20}/> 
                    <Typography align='center'  
                                variant="h1" 
                                component="h2" 
                                fontSize="7.5vw" 
                                fontWeight="bold"
                                style={{ color: 'black' }}>
                        Summary
                    </Typography>

                    <Box width='90%' marginLeft='5%' marginTop="7%" bgcolor='#FFFFFF' height="62vh">
                        console.log(summaryContent)
                        console.log("------")
                        {Object.keys(summaryContent).map((category) => (
                            <Box>
                            <Typography fontSize="4.5vw" 
                                fontWeight="bold"
                                style={{ color: 'black' }}
                                variant='h3'>{category}</Typography>
                                {summaryContent[category].map((item, index) => (
                                    <Typography marginLeft={'30px'} style={{ color: 'black' }} fontSize="3vw">
                                        {item.name}: {item.quantity}
                                    </Typography>
                                ))}
                            </Box>
                        ))}
                        <Box width="90%" position='fixed' display='flex' justifyContent="right"   bottom="14vh" right="8vw">
                            <Typography variant="h4" component="h4" fontSize="4vw" fontWeight="bold">
                                Total : 15€
                            </Typography>
                        </Box>
                    </Box>




                    <Box className="bottom-button">
                        <Button
                        variant="contained"
                    
                        style={{
                            backgroundColor: '#003366',
                            padding: '20px 50px', 
                            borderRadius: '50px',  
                            fontSize: '4vw',     
                        }}
                        >Kitchen</Button>,
                    </Box>
                </Box>
         
        )}
        </Box>
    );
}

const summaryContentAdapt = (tablesSummary) => {
  const transformed = {};

  // Iterate through the orders
  tablesSummary.forEach(item => {
    item.orders.forEach(order => {
      const { category, name, quantity } = order;

      // Check if the category already exists in the transformed object
      if (!transformed[category]) {
        transformed[category] = [];
      }

      // Add the order details to the category array
      transformed[category].push({
        name,
        quantity: Number(quantity) // Convert Quantity to a number
      });
    });
  });
  console.log(transformed)
  return transformed;
}


export default Summary;