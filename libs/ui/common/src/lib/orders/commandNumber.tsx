import { Button } from "@mui/material";

type CommandNumberProps = {
    number: number,
    status: string,
    isServed: boolean,
    isSelected: boolean,
    onSelect: () => void;
}

const CommandNumber = ({ number, status, isServed, isSelected, onSelect }: CommandNumberProps) => {
    const backgroundColor = isSelected ? 'blue' : (status === 'completed' ? 'green' : 'orange'); // Mettre en surbrillance si sélectionné

    const onClick = (status !== "preparationStarted" && !isServed || true) ? onSelect : () => console.log("Order not ready to be served yet.");
    //TODO : to replace once we can manually prepare an item
    return (
        <Button
            sx={{
                width: 50,
                height: 50,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor,
                color: 'white',
                fontSize: 20,
                borderRadius: 2,
                margin: 1,
                boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
            }}
            onClick={onClick}
        >
            {number}
        </Button>
    );
};

export default CommandNumber;
