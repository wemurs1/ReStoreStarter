import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Grid,
} from '@mui/material';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { currencyFormat } from '../../app/util/util';
import { fetchOrdersAsync, orderSelectors, setPageNumber } from './orderSlice';
import AppPagination from '../../app/components/AppPagination';

export default function OrderList() {
  const orders = useAppSelector(orderSelectors.selectAll);
  const { ordersLoaded, metaData } = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!ordersLoaded) dispatch(fetchOrdersAsync());
  }, [dispatch, ordersLoaded]);

  if (!ordersLoaded) return <LoadingComponent message='Loading orders...' />;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Order number</TableCell>
              <TableCell align='right'>Total</TableCell>
              <TableCell align='right'>Order date</TableCell>
              <TableCell align='right'>Order status</TableCell>
              <TableCell align='right'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.map((order) => (
              <TableRow
                key={order.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {order.id}
                </TableCell>
                <TableCell align='right'>
                  {currencyFormat(order.total)}
                </TableCell>
                <TableCell align='right'>
                  {order.orderDate.split('T')[0]}
                </TableCell>
                <TableCell align='right'>{order.orderStatus}</TableCell>
                <TableCell align='right'>
                  <Button component={Link} to={`/orders/${order.id}`}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container columnSpacing={4}>
        <Grid item xs={3} />
        <Grid item xs={9} sx={{ mb: 2 }}>
          {metaData && (
            <AppPagination
              metaData={metaData}
              onPageChange={(page: number) =>
                dispatch(setPageNumber({ pageNumber: page }))
              }
            />
          )}
        </Grid>
      </Grid>
    </>
  );
}
