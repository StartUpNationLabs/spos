import { Box, Typography } from '@mui/material';
import { CategorizedCatalog } from '@spos/services/common';
import { Cart } from './orderingChoices';
import { Item } from './Item';
import React from 'react';

interface CatalogDisplayProps {
  catalog: CategorizedCatalog;
  currentTableCart: Cart;
  tableNumber: number;
  handleSelectItem : (string,string) => void;
}

export function CatalogDisplay(props: CatalogDisplayProps) {
  return (
    <Box
      className="custom-scrollbar"
      sx={{ overflowY: 'auto', height: '85dvh' }}
    >
      {Object.keys(props.catalog).map((category) => (
        <Box key={category} sx={{ marginBottom: '24px' }}>
          <Typography variant="h6">{category}</Typography>
          <Box sx={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {props.catalog[category].length > 0 ? (
              props.catalog[category].map((item) => {
                const isSelected = Boolean(
                  props.currentTableCart.find(
                    (element) => element.itemId === item._id
                  )
                );

                return (
                  <Box
                    key={item._id}
                    sx={{
                      display: 'inline',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Item
                      item={item}
                      tableNumber={props.tableNumber}
                      isSelected={isSelected}
                      handleSelectItem={props.handleSelectItem}
                    />
                  </Box>
                );
              })
            ) : (
              <Typography>No Choices</Typography>
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
