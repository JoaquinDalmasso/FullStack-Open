import React from 'react';
import { useState, useEffect  } from "react";
import {useMatch} from 'react-router-dom';
import { Patient , Diagnosis  } from '../../types';
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnosis";

const PatientPage = () => {
    const [patient, setPatient] = useState<Patient | null>(null);
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
    const match = useMatch('/patients/:id');

    useEffect(() => {
        const fetchPatient = async () => {
          if (match && match.params.id) {
            try {
              const patientData = await patientService.getOne(match.params.id);
              setPatient(patientData);
            } catch (e) {
              console.error('Failed to fetch patient data:', e);
            }
          }
        };
        fetchPatient();

        const fetchDiagnose = async () => {
          if (match && match.params.id) {
            try {
              const diagnoseData = await diagnosisService.getAll();
              setDiagnoses(diagnoseData);
            } catch (e) {
              console.error('Failed to fetch patient data:', e);
            }
          }
        };
        fetchDiagnose();
      }, [match]);

    if (patient) {
      return (
        <div>
          <h2>
            {patient.name}
          </h2>
          <p>ssh: {patient.ssn}</p>
          <p>occupation: {patient.occupation}</p>
          <h3>entries</h3>
          {patient.entries?.map((entry, i) => (
          <div key={i}>
            {entry.date} {entry.description}
            <ul>
            {entry.diagnosisCodes?.map((code,e) => {
                            const diagnosis = diagnoses.find(diagnose => diagnose.code === code)?.name;
                            return ( 
                            <li key={e}>{code} {diagnosis? diagnosis : null}</li> 
                            );
                          }
                        )}
            </ul>
          </div>
        ))}
        </div>
      );
    }
  
    return null;
  };
  
  export default PatientPage;