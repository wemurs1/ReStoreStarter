import { Button, ButtonGroup, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { CounterState, decrement, increment } from './counterReducer';

export default function ContactPage() {
  const dispatch = useDispatch();
  const { data, title } = useSelector((state: CounterState) => state);
  return (
    <>
      <Typography variant='h2'>{title}</Typography>
      <Typography variant='h5'>Data is: {data}</Typography>
      <ButtonGroup>
        <Button
          onClick={() => dispatch(decrement())}
          color='error'
          variant='contained'
        >
          Decrement
        </Button>
        <Button
          onClick={() => dispatch(increment())}
          color='primary'
          variant='contained'
        >
          Increment
        </Button>
        <Button
          onClick={() => dispatch(increment(5))}
          color='secondary'
          variant='contained'
        >
          Increment by 5
        </Button>
      </ButtonGroup>
    </>
  );
}
