"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("../routes/auth"));
class Server {
    constructor() {
        this.apiPath = { auth: "/auth" };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT;
        //middlewares
        this.middleware();
        //Routes
        this.routes();
    }
    middleware() {
        //cors
        this.app.use((0, cors_1.default)());
        //lectura del body
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use(this.apiPath.auth, auth_1.default);
    }
    listen() {
        this.app.listen(this.port, () => console.log("server running in the port", this.port));
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map