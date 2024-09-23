import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import './orderingChoices.css';
import { useCurrentSelectedOrder } from './stores/currentSelectedOrder';
import { useTableSummary } from './stores/tableSummary';
import { classicMenu } from '../utils/tableUtils';
import { CatalogState } from '../offers/stores/catalog';
import { useCatalogByOffers } from '../offers/stores/useCatalogByOffers';
import { useOffersByGroupId } from '../tables/stores/useOffersByGroupId';
import { Item } from '../tableBillingPage/tableBilling';

interface OrderingChoicesProps {
  selectedTable: Table,
  groupId: string
}

export interface Table {
  id : number,
  orders: any
}

export const OrderingChoices = (props: OrderingChoicesProps) => {
    const { orders, id: tableId } = props.selectedTable;
    const { setOrder } = useCurrentSelectedOrder();

    const offerLabel : string = useOffersByGroupId(props.groupId)?.name ?? '';
    const catalogAvailable : CatalogState = useCatalogByOffers(offerLabel);

    const [selectedOrders, setSelectedOrders] = useState({});
    const addOrUpdateOrder = useTableSummary(state=>state.addOrUpdateOrder);
    const decreaseOrderQuantity = useTableSummary(state=>state.decreaseOrderQuantity);
    const tables = useTableSummary(state=>state.tables);
    console.log(tables);

    const handleSelectOrder = (category: string, index: number) => {

        setSelectedOrders(prev => {
            const isSelected = prev[tableId]?.[category]?.[index];

            if (isSelected) {
                const { [index]: removed, ...rest } = prev[tableId][category];
                return {
                    ...prev,
                    [tableId]: {
                        ...prev[tableId],
                        [category]: rest,
                    },
                };
            } else {
                return {
                    ...prev,
                    [tableId]: {
                        ...prev[tableId],
                        [category]: {
                            ...prev[tableId]?.[category],
                            [index]: { count: 0 }
                        }
                    }
                };
            }
        });
    };

    const handleIncrease = (category: string, index: number) => {
        setSelectedOrders(prev => {
            const currentCount = prev[tableId]?.[category]?.[index]?.count || 0;
            const newCount = currentCount + 1;

            let menu : Item[] = [];
            switch (category) {
              case 'drinks':
                menu = catalogAvailable.catalogs.drinks;
                break;
              case 'starters':
                menu = catalogAvailable.catalogs.starters;
                break;
              case 'mainCourses':
                menu = catalogAvailable.catalogs.mainCourses;
                break;
              case 'desserts':
                menu = catalogAvailable.catalogs.desserts;
                break;

              default:
                break;
            }

            setOrder(category, index, newCount);
            const order = {
                category: category,
                name: menu.find(element => element.id === index)?.name ?? 'not found element',
                quantity: 1,
                price: menu.find(element => element.id === index)?.price ?? 0
            }
            addOrUpdateOrder(tableId, order);

            //const [tableSummaryContent, arrayId] = getTableIfExist(summaryContent);
            //Add to orders

            //summaryContent[arrayId] = tableSummaryContent;
            //setSummaryContent(summaryContent);



            return {
                ...prev,
                [tableId]: {
                    ...prev[tableId],
                    [category]: {
                        ...prev[tableId]?.[category],
                        [index]: { count: newCount }
                    }
                }
            };
        });
    };

    const handleDecrease = (category: string, index: number) => {
        setSelectedOrders(prev => {
            const currentCount = prev[tableId]?.[category]?.[index]?.count || 0;
            const newCount = Math.max(0, currentCount - 1);

            let menu : Item[] = [];
            switch (category) {
              case 'drinks':
                menu = catalogAvailable.catalogs.drinks;
                break;
              case 'starters':
                menu = catalogAvailable.catalogs.starters;
                break;
              case 'mainCourses':
                menu = catalogAvailable.catalogs.mainCourses;
                break;
              case 'desserts':
                menu = catalogAvailable.catalogs.desserts;
                break;

              default:
                break;
            }

            setOrder(category, index, newCount);
            const order = {
                category: category,
                name: menu.find(element => element.id === index)?.name ?? 'not found element',
                quantity: 1,
                price: menu.find(element => element.id === index)?.price ?? 0
            }
            decreaseOrderQuantity(tableId, order)


            return {
                ...prev,
                [tableId]: {
                    ...prev[tableId],
                    [category]: {
                        ...prev[tableId]?.[category],
                        [index]: { count: newCount }
                    }
                }
            };
        });
        console.table(selectedOrders);
    };

    return (
        <Box
            className="custom-scrollbar"
            sx={{
                padding: '16px',
                marginTop: '110px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                height: '80vh',
                overflowY: 'auto',
                border: '1px solid #ccc',
                width: 'calc(100% - 32px)',
                position: 'relative',
                left: '0',
            }}
        >
            {/*TODO: Replace by a component, fixing shit is taking too much time for me to do that now */}
            <Box key="drinks" sx={{ marginBottom: '24px' }}>
              <Typography variant="h6">Drinks</Typography>
              <Box sx={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {catalogAvailable.catalogs.drinks.length > 0 ?
                  (
                    catalogAvailable.catalogs.drinks.map((order, index) => {
                      const count = selectedOrders[tableId]?.["drinks"]?.[order.id]?.count || 0;
                      const isSelected = Boolean(selectedOrders[tableId]?.["drinks"]?.[order.id]);

                      return (
                        <Box key={index} sx={{ display: 'inline', flexDirection: 'column', alignItems: 'center' }}>
                            <Button
                                variant="contained"
                                onClick={() => handleSelectOrder("drinks", order.id)}
                                sx={{
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: '0px',
                                    backgroundColor: isSelected ? 'green' : '#ff6f61',
                                    color: 'white',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    fontSize: '1.2rem',
                                    '&:hover': {
                                        backgroundColor: isSelected ? 'darkgreen' : '#ff4d94',
                                    },
                                }}
                            >
                                {order.name}
                            </Button>
                            {isSelected && (
                                <Box sx={{ display: 'inline-flex', justifyContent: 'center', marginTop: '8px' }}>
                                    <Button sx={{ minWidth: '4vh' }} onClick={() => handleDecrease("drinks", order.id)}>-</Button>
                                    <Typography>{count}</Typography>
                                    <Button sx={{ minWidth: '4vh'}} onClick={() => handleIncrease("drinks", order.id)}>+</Button>
                                </Box>
                            )}
                        </Box>
                      )
                    })
                  )
                  : (<Typography>No Choices</Typography>)
                }
              </Box>
            </Box>
            {/*TODO: Replace by a component, fixing shit is taking too much time for me to do that now */}
            <Box key="starters" sx={{ marginBottom: '24px' }}>
              <Typography variant="h6">Starters</Typography>
              <Box sx={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {catalogAvailable.catalogs.starters.length > 0 ?
                  (
                    catalogAvailable.catalogs.starters.map((order, index) => {
                      const count = selectedOrders[tableId]?.["starters"]?.[order.id]?.count || 0;
                      const isSelected = Boolean(selectedOrders[tableId]?.["starters"]?.[order.id]);

                      return (
                        <Box key={index} sx={{ display: 'inline', flexDirection: 'column', alignItems: 'center' }}>
                            <Button
                                variant="contained"
                                onClick={() => handleSelectOrder("starters", order.id)}
                                sx={{
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: '0px',
                                    backgroundColor: isSelected ? 'green' : '#ff6f61',
                                    color: 'white',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    fontSize: '1.2rem',
                                    '&:hover': {
                                        backgroundColor: isSelected ? 'darkgreen' : '#ff4d94',
                                    },
                                }}
                            >
                                {order.name}
                            </Button>
                            {isSelected && (
                                <Box sx={{ display: 'inline-flex', justifyContent: 'center', marginTop: '8px' }}>
                                    <Button sx={{ minWidth: '4vh' }} onClick={() => handleDecrease("starters", order.id)}>-</Button>
                                    <Typography>{count}</Typography>
                                    <Button sx={{ minWidth: '4vh'}} onClick={() => handleIncrease("starters", order.id)}>+</Button>
                                </Box>
                            )}
                        </Box>
                      )
                    })
                  )
                  : (<Typography>No Choices</Typography>)
                }
              </Box>
            </Box>
            {/*TODO: Replace by a component, fixing shit is taking too much time for me to do that now */}
            <Box key="mainCourses" sx={{ marginBottom: '24px' }}>
              <Typography variant="h6">Main Courses</Typography>
              <Box sx={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {catalogAvailable.catalogs.mainCourses.length > 0 ?
                  (
                    catalogAvailable.catalogs.mainCourses.map((order, index) => {
                      const count = selectedOrders[tableId]?.["mainCourses"]?.[order.id]?.count || 0;
                      const isSelected = Boolean(selectedOrders[tableId]?.["mainCourses"]?.[order.id]);

                      return (
                        <Box key={index} sx={{ display: 'inline', flexDirection: 'column', alignItems: 'center' }}>
                            <Button
                                variant="contained"
                                onClick={() => handleSelectOrder("mainCourses", order.id)}
                                sx={{
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: '0px',
                                    backgroundColor: isSelected ? 'green' : '#ff6f61',
                                    color: 'white',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    fontSize: '1.2rem',
                                    '&:hover': {
                                        backgroundColor: isSelected ? 'darkgreen' : '#ff4d94',
                                    },
                                }}
                            >
                                {order.name}
                            </Button>
                            {isSelected && (
                                <Box sx={{ display: 'inline-flex', justifyContent: 'center', marginTop: '8px' }}>
                                    <Button sx={{ minWidth: '4vh' }} onClick={() => handleDecrease("mainCourses", order.id)}>-</Button>
                                    <Typography>{count}</Typography>
                                    <Button sx={{ minWidth: '4vh'}} onClick={() => handleIncrease("mainCourses", order.id)}>+</Button>
                                </Box>
                            )}
                        </Box>
                      )
                    })
                  )
                  : (<Typography>No Choices</Typography>)
                }
              </Box>
            </Box>
            {/*TODO: Replace by a component, fixing shit is taking too much time for me to do that now */}
            <Box key="desserts" sx={{ marginBottom: '24px' }}>
              <Typography variant="h6">Desserts</Typography>
              <Box sx={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {catalogAvailable.catalogs.desserts.length > 0 ?
                  (
                    catalogAvailable.catalogs.desserts.map((order, index) => {
                      const count = selectedOrders[tableId]?.["desserts"]?.[order.id]?.count || 0;
                      const isSelected = Boolean(selectedOrders[tableId]?.["Drinks"]?.[order.id]);

                      return (
                        <Box key={index} sx={{ display: 'inline', flexDirection: 'column', alignItems: 'center' }}>
                            <Button
                                variant="contained"
                                onClick={() => handleSelectOrder("desserts", order.id)}
                                sx={{
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: '0px',
                                    backgroundColor: isSelected ? 'green' : '#ff6f61',
                                    color: 'white',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    fontSize: '1.2rem',
                                    '&:hover': {
                                        backgroundColor: isSelected ? 'darkgreen' : '#ff4d94',
                                    },
                                }}
                            >
                                {order.name}
                            </Button>
                            {isSelected && (
                                <Box sx={{ display: 'inline-flex', justifyContent: 'center', marginTop: '8px' }}>
                                    <Button sx={{ minWidth: '4vh' }} onClick={() => handleDecrease("desserts", order.id)}>-</Button>
                                    <Typography>{count}</Typography>
                                    <Button sx={{ minWidth: '4vh'}} onClick={() => handleIncrease("desserts", order.id)}>+</Button>
                                </Box>
                            )}
                        </Box>
                      )
                    })
                  )
                  : (<Typography>No Choices</Typography>)
                }
              </Box>
            </Box>
        </Box>
    );
};

export default OrderingChoices;
