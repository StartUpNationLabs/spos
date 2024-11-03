import React from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import CancelIcon from '@mui/icons-material/Cancel';
import { Configuration, PaymentsApi } from '@spos/clients-payment-sharing';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const makePayment = async (data: {
  userState: any;
  tableId: string;
  groupId: string;
  userId: string;
}) => {
  const api = new PaymentsApi(
    new Configuration({
      basePath: import.meta.env.VITE_PAYMENTS_API_BASE_PATH,
    })
  );

  // faire cette req pour chaque type d'item (foie gras, pizza, etc) en mettant la quantité
  return (
    await api.paymentControllerTakeItemFromCenterTable({
      itemRequestDto: {} as any,
    })
  ).data;
};

export function PayementAsignee() {
  const tableId = '1';
  const groupId = '1';
  const state = {};

  // mutation
  const { mutate } = useMutation({
    mutationFn: makePayment,
  });

  const navigate = useNavigate();

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
              userState: state,
              tableId: tableId,
              groupId: groupId,
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
              userState: state,
              tableId: tableId,
              groupId: groupId,
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
            navigate(`/mealSelectionForPayment/${groupId}/${tableId}`);
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
              userState: state,
              tableId: tableId,
              groupId: groupId,
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
              userState: state,
              tableId: tableId,
              groupId: groupId,
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
