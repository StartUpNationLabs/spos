import { Category, CenterFocusStrong } from '@mui/icons-material';
import './summary.css';
import { useNavigate } from "react-router-dom";
import { Button, Typography, ButtonGroup, Box, Card, CardContent } from "@mui/material";
import { red } from '@mui/material/colors';
import * as React from 'react';
import { useState } from 'react';
import { Router } from 'react-router-dom';
import NavBar from '../utils/navbar';
import { setSelectedTableById, tablesData } from '../utils/tableUtils';
import BackButton from '../utils/backButton';

export function Summary() {
    const navigate = useNavigate();
    const [selectedTable, setSelectedTable] = useState(tablesData[1]);
    const summary_content =  [
        { title: 'Drinks', content: ['This is product 1']},
        { title: 'Starter', content: []},
        { title: 'Main course', content: ['This is product 3']},
        { title: 'Dessert', content: ['This is product 4']}
      ];
    
    function onClickBackButton() {
      console.log('clicked on back button... redirection to be implemented');
      navigate("/commands");
    }

    return (
        <Box sx={{ minHeight: '100dvh',
            display: 'flex',
            flexDirection: 'row',
            width: '100%' }}>
            <Box sx={{ boxSizing: 'border-box',
                        width: 'fit-content',
                        borderRight: '2px solid #000' }}>
                <NavBar
                    tables={tablesData}
                    setSelectedTable={(tableId: number) =>
                        setSelectedTableById(tablesData, tableId, setSelectedTable)
                    }
                />
            </Box>
                <Box height='95vh' width='100%' marginTop='5vh' sx={{
                    borderTopLeftRadius: '6vw',    // Border radius for the top-left corner
                    borderTopRightRadius: '6vw',
                    bgcolor: '#abcded',
                    flex: 1, 
                    display: 'flex', 
                    flexDirection: 'column'
                }}> 
                    <Box height="3vh"></Box>
                    <BackButton onClick={onClickBackButton} color={'black'} top={"8vh"} left={"170px"}></BackButton>
                    <Typography align='center'  variant="h1" component="h2" fontSize="7.5vw" fontWeight="bold">
                        Summary
                    </Typography>




                    <Box width='90%' marginLeft='5%' marginTop="7%" bgcolor='#FFFFFF' height="62vh">
                    {summary_content.map((category, index) => (
                            category.content.length > 0 && ( // Only render if content is not empty
                            <Card key={index} sx={{ minWidth: '100%', bgcolor: '#FFFFFF' }}>
                                <CardContent>
                                <Typography variant="h4" component="h4" fontSize="4vw" fontWeight="bold">
                                    {category.title}
                                </Typography>
                                {category.content && category.content.length > 0 && (
                                    category.content.map((item, itemIndex) => (
                                    <Typography key={itemIndex} variant="body2" fontSize="2.5vw" color="text.secondary">
                                        {item}
                                    </Typography>
                                    ))
                                )}
                                </CardContent>
                            </Card>
                            )
                        ))}


                        <Box width="90%" position='fixed' display='flex' justifyContent="right"   bottom="14vh" right="8vw">
                            <Typography variant="h4" component="h4" fontSize="4vw" fontWeight="bold">
                                Total : 15€
                            </Typography>
                        </Box>
                    </Box>




                    <Box width="100%" position='fixed' display='flex' justifyContent="center"  textAlign="center" bottom="2vh">
                        <Button className='offer-button' variant="contained" style={{
                                width: "50%",
                                padding: '10px 50px', // Plus grand bouton
                                fontSize: '5vw',      // Texte plus grand
                                borderRadius: "60px",
                                color: 'white',
                                background: '#100362'
                            }} key="two">Kitchen</Button>,
                    </Box>
                </Box>
        </Box>
    );
}
export default Summary;