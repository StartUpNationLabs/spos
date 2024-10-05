import { Button, Typography, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import NavBar from "../utils/navbar";
import { setSelectedTableById, tablesMenu } from '../utils/tableUtils';
import BackButton from "../utils/backButton";
import { BillingService, GroupService, Item, MonsieurAxelMenvoie2, TableItem, TableSummary, TYPES } from "@spos/services/common";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useCommandsParameter from "../commandsR/stores/useCommandsParameter";
import useTableBillingStore from "./stores/paymentStore";
import NumberInput from "../tables/nbPeopleSelector";
import CustomizedTableForTableBilling from "./customizedTableForTableBilling";
import { ContainerContext } from "../containerHook/containerContext";

const theme = {
  hr: {
    border: 'none',
    borderTop: '1px solid rgba(0, 0, 0, 1)',
    margin: '20px 0'
  }
};

export function TableBilling() {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const container = useContext(ContainerContext);

  const { elementToBePaid, updateItem, resetPaymentStore } = useTableBillingStore(state => state);

  const queryClient = useQueryClient();
  const tableNumber = useCommandsParameter(state => state.tableNumber);

  if (!groupId || groupId === "") {
    navigate("/");
  }
  console.log(groupId);

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
      resetPaymentStore(groupId ?? '');
      navigate('/');
    },
    onError: (error) => {
      console.log(error);
    }
  });

  const {
    data: billingSummary,
    isLoading: isLoadingBilling,
    isError: isErrorBilling,
    error: errorBilling,
  } = useQuery({
    queryKey: ['billingSummary', groupId],
    queryFn: async () => {
      const billingService: BillingService = container.get<BillingService>(TYPES.BillingService);
      return billingService.getBillingSummary(groupId);
    },
    enabled: groupId !== undefined && groupId !== "",
    refetchOnWindowFocus: 'always',
  });

  const {
    data: group,
    isLoading: isLoadingGroup,
    isError: isErrorGroup,
    error: errorGroup,
  } = useQuery({
    queryKey: ['group', groupId],
    queryFn: async () => {
      const groupService: GroupService = container.get<GroupService>(TYPES.GroupService);
      return groupService.getGroup(groupId);
    },
    enabled: groupId !== undefined && groupId !== "",
    refetchOnWindowFocus: 'always',
  });

  useEffect(() => {
    if (group)
      resetPaymentStore(group.id)
  }, [group, resetPaymentStore]);

  if (isLoadingBilling || isLoadingGroup) {
    return (
      <Typography variant="h6" component="h2" fontWeight="bold">
        Loading...
      </Typography>
    );
  }
  if (!billingSummary || isErrorBilling) {
    console.error(errorBilling);
    return (
      <Typography variant="h6" component="h2" fontWeight="bold">
        Error
      </Typography>
    );
  }

  if (!group || isErrorGroup) {
    console.error(errorGroup);
    return (
      <Typography variant="h6" component="h2" fontWeight="bold">
        Error
      </Typography>
    );
  }

  const currentTableSummary = billingSummary.find(element => element.number === tableNumber) || { number: tableNumber, elements: [] };

  const getTotalPrice = () => {
    let result = 0;

    Object.keys(elementToBePaid).forEach(table => {
      result += elementToBePaid[parseInt(table)].reduce((sum, { quantityPaid, price }) => {
        return sum + quantityPaid * price;
      }, 0);
    })

    return result;
  }

  const handleSelectAll = () => {
    currentTableSummary.elements.forEach(tableItem => updateItem(tableNumber, tableItem.item.id, tableItem.remaining, tableItem.item.price))
  };

  const handleUnselectAll = () => {
    currentTableSummary.elements.forEach(tableItem => updateItem(tableNumber, tableItem.item.id, 0, tableItem.item.price))
  };

  const validatePayment = () => {
    console.log(getTotalPrice());

    mutation.mutate({
      groupId: groupId ?? '',
      elementToBePaid: elementToBePaid
    })
  }


  function onClickBackButton() {
    console.log('clicked on back button... redirection to be implemented');
    navigate("/commands/" + groupId);
  }

  return (
    <Box sx={{ minHeight: '100dvh', display: 'flex', flexDirection: 'row' }}>
      <Box sx={{ boxSizing: 'border-box', width: 'fit-content', borderRight: '2px solid #000' }}>
        <NavBar tables={group.tables} />
      </Box>
      <Box id="test" sx={{
        boxSizing: 'border-box', backgroundColor: '#d9d9d9', flexGrow: 1,
        paddingTop: '5dvh', paddingLeft: '5dvw', paddingRight: '5dvw'
      }}>
        <div id="billing-section" style={{ minHeight: '75dvh' }}>
          <BackButton onClick={onClickBackButton} color={'black'} top={20} left={150}></BackButton>
          <Typography variant="h2" component="h2" sx={{ fontSize: '8vw', fontWeight: 'bold', textAlign: 'center' }}>
            Billing
          </Typography>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h3" component="h3"
              sx={{
                fontSize: '5vw', fontWeight: 'bold', textDecoration: 'underline',
                margin: '2vh 0'
              }}>
              {"Table " + tableNumber}
            </Typography>
            <div>
              <Button onClick={handleSelectAll} variant="contained" color="inherit"
                sx={{ borderRadius: '50px', fontSize: '3vw' }}>
                Select All
              </Button>
              <Button onClick={handleUnselectAll} variant="contained" color="inherit"
                sx={{ borderRadius: '50px', fontSize: '3vw' }}>
                Unselect All
              </Button>
            </div>
          </div>
          <Box sx={{ overflow: 'auto', maxHeight: '60dvh' }}>
            <CustomizedTableForTableBilling summary={currentTableSummary} />
          </Box>
        </div>
        <Box sx={{ padding: '3vh 5vw', backgroundColor: '#d9d9d9' }}>
          <hr style={theme.hr} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body1" component="span" fontWeight={400} fontSize={'3vw'}>
              Total: ${getTotalPrice()}
            </Typography>
            <Button onClick={validatePayment} variant="contained" color="inherit"
              sx={{ padding: '20px 50px', borderRadius: '50px', fontSize: '4vw' }}
              disabled={mutation.isPending}>
              Paid
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default TableBilling;
