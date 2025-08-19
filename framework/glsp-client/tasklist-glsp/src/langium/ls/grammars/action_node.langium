grammar ActionNodeDSL

import './common';

entry Model:
    actionNode=ActionNode;

ActionNode:
    Perform | Check;

Perform:
    'Perform' test=[Test:ID];

Check:
    'Check' (content+=ID)+;