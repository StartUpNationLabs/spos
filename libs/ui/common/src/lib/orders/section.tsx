import { Box, Typography } from "@mui/material";
import CommandNumber from "./commandNumber";
import { PreparationStatus } from "libs/services/common/src/lib/kitchen/kitchenServiceWorkflow";

type SectionProps = {
    title: string,
    orders: { [table: number]: PreparationStatus[] },
    selectedOrder: any,
    onSelectOrder: any
}

const Section = ({ title, orders, selectedOrder, onSelectOrder }: SectionProps) => (
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
                            isServed={false} //TODO: Need input from backend
                            isSelected={selectedOrder && selectedOrder.preparationId === order.preparationId}  // Comparer pour savoir si c'est sélectionné
                            onSelect={() => onSelectOrder(title.toLowerCase(), table, order.preparationId)}  // Passer la commande sélectionnée
                        />
                    ))}
                </Box>
            </Box>
        ))}
    </Box>
);

export default Section;
