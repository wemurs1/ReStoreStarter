import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import agent from '../../app/api/agent';
import { Order, OrderParams } from '../../app/models/order';
import { MetaData } from '../../app/models/pagination';
import { RootState } from '../../app/store/configureStore';

interface OrderState {
  ordersLoaded: boolean;
  orderParams: OrderParams;
  metaData: MetaData | null;
}

const ordersAdapter = createEntityAdapter<Order>();

function getAxiosParams(orderParams: OrderParams) {
  const params = new URLSearchParams();
  params.append('pageNumber', orderParams.pageNumber.toString());
  params.append('pageSize', orderParams.pageSize.toString());
  return params;
}

export const fetchOrderAsync = createAsyncThunk<Order, number>(
  'order/fetchOrderAsync',
  async (productId, thunkAPI) => {
    try {
      return agent.Orders.fetch(productId);
    } catch (error: any) {
      thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchOrdersAsync = createAsyncThunk<
  Order[],
  void,
  { state: RootState }
>('order/fetchOrdersAsync', async (_, thunkAPI) => {
  const params = getAxiosParams(thunkAPI.getState().order.orderParams);
  try {
    const response = await agent.Orders.list(params);
    thunkAPI.dispatch(setMetaData(response.metaData));
    return response.items;
  } catch (error: any) {
    thunkAPI.rejectWithValue({ error: error.data });
  }
});

function initParams() {
  return {
    pageNumber: 1,
    pageSize: 6,
  };
}

export const orderSlice = createSlice({
  name: 'order',
  initialState: ordersAdapter.getInitialState<OrderState>({
    ordersLoaded: false,
    orderParams: initParams(),
    metaData: null,
  }),
  reducers: {
    setOrderParams: (state, action) => {
      state.ordersLoaded = false;
      state.orderParams = {
        ...state.orderParams,
        ...action.payload,
        pageNumber: 1,
      };
    },
    setPageNumber: (state, action) => {
      state.ordersLoaded = false;
      state.orderParams = {
        ...state.orderParams,
        ...action.payload,
      };
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
    resetOrderParams: (state) => {
      state.orderParams = initParams();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrdersAsync.fulfilled, (state, action) => {
      ordersAdapter.setAll(state, action.payload);
      state.ordersLoaded = true;
    });
    builder.addCase(fetchOrdersAsync.rejected, (state, action) => {
      console.log(action.payload);
    });
    builder.addCase(fetchOrderAsync.fulfilled, (state, action) => {
      ordersAdapter.upsertOne(state, action.payload);
    });
    builder.addCase(fetchOrderAsync.rejected, (state, action) => {
      console.log(action);
    });
  },
});

export const orderSelectors = ordersAdapter.getSelectors(
  (state: RootState) => state.order
);

export const { setOrderParams, resetOrderParams, setMetaData, setPageNumber } =
  orderSlice.actions;
