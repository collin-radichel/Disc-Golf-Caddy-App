

function sum(num1, num2) {
  if (!num2) {
    return num1;
  } else {
    return Number(num1) + Number(num2);
  }
}

export default sum;