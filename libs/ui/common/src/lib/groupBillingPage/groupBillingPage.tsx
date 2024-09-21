import './groupBillingPage.css';
import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function GroupBilling() {
  const navigate = useNavigate();
  const billingData = [
    {
      number : 1,
      elements : [
        {quantity : 1, item: {id: 1, name: "Coca", price: 1.5}},
        {quantity : 2, item: {id: 2, name: "Fried chicken", price: 4.35}}
      ]
    },
    {
      number : 2,
      elements : [
        {quantity : 1, item: {id: 3, name: "Orangina", price: 1.5}},
        {quantity : 6, item: {id: 4, name: "Mozzarella stick", price: 1}}
      ]
    }
  ];

  const totalPrice = billingData.reduce((total, { elements }) => {
    return total + elements.reduce((sum, { quantity, item }) => {
      return sum + quantity * item.price;
    }, 0);
  }, 0);

  const validatePayment = () => {
    console.log({totalPrice})
    navigate("/")
}

  return (
    <div id='billing-container' className='container'>
      <Box className="group-billing">
        <Typography align='left'  variant="h1" component="h2" fontSize="8vw" fontWeight="bold">
          Billing
        </Typography>
        <div id="billing-section">
          {billingData.map(table => (
            <div key={table.number}>
              <Typography id='table-title' align='left'  variant="h3" component="h3" fontSize="5vw" fontWeight="bold" >
                {"Table " + table.number}
              </Typography>
              <table>
                {table.elements.map(element => (
                  <tbody key={element.item.id}>
                    <tr>
                      <td>{element.quantity} x {element.item.name}</td>
                      <td>{element.quantity * element.item.price}$</td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          ))}
        </div>
      </Box>
      <Box id="summary-section">
        <hr />
        <div>
          <p>Total : {totalPrice}$</p>
          <Button onClick={validatePayment} variant="contained" color="inherit"
            style={{padding: '20px 50px', borderRadius: '50px', fontSize: '4vw'}}>
            Paid
          </Button>
        </div>
      </Box>
    </div>
  );
}

export default GroupBilling;
