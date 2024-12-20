import { Box, Button, Checkbox } from '@mui/material';

type CommandNumberProps = {
  number: number;
  status: string;
  isServed: boolean;
  isSelected: boolean;
  onSelect: () => void;
};

const CommandNumber = ({
  number,
  status,
  isSelected,
  onSelect,
  onDetailsExpand,
}: CommandNumberProps) => {
  const isServed = status === 'preparationServed';
  const isReadyToBeServed = status === 'readyToBeServed';

  const backgroundColor = isSelected
    ? 'blue'
    : isReadyToBeServed
    ? 'green'
    : !isServed
    ? 'orange'
    : 'darkgrey';

  const onClick = isReadyToBeServed
    ? onSelect
    : () => console.log('Order not ready to be served yet.');
  //TODO : to replace once we can manually prepare an item
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Button
        sx={{
          width: 50,
          height: 50,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          backgroundColor,
          fontSize: 20,
          borderRadius: 2,
          margin: 1,
          boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
        }}
        onClick={onDetailsExpand}
      >
        {number}
      </Button>
      {!isServed && (
        <Checkbox
          disabled={!isReadyToBeServed}
          onChange={onClick}
          inputProps={{ 'aria-label': 'controlled' }}
          size="large"
        />
      )}
    </Box>
  );
};

export default CommandNumber;
