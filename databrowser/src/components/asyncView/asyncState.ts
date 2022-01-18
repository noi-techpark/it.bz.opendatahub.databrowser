enum AsyncState {
  FETCHING,
  FINISHED_WITH_ERROR,
  FINISHED_WITH_SUCCESS,
}

function getAsyncState(data: unknown, error: unknown): AsyncState {
  if (error != null && error != undefined) {
    return AsyncState.FINISHED_WITH_ERROR;
  }
  if (data != null && data != undefined) {
    return AsyncState.FINISHED_WITH_SUCCESS;
  }

  return AsyncState.FETCHING;
}

export { AsyncState, getAsyncState };
