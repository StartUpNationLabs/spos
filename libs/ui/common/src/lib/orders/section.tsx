import { Box, Typography } from "@mui/material";
import CommandNumber from "./commandNumber";
import { PreparationStatus } from '@spos/services/common';

type SectionProps = {
    title: string,
    orders: { [table: number]: PreparationStatus[] },
    selectedOrders: string[],
    onSelectOrder: any
}

const Section = ({ title, orders, selectedOrders, onSelectOrder }: SectionProps) => (
    <Box sx={{ marginBottom: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ color: 'black', fontSize: 24 }}>
            {title}
        </Typography>
        {Object.entries(orders).map(([table, ordersList], idx) => (
            <Box key={idx} sx={{ marginBottom: 2 }}>
                <Typography variant="subtitle1" sx={{ color: 'black', fontSize: 20 }}>
                    {`Table ${table} :`}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    {ordersList.map((order, index) => (
                        <CommandNumber
                            key={index + 1}
                            number={index + 1} // TODO: Change By a unique number
                            status={order.status}
                            isSelected={selectedOrders && selectedOrders.findIndex(preparationId => preparationId === order.preparationId) !== -1}  // Comparer pour savoir si c'est sélectionné
                            onSelect={() => onSelectOrder(order.preparationId)}  // Passer la commande sélectionnée
                        />
                    ))}
                </Box>
            </Box>
        ))}
    </Box>
);

export default Section;
