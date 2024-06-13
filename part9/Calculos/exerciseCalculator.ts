interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}
interface Valores {
    a: number;
    b: number[];
  }
  
  const parseValores = (args: string[]): Valores => {
    if (args.length < 4) throw new Error('Not enough arguments');
    const valoresb = [];

    for(let i = 3; i < args.length; i++){
        if(!isNaN(Number(args[2])) && !isNaN(Number(args[i]))){
            valoresb.push(Number(args[i])); 
        }else{
            throw new Error('Provided values were not numbers!');
        }
       
    }
    return {
        a: Number(args[2]),
        b: valoresb
    };
  };

export const calculateExercises = (a: number, b: number[]): Result => {
    const training = b.filter((day) => day > 0).length;
    const promedio = b.reduce((a, b) => a + b, 0) / b.length;
    let puntaje;
    let puntajeDescrip;

    if (promedio < a) {
        puntaje = 1;
        puntajeDescrip = 'not too bad but could be better';
      } else if (promedio === a) {
        puntaje = 2;
        puntajeDescrip = 'good';
      } else {
        puntaje = 3;
        puntajeDescrip = 'very good';
      }

    return {
        periodLength: b.length,
        trainingDays: training,
        success: training >= b.length,
        rating: puntaje,
        ratingDescription: puntajeDescrip,
        target: a,
        average: promedio
    };
};

try{
    const { a, b } = parseValores(process.argv);
    const result = calculateExercises(a, b);
    console.log(result);
}catch(error: unknown){
    let errorMessage = 'Something bad happend.';
    if(error instanceof Error){
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
