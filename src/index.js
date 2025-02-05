"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const errorHandler_util_1 = require("./utils/errorHandler.util");
const courseRoute_routes_1 = __importDefault(require("./routes/courseRoute.routes"));
dotenv_1.default.config();
const portEnv = process.env.PORT;
if (!portEnv) {
    console.error("Error: PORT IS NOT DEFINED IN .env FILE");
    process.exit(1);
}
const PORT = parseInt(portEnv, 10);
if (isNaN(PORT)) {
    console.error("ERROR: PORT IS NOT A NUMBER IN .env file");
    process.exit(1);
}
const app = (0, express_1.default)();
const corsOption = {
    origin: "*",
    Credentials: true,
    allowedHeaders: "*",
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
};
app.use((0, cors_1.default)(corsOption));
app.use(express_1.default.json());
app.use("/api/v1/users", user_route_1.default);
app.use("/api/v1/courses", courseRoute_routes_1.default);
app.use(errorHandler_util_1.errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
