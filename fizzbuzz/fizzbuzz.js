function fizzBuzz(n) {
  let firstArray = [1, 1];
  while (firstArray.length < n)
    firstArray.push(
      firstArray[firstArray.length - 1] + firstArray[firstArray.length - 2]
    );
  let secondArray = [];
  for (let i = 0; i < n; ++i)
    if (firstArray[i] % 15 === 0) secondArray.push('FizzBuzz');
    else if (firstArray[i] % 5 === 0) secondArray.push('Buzz');
    else if (firstArray[i] % 3 === 0) secondArray.push('Fizz');
    else secondArray.push(firstArray[i]);
  return secondArray;
}
fizzBuzz(100);
