import { Box, Typography } from "@mui/material";
import CommandNumber from "./commandNumber";

const Section = ({ title, orders, selectedOrder, onSelectOrder }) => (
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
                    {ordersList.map((order) => (
                        <CommandNumber 
                            key={order.orderId} 
                            number={order.order} 
                            status={order.status} 
                            isServed={order.isServed}
                            isSelected={selectedOrder && selectedOrder.orderId === order.orderId}  // Comparer pour savoir si c'est sélectionné
                            onClick={() => onSelectOrder(title.toLowerCase(), table, order.orderId)}  // Passer la commande sélectionnée
                        />
                    ))}
                </Box>
            </Box>
        ))}
    </Box>
);

export default Section;
