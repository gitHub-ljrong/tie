"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@tiejs/common");
const typeorm_1 = require("@tiejs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
let UserRepository = class UserRepository {
    async findAll() {
        const users = await this.userRepository.find();
        if (users.length)
            return users;
        const user = await this.userRepository.save({
            email: 'test@test.com',
            nickname: 'nick',
        });
        return [user];
    }
};
tslib_1.__decorate([
    typeorm_1.InjectRepository(user_entity_1.User),
    tslib_1.__metadata("design:type", typeorm_2.Repository)
], UserRepository.prototype, "userRepository", void 0);
UserRepository = tslib_1.__decorate([
    common_1.Injectable()
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5yZXBvc2l0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXNlci5yZXBvc2l0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDBDQUEwQztBQUMxQyw0Q0FBaUQ7QUFDakQscUNBQW9DO0FBQ3BDLCtDQUFvQztBQUdwQyxJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFjO0lBSXpCLEtBQUssQ0FBQyxPQUFPO1FBQ1gsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFBO1FBQzlDLElBQUksS0FBSyxDQUFDLE1BQU07WUFBRSxPQUFPLEtBQUssQ0FBQTtRQUM5QixNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDO1lBQzFDLEtBQUssRUFBRSxlQUFlO1lBQ3RCLFFBQVEsRUFBRSxNQUFNO1NBQ1QsQ0FBQyxDQUFBO1FBQ1YsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ2YsQ0FBQztDQUNGLENBQUE7QUFYQztJQURDLDBCQUFnQixDQUFDLGtCQUFJLENBQUM7c0NBQ0Msb0JBQVU7c0RBQU07QUFGN0IsY0FBYztJQUQxQixtQkFBVSxFQUFFO0dBQ0EsY0FBYyxDQWExQjtBQWJZLHdDQUFjIn0=