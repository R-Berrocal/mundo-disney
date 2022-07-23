"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_connection_1 = require("./db/db_connection");
const routes_1 = require("./routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
//db connection
(0, db_connection_1.dbConnection)();
// Middlewares
//cors
app.use((0, cors_1.default)());
//body reading
app.use(express_1.default.json());
//Routes
app.use("/auth", routes_1.auth);
app.use("/characters", routes_1.character);
app.use("/movies", routes_1.movie);
app.use("/genres", routes_1.genre);
app.use("/carrito", routes_1.carrito);
app.use("/orden", routes_1.orden);
//listen
app.listen(process.env.PORT, () => console.log("server running in the port", process.env.PORT));
exports.default = app;
//# sourceMappingURL=app.js.map