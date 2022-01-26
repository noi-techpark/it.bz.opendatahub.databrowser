import { AxiosError, AxiosResponse } from 'axios';

enum AsyncState {
  FETCHING,
  FINISHED_WITH_ERROR,
  FINISHED_WITH_SUCCESS,
}

function getAsyncState(
  data: AxiosResponse<any, any> | null | undefined,
  error: Error | AxiosError | null | undefined
): AsyncState {
  if (error != undefined) {
    return AsyncState.FINISHED_WITH_ERROR;
  }
  if (data != undefined) {
    return AsyncState.FINISHED_WITH_SUCCESS;
  }

  return AsyncState.FETCHING;
}

export { AsyncState, getAsyncState };
