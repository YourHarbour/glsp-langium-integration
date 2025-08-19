grammar AdmissionActionNodeDSL

import './common';

entry Model:
    admissionActionNode=AdmissionActionNode;

AdmissionActionNode:
    'Admit to' room=('Amber Bay' | 'Side Room' | 'Red Bay');

