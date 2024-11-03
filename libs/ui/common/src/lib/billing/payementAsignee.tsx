import React from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import CancelIcon from '@mui/icons-material/Cancel';
import { Configuration, PaymentsApi } from '@spos/clients-payment-sharing';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import useCarts, { CartsState } from '../commandsR/stores/cart';

const makePayment = async (data: {
  cart: CartsState['carts'];
  groupId: string;
  userId: string;
}) => {
  const api = new PaymentsApi(
    new Configuration({
      basePath: import.meta.env.VITE_PAYMENT_SHARING_BASE_URL,
    })
  );
  const promises = [];
  for (const [currentTable, items] of Object.entries(data.cart)) {
    for (const item of items) {
      promises.push(
        api.paymentControllerTakeItemFromCenterTable({
          itemRequestDto: {
            amount: item.quantity,
            group_id: data.groupId,
            item_short_name: item.shortName,
            owner_id: data.userId,
            table_id: currentTable,
          },
        })
      );
    }
  }
  await Promise.all(promises);
};

export function PayementAsignee() {
  const { tableNumber: tableId, groupId } = useParams<{
    tableNumber: string;
    groupId: string;
  }>();
  const cart = useCarts((state) => state.carts);
  const navigate = useNavigate();
  const resetCart = useCarts((state) => state.resetAllCarts);

  // mutation
  const { mutate } = useMutation({
    mutationFn: makePayment,
    onSuccess: () => {
      resetCart();
      navigate(`/mealSelectionForPayment/${tableId}`);
    },
  });

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        aspectRatio: '1/1',
        gap: '0px',
      }}
    >
      <div
        style={{
          aspectRatio: '1/1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IconButton
          onClick={() => {
            mutate({
              cart,
              groupId: groupId || '',
              userId: tableId + '1',
            });
          }}
        >
          <ArrowOutwardIcon
            style={{
              fontSize: '150px',
              transform: `rotate(-90deg)`,
            }}
          />
        </IconButton>
      </div>
      <div
        style={{
          aspectRatio: '1/1',
          display: 'flex',
          alignItems: 'center',
        }}
      />
      <div
        style={{
          aspectRatio: '1/1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IconButton
          onClick={() => {
            mutate({
              cart,
              groupId: groupId || '',
              userId: tableId + '2',
            });
          }}
        >
          <ArrowOutwardIcon
            style={{
              fontSize: '150px',
              transform: `rotate(0deg)`,
            }}
          />
        </IconButton>
      </div>
      <div
        style={{
          aspectRatio: '1/1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
      <div
        style={{
          aspectRatio: '1/1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IconButton
          onClick={() => {
            navigate(`/mealSelectionForPayment/${tableId}`);
          }}
        >
          <CancelIcon
            style={{
              fontSize: '150px',
              transform: `rotate(180deg)`,
            }}
          />
        </IconButton>
      </div>
      <div
        style={{
          aspectRatio: '1/1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
      <div
        style={{
          aspectRatio: '1/1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IconButton
          onClick={() => {
            mutate({
              cart,
              groupId: groupId || '',
              userId: tableId + '3',
            });
          }}
        >
          <ArrowOutwardIcon
            style={{
              fontSize: '150px',
              transform: `rotate(180deg)`,
            }}
          />
        </IconButton>
      </div>
      <div
        style={{
          aspectRatio: '1/1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
      <div
        style={{
          aspectRatio: '1/1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IconButton
          onClick={() => {
            mutate({
              cart,
              groupId: groupId || '',
              userId: tableId + '4',
            });
          }}
        >
          <ArrowOutwardIcon
            style={{
              fontSize: '150px',
              transform: `rotate(90deg)`,
            }}
          />
        </IconButton>
      </div>
    </div>
  );
}

export default PayementAsignee;
