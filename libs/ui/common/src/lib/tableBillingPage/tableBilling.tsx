import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import NavBar from "../utils/navbar";

const theme = {
  hr: {
    border: 'none',
    borderTop: '1px solid rgba(0, 0, 0, 1)',
    margin: '20px 0'
  }
};

export function TableBilling() {
  const navigate = useNavigate();

  const tableNumber = 1;

  const data = [
    {remaining : 1, item: {id: 1, name: "Coca", price: 1.5}},
    {remaining : 2, item: {id: 2, name: "Fried chicken", price: 4.35}}
  ]

  const [quantities, setQuantities] = useState(data.map((item) => ({ quantity: 0, ...item })));
  const getTotalPrice = (): number => {
    return quantities.reduce((acc, { quantity, item }) => acc + (quantity * item.price), 0);
  };


  const handleIncrementDecrement = (index: number, delta: number) => {
    setQuantities((prevQuantities) => {
      const updatedQuantities = [...prevQuantities];
      let newQuantity = prevQuantities[index].quantity + delta;

      // Ensure the quantity is not less than 0
      if (newQuantity < 0) {
        newQuantity = 0;
      }

      else if (newQuantity > data[index].remaining) {
        newQuantity = data[index].remaining;
      }

      updatedQuantities[index].quantity = newQuantity;

      return updatedQuantities;
    });
  };

  const handleSelectAll = () => {
    setQuantities((prevQuantities) => prevQuantities.map((item, index) => ({ ...item, quantity: data[index].remaining })));
  };

  const handleUnselectAll = () => {
    setQuantities((prevQuantities) => prevQuantities.map((item, index) => ({ ...item, quantity: 0 })));
  };

  const validatePayment = () => {
    console.log(getTotalPrice())
    navigate("/")
  }

  return (
    <Box sx={{minHeight: '100dvh', display: 'flex', flexDirection: 'row'}}>
      <Box sx={{boxSizing: 'border-box', width: 'fit-content', borderRight: '2px solid #000'}}>
        <NavBar />
      </Box>
      <Box id="test" sx={{boxSizing: 'border-box', backgroundColor: '#d9d9d9', flexGrow: 1,
          paddingTop: '5dvh', paddingLeft: '5dvw', paddingRight: '5dvw'
        }}>
        <div id="billing-section" style={{minHeight: '75dvh'}}>
          <Typography variant="h2" component="h2" sx={{ fontSize: '8vw', fontWeight: 'bold', paddingLeft: '100px' }}>
            Billing
          </Typography>
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <Typography variant="h3" component="h3"
              sx={{ fontSize: '5vw', fontWeight: 'bold', textDecoration: 'underline',
              margin: '2vh 0' }}>
                {"Table " + tableNumber}
              </Typography>
            <div>
              <Button onClick={handleSelectAll} variant="contained" color="inherit"
                sx={{borderRadius: '50px', fontSize: '3vw' }}>
                Select All
              </Button>
              <Button onClick={handleUnselectAll} variant="contained" color="inherit"
                sx={{borderRadius: '50px', fontSize: '3vw' }}>
                Unselect All
              </Button>
            </div>
          </div>
          {data.map((element, index) => (
            <div key={index} style={{display: "flex", flexDirection: "row",
              justifyContent: "space-between", padding: '1vh 3vw', fontSize: '4vw',
              alignItems: "center"}}>
              <div>
                <Button sx={{fontSize: '4vw', color: '#000'}} onClick={() => handleIncrementDecrement(index, -1)}>-</Button>
                <span>{quantities[index].quantity}/{element.remaining}</span>
                <Button sx={{fontSize: '4vw', color: '#000'}} onClick={() => handleIncrementDecrement(index, 1)}>+</Button>
                <span> {element.item.name}</span>
              </div>
              <span>{element.item.price}$</span>
            </div>
          ))}
        </div>
        <Box sx={{ padding: '3vh 5vw', backgroundColor: '#d9d9d9' }}>
        <hr style={theme.hr} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body1" component="span" fontWeight={400} fontSize={'3vw'}>
            Total: ${getTotalPrice()}
          </Typography>
          <Button onClick={validatePayment} variant="contained" color="inherit"
            sx={{ padding: '20px 50px', borderRadius: '50px', fontSize: '4vw' }}>
            Paid
          </Button>
        </Box>
      </Box>
      </Box>
    </Box>
  )
}

export default TableBilling;
