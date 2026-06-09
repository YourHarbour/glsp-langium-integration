grammar ConditionalEdgeDSL

import './common';

entry Model:
    condition=Condition;

Condition:
    'if' item=[InventoryItem:ID] '.' 'amount' operator=('>' | '<' | '>=' | '<=' | '==' | '!=') value=INT;
