import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function GroupBilling() {
  const navigate = useNavigate();
  const billingData = [
    {
      number: 1,
      elements: [
        { quantity: 1, item: { id: 1, name: "Coca", price: 1.5 } },
        { quantity: 2, item: { id: 2, name: "Fried chicken", price: 4.35 } }
      ]
    },
    {
      number: 2,
      elements: [
        { quantity: 1, item: { id: 3, name: "Orangina", price: 1.5 } },
        { quantity: 6, item: { id: 4, name: "Mozzarella stick", price: 1 } }
      ]
    }
  ];

  const totalPrice = billingData.reduce((total, { elements }) => {
    return total + elements.reduce((sum, { quantity, item }) => {
      return sum + quantity * item.price;
    }, 0);
  }, 0);

  const validatePayment = () => {
    console.log({ totalPrice });
    navigate("/");
  }

  return (
    <Box sx={{ backgroundColor: '#d9d9d9', minHeight: '100dvh', paddingTop: '5dvh', paddingLeft: '5dvw', paddingRight: '5dvw',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
      <Box sx={{ minHeight: '75dvh'}}>
        <Typography variant="h2" component="h2" sx={{ fontSize: '8vw', fontWeight: 'bold', paddingLeft: '100px' }}>
          Billing
        </Typography>
        {billingData.map((table, index) => (
          <Box key={index} sx={{ margin: '2vh 0', backgroundColor: '#d9d9d9' }}>
            <Typography variant="h3" component="h3" sx={{ fontSize: '5vw', fontWeight: 'bold', textDecoration: 'underline' }}>
              {"Table " + table.number}
            </Typography>
            <Box sx={{ padding: '2vh 0' }}>
              {table.elements.map((element, index) => (
                <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', padding: '1vh 3vw' }}>
                  <Typography variant="body1" component="span" fontWeight={400} fontSize={'3vw'}>
                    {element.quantity} x {element.item.name}
                  </Typography>
                  <Typography variant="body1" component="span" fontWeight={400} fontSize={'3vw'}>
                    ${element.quantity * element.item.price}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
      <Box sx={{ padding: '3vh 5vw', backgroundColor: '#d9d9d9' }}>
        <hr style={{border: 'none', borderTop:'1px solid rgba(0, 0, 0, 1)', margin: '20px 0'}} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body1" component="span" fontWeight={400} fontSize={'3vw'}>
            Total: ${totalPrice}
          </Typography>
          <Button onClick={validatePayment} variant="contained" color="inherit"
            sx={{ padding: '20px 50px', borderRadius: '50px', fontSize: '4vw' }}>
            Paid
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default GroupBilling;
