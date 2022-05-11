"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path = (0, express_1.Router)();
path.get("/", (req, res) => {
    res.send("Hola mundo");
});
exports.default = path;
//# sourceMappingURL=auth.js.map