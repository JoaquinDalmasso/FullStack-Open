import patientData from '../../data/patients';
import { NonSensitivePatientEntry, PatientEntry, NewPatientEntry } from '../types';
import { v1 as uuidv1 } from 'uuid';

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patientData.map(({ id, name, dateOfBirth, gender,occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
      }));
    };

const getOne = (id: string): NonSensitivePatientEntry | undefined => {
  return patientData.find((patient) => patient.id === id);
};

const addPatient  = (entry: NewPatientEntry) : PatientEntry => {
const newPatientEntry = {
  id: uuidv1(),
  ...entry
};
patientData.push(newPatientEntry);
return newPatientEntry;
};

export default {
  addPatient,
  getNonSensitiveEntries,
  getOne
};