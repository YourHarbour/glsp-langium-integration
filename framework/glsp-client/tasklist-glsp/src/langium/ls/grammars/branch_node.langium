grammar BranchNodeDSL

import './common';

entry Model:
    branchNode=BranchNode;

BranchNode:
    TestExecution | Immunocompromised;

TestExecution:
    'test' test=[Test:ID] disease=[Disease:ID] 'gives' result=('Positive' | 'Negative');

Immunocompromised:
    'the' 'patient\'s' 'Immunocompromised' 'is' result=('Yes' | 'No');
