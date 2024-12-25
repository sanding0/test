function callNativeMethod(method: string, ...params: any) {
  console.log(`Calling native method: {method = ${method}, params = ${params}`);
}

export default {
  callNativeMethod,
};
