interface MultiplyValues {
    height: number;
    weight: number;
  }
  
export const parseArguments = ( height: number,
  weight: number): MultiplyValues => {

  if (!isNaN(height) && !isNaN(weight)) {
    return {
      height: Number(height),
      weight: Number(weight)
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};
  
export const calculateBmi = (height: number, weight: number) => {
  const result = height/((weight/100)*(weight/100));
      if (result < 18.5 ) {
        return "Bajo peso" + result;
      } else if (result < 24.9) {
        return "Rango normal";
      } else if (result < 29.9) {
        return "Sobrepeso";
      }else{
        return "Obesidad" ;
      }
  };
  try {
    const { height, weight } = parseArguments(Number(process.argv[2]),
    Number(process.argv[3]));
    calculateBmi(height, weight);
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }