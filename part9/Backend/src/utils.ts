import { NewPatientEntry, Gender, Entry  } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseSsn = (ssn: unknown): string => {
    if (!isString(ssn)) {
      throw new Error('Incorrect or missing ssn');
    }
    return ssn;
  };

  const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
  };

  const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
      throw new Error('Incorrect gender: ' + gender);
    }
    return gender;
  };

  const parseOccupation = (occupation: unknown): string => {
    if (!isString(occupation)) {
      throw new Error('Incorrect or missing occupation');
    }
    return occupation;
  };

const isDate = (dateOfBirth: string): boolean => {
    return Boolean(Date.parse(dateOfBirth));
  };

const parseDate = (dateOfBirth: unknown): string => {
    if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing date: ' + dateOfBirth);
    }
    return dateOfBirth;
  };

  const parseEntries = (entries: any): Entry[] => {
    if (!entries) {
      throw new Error(`Incorrect or missing entries: ${entries}`);
    }
    return entries;
  };

  const toNewPatientEntry = (object: any): NewPatientEntry => {
    return {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: parseEntries(object.entries)
    };
  };
  
  export default toNewPatientEntry;