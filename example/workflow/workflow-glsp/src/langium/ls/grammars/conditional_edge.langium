grammar ConditionalEdgeDSL

import './common';

entry Model:
    condition=Condition;

Condition:
    'if' variable=[Variable:ID] '.' property=[Property:ID] operator=('>' | '<' | '>=' | '<=' | '==' | '!=') value=INT;
