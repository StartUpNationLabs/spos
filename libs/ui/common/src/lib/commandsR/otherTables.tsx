import React from 'react';
import { Grid, Box, Typography, Divider } from '@mui/material';
import { Item } from './Item';

interface OtherTableProps {
  table: {
    number: number;
    elements: {
      item: { id: string; name: string; price: number };
      remaining: number;
    }[];
  };
  catalog: any[];
  handleSelectItem: (itemId: string, shortName: string) => void;
}

const OtherTable: React.FC<OtherTableProps> = ({ table, catalog, handleSelectItem }) => {
  return (
    <>
      <Typography variant="h3" sx={{ color: 'green', mb: 2, textAlign: 'center' }}>
        Table Nb {table.number}
      </Typography>
      <Box
        sx={{
          backgroundColor: 'rgba(76, 175, 80, 0.1)', 
          borderRadius: 2,
          p: 3,
          boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
          mb: 3,
        }}
      >
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          {table.elements.map((element, index) => {
            const catalogItem = catalog?.find((item) => item._id === element.item.id);
            console.log(catalog)
            console.log(catalogItem);
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                {catalogItem && (
                  <Item
                    item={{
                      _id: element.item.id,
                      fullName: element.item.name,
                      shortName: element.item.name,
                      category: catalogItem?.category || 'default',
                      image: catalogItem?.image || '',
                      price: element.item.price,
                    }}
                    tableNumber={table.number}
                    remaining={element.remaining}
                    isSelected={false}
                    handleSelectItem={() => handleSelectItem(element.item.id, element.item.name)}
                  />
                )}
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};

export default OtherTable;
