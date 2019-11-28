"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let User = class User {
};
tslib_1.__decorate([
    typeorm_1.ObjectIdColumn(),
    tslib_1.__metadata("design:type", typeorm_1.ObjectID)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ comment: '昵称', nullable: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "nickname", void 0);
tslib_1.__decorate([
    typeorm_1.CreateDateColumn(),
    tslib_1.__metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
tslib_1.__decorate([
    typeorm_1.CreateDateColumn(),
    tslib_1.__metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
User = tslib_1.__decorate([
    typeorm_1.Entity('users')
], User);
exports.User = User;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5lbnRpdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1c2VyLmVudGl0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBb0Y7QUFHcEYsSUFBYSxJQUFJLEdBQWpCLE1BQWEsSUFBSTtDQWVoQixDQUFBO0FBYkM7SUFEQyx3QkFBYyxFQUFFO3NDQUNiLGtCQUFRO2dDQUFBO0FBR1o7SUFEQyxnQkFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzttQ0FDZDtBQUdiO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOztzQ0FDMUI7QUFHaEI7SUFEQywwQkFBZ0IsRUFBRTtzQ0FDUixJQUFJO3VDQUFBO0FBR2Y7SUFEQywwQkFBZ0IsRUFBRTtzQ0FDUixJQUFJO3VDQUFBO0FBZEosSUFBSTtJQURoQixnQkFBTSxDQUFDLE9BQU8sQ0FBQztHQUNILElBQUksQ0FlaEI7QUFmWSxvQkFBSSJ9