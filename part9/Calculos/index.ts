import express from 'express';
import { parseArguments, calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const weightQuery = req.query.weight;
  const heightQuery = req.query.height;
  if (!weightQuery || !heightQuery) {
    res.status(400);
    res.send({ error: 'missing parameter height or weight' });
  } else {
      try {
          const { height, weight } = parseArguments(
            Number(weightQuery),
            Number(heightQuery)
          );
          const bmi = calculateBmi(height, weight);
          res.send({
            weight: weight,
            height: height,
            bmi: bmi
          });} catch (e) {
            res.status(400);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            res.send({ error: e.message });
          }
        }

        app.post('/exercises', (req, res) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const { target, daily_exercises } = req.body;

          if (!target || !daily_exercises) {
            return res.status(400).send({ error: 'parameters missing' });
          }

          try{
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            const result = calculateExercises(target, daily_exercises );
            return res.send({ result });
        }catch(error: unknown){
            let errorMessage = 'Something bad happend.';
            if(error instanceof Error){
                errorMessage += ' Error: ' + error.message;
            }
            return res.status(400).send(errorMessage);
        }
        });
});


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});