import { Box, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../utils/backButton";
import { BillingService, ItemPaid, MonsieurAxelMenvoie2, TYPES } from "@spos/services/common";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CustomizedTableForGroupBilling from "./customizedTableForGroupBilling";
import { useContext } from "react";
import { ContainerContext } from "../containerHook/containerContext";

export function GroupBilling() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const container = useContext(ContainerContext);

  const mutation = useMutation({
    mutationFn: (payment: MonsieurAxelMenvoie2) => {
      console.log(payment);
      return container.get<BillingService>(TYPES.BillingService).partialPayment(payment);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['tables'],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ['groups'],
        exact: true,
      });
      navigate('/');
    },
    onError: (error) => {
      console.log(error);
    }
  });

  if (!groupId || groupId === "") {
    navigate("/");
  }

  const {
    data: billingSummary,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['billingSummary', groupId],
    queryFn: async () => {
      const BillingService: BillingService = container.get<BillingService>(TYPES.BillingService);
      return BillingService.getBillingSummary(groupId);
    },
    enabled: groupId !== undefined && groupId !== "",
    refetchOnWindowFocus: 'always',
  });

  if (isLoading) {
    return (
      <Typography variant="h6" component="h2" fontWeight="bold">
        Loading...
      </Typography>
    );
  }
  if (!billingSummary || isError) {
    console.error(error);
    return (
      <Typography variant="h6" component="h2" fontWeight="bold">
        Error
      </Typography>
    );
  }

  const totalPrice = billingSummary.reduce((total, { elements }) => {
    return total + elements.reduce((sum, { remaining, item }) => {
      return sum + remaining * item.price;
    }, 0);
  }, 0);

  const validatePayment = () => {
    console.log({ totalPrice });

    const elementToBePaid = {} as { [tableNumber: number]: ItemPaid[] };

    billingSummary.forEach(summary => {
      if (summary.elements.length > 0) {
        elementToBePaid[summary.number] = [];
        summary.elements.forEach(tableItem => {
          elementToBePaid[summary.number].push({
            itemId: tableItem.item.id,
            quantityPaid: tableItem.remaining
          });
        })
      }
    });

    mutation.mutate({
      groupId: groupId ?? '',
      elementToBePaid: elementToBePaid
    })
  }

  function onClickBackButton() {
    console.log('clicked on back button... redirection to be implemented');
    navigate("/commands/" + groupId);
  }

  console.table(billingSummary);

  return (
    <Box sx={{
      backgroundColor: '#d9d9d9', minHeight: '100dvh', paddingTop: '5dvh', paddingLeft: '5dvw', paddingRight: '5dvw',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-around'
    }}>
      <Box sx={{ minHeight: '75dvh' }}>
        <Typography variant="h2" component="h2" sx={{ fontSize: '8vw', fontWeight: 'bold', textAlign: 'center' }}>
          Billing
        </Typography>
        <Box sx={{ overflow: 'auto', maxHeight: '70dvh' }}>
          {billingSummary.map((table, index) => (
            <Box key={index} sx={{ margin: '2vh 0', backgroundColor: '#d9d9d9' }}>
              <BackButton onClick={onClickBackButton} color={'black'} top={20} left={20}></BackButton>
              <Typography variant="h3" component="h3" sx={{ fontSize: '5vw', fontWeight: 'bold', textDecoration: 'underline' }}>
                {"Table " + table.number}
              </Typography>
              <Box sx={{ padding: '2vh 0' }}>
                {(table.elements !== undefined && table.elements.length > 0) ?
                  <CustomizedTableForGroupBilling items={table.elements} /> : ''
                }
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <Box sx={{ padding: '3vh 5vw', backgroundColor: '#d9d9d9' }}>
        <hr style={{ border: 'none', borderTop: '1px solid rgba(0, 0, 0, 1)', margin: '20px 0' }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body1" component="span" fontWeight={400} fontSize={'3vw'}>
            Total: ${totalPrice}
          </Typography>
          <Button onClick={validatePayment} variant="contained" color="inherit"
            sx={{ padding: '20px 50px', borderRadius: '50px', fontSize: '4vw' }}
            disabled={mutation.isPending}>
            Paid
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default GroupBilling;
