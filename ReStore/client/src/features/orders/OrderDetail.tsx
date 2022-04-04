import { Grid, Button, Typography } from '@mui/material';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { BasketItem } from '../../app/models/basket';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import BasketSummary from '../basket/BasketSummary';
import BasketTable from '../basket/BasketTable';
import { fetchOrderAsync, orderSelectors } from './orderSlice';

export default function OrderDetail() {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const order = useAppSelector((state) => orderSelectors.selectById(state, id));

  useEffect(() => {
    if (!order) dispatch(fetchOrderAsync(parseInt(id)));
  }, [dispatch, id, order]);

  if (!order) return <LoadingComponent message='Loading order...' />;

  const subtotal =
    order?.orderItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    ) ?? 0;

  return (
    <>
      <Grid container>
        <Grid item xs={9}>
          <Typography variant='h4'>
            Order Detail For Order #{id} - {order?.orderStatus}
          </Typography>
        </Grid>
        <Grid item xs={3} sx={{ mb: 2 }}>
          <Button
            component={Link}
            to='/orders'
            variant='contained'
            size='large'
            fullWidth
          >
            Return To Orders
          </Button>
        </Grid>
        <BasketTable
          items={order?.orderItems as BasketItem[]}
          isBasket={false}
        />
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary subtotal={subtotal} />
        </Grid>
      </Grid>
    </>
  );
}
