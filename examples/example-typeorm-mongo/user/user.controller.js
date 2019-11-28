"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const controller_1 = require("@tiejs/controller");
const user_service_1 = require("./user.service");
let HomeController = class HomeController {
    constructor(userService) {
        this.userService = userService;
    }
    index() {
        return 'hello world';
    }
    async users() {
        return await this.userService.queryUser();
    }
};
tslib_1.__decorate([
    controller_1.Get('/'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], HomeController.prototype, "index", null);
tslib_1.__decorate([
    controller_1.Get('/users'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], HomeController.prototype, "users", null);
HomeController = tslib_1.__decorate([
    controller_1.Controller(),
    tslib_1.__metadata("design:paramtypes", [user_service_1.UserService])
], HomeController);
exports.HomeController = HomeController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXNlci5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGtEQUFtRDtBQUNuRCxpREFBNEM7QUFHNUMsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztJQUN6QixZQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtJQUFHLENBQUM7SUFFaEQsS0FBSztRQUNILE9BQU8sYUFBYSxDQUFBO0lBQ3RCLENBQUM7SUFHRCxLQUFLLENBQUMsS0FBSztRQUNULE9BQU8sTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxDQUFBO0lBQzNDLENBQUM7Q0FFRixDQUFBO0FBVEM7SUFEQyxnQkFBRyxDQUFDLEdBQUcsQ0FBQzs7OzsyQ0FHUjtBQUdEO0lBREMsZ0JBQUcsQ0FBQyxRQUFRLENBQUM7Ozs7MkNBR2I7QUFWVSxjQUFjO0lBRDFCLHVCQUFVLEVBQUU7NkNBRXNCLDBCQUFXO0dBRGpDLGNBQWMsQ0FZMUI7QUFaWSx3Q0FBYyJ9