import { Button, Typography, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState } from 'react';
import NavBar from "../utils/navbar";
import { setSelectedTableById, tablesMenu } from '../utils/tableUtils';
import BackButton from "../utils/backButton";


const theme = {
  hr: {
    border: 'none',
    borderTop: '1px solid rgba(0, 0, 0, 1)',
    margin: '20px 0'
  }
};

export interface Item {
  id: number;
  name: string;
  price: number;
}

export interface TableItem {
  item: Item;
  remaining: number;
}

interface TableItemForBilling {
  item: Item;
  remaining: number;
  quantity: number;
}

export function TableBilling() {
  const navigate = useNavigate();
  const { groupId } = useParams();

  const tableNumber = 1;

  const getTotalPrice = (): number => {
    return data.reduce((acc, {quantity, item}) => acc + (quantity * item.price), 0);
  };

  const getTableItems = (): TableItem[]  => {
    return [
      {remaining : 1, item: {id: 1, name: "Coca", price: 1.5}},
      {remaining : 2, item: {id: 2, name: "Fried chicken", price: 4.35}}
    ];
  }


  const handleIncrementDecrement = (index: number, delta: number) => {
    setData((prevData: TableItemForBilling[]) => {
      const updatedData = [...prevData];
      let newQuantity = prevData[index].quantity + delta;

      // Ensure the quantity is not less than 0
      if (newQuantity < 0) {
        newQuantity = 0;
      }

      else if (newQuantity > data[index].remaining) {
        newQuantity = data[index].remaining;
      }

      updatedData[index].quantity = newQuantity;

      return updatedData;
    });
  };

  function mapTableItemForBilling(previousData: TableItemForBilling, remaining: number) : TableItemForBilling {
    return {quantity: remaining, item: previousData.item, remaining: previousData.remaining};
  }

  const handleSelectAll = () => {
    setData((prevData) => prevData.map(element => mapTableItemForBilling(element, element.remaining)));
  };

  const handleUnselectAll = () => {
    setData((prevData) => prevData.map(element => mapTableItemForBilling(element, 0)));
  };

  const validatePayment = () => {
    console.log(getTotalPrice())
    navigate("/")
  }
  const [selectedTable, setSelectedTable] = useState(tablesMenu[1]);

  function onClickBackButton() {
    console.log('clicked on back button... redirection to be implemented');
    navigate("/commands/"+groupId);
  }

  return (
    <Box sx={{minHeight: '100dvh', display: 'flex', flexDirection: 'row'}}>
      <Box sx={{boxSizing: 'border-box', width: 'fit-content', borderRight: '2px solid #000'}}>
        <NavBar
          tables={tablesMenu}
          setSelectedTable={(tableId) => setSelectedTableById(tablesMenu, tableId, setSelectedTable)
        }/>
      </Box>
      <Box id="test" sx={{boxSizing: 'border-box', backgroundColor: '#d9d9d9', flexGrow: 1,
          paddingTop: '5dvh', paddingLeft: '5dvw', paddingRight: '5dvw'
        }}>
        <div id="billing-section" style={{minHeight: '75dvh'}}>
          <BackButton onClick={onClickBackButton} color={'black'} top={20} left={150}></BackButton>
          <Typography variant="h2" component="h2" sx={{ fontSize: '8vw', fontWeight: 'bold', textAlign: 'center' }}>
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
          <Box sx={{overflow: 'auto', maxHeight: '60dvh'}}>
            {data.map((element, index) => (
              <div key={index} style={{display: "flex", flexDirection: "row",
                justifyContent: "space-between", padding: '0vh 3vw', fontSize: '4vw',
                alignItems: "center"}}>
                <div>
                  <Button sx={{fontSize: '4vw', color: '#000'}} onClick={() => handleIncrementDecrement(index, -1)}>-</Button>
                  <span>{data[index].quantity}/{element.remaining}</span>
                  <Button sx={{fontSize: '4vw', color: '#000'}} onClick={() => handleIncrementDecrement(index, 1)}>+</Button>
                  <span> {element.item.name}</span>
                </div>
                <span>{element.item.price}$</span>
              </div>
            ))}
          </Box>
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
