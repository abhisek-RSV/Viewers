// import React from 'react';
// import { useSystem } from '@ohif/core';
// import { usePatientInfo } from '@ohif/extension-default';

// function CustomPanel() {
//   const { servicesManager } = useSystem();
//   console.log('service manger', servicesManager);

//   if (!servicesManager) {
//     return <div className="p-4 text-white">Loading...</div>;
//   }

//   const { patientInfo, isMixedPatients } = usePatientInfo(servicesManager);
//   console.log('paitent information', patientInfo);
//   const {
//     PatientName = 'Unknown',
//     PatientID = 'Unknown',
//     PatientSex = 'Unknown',
//     PatientDOB = 'Unknown', // Correct field for DOB
//   } = patientInfo;

//   return (
//     <div className="p-4 text-sm text-white">
//       <h3 className="mb-2 text-lg text-green-400">Patient Info</h3>

//       {isMixedPatients && (
//         <div className="mb-2 font-semibold text-yellow-400">⚠ Multiple patients loaded</div>
//       )}

//       <div className="mb-1">
//         <strong>Name:</strong> {PatientName}
//       </div>
//       <div className="mb-1">
//         <strong>ID:</strong> {PatientID}
//       </div>
//       <div className="mb-1">
//         <strong>Sex:</strong> {PatientSex}
//       </div>
//       <div className="mb-1">
//         <strong>DOB:</strong> {PatientDOB}
//       </div>
//     </div>
//   );
// }

// export default CustomPanel;

import React from 'react';

function CustomPanel() {
  return <div>CustomPanel</div>;
}

export default CustomPanel;
