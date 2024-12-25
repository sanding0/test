// eslint-disable-next-line @typescript-eslint/no-explicit-any
function callNativeMethod(method: string, ...params: any) {
  console.log(`Calling native method: {method = ${method}, params = ${params}`);
}

export default {
  callNativeMethod,
};
