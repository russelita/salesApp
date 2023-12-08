export const createAction = (type, payload) => {
    return {
        type,
        payload,
    }
}

export const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };