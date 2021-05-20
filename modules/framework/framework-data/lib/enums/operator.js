"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Operator = void 0;
var Operator;
(function (Operator) {
    Operator["$PROJECT"] = "$project";
    Operator["$MATCH"] = "$match";
    Operator["$LOOKUP"] = "$lookup";
    Operator["$SKIP"] = "$skip";
    Operator["$LIMIT"] = "$limit";
    Operator["$SORT"] = "$sort";
    Operator["$GROUP"] = "$group";
    Operator["$ADDFIELDS"] = "$addFields";
    Operator["$UNWIND"] = "$unwind";
    Operator["$COUNT"] = "$count";
    Operator["$EXISTS"] = "$exists";
    Operator["$AND"] = "$and";
    Operator["$OR"] = "$or";
    Operator["$BETWEEN"] = "$between";
    Operator["$NIN"] = "$nin";
    Operator["$IN"] = "$in";
})(Operator = exports.Operator || (exports.Operator = {}));
//# sourceMappingURL=operator.js.map