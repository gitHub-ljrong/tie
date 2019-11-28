"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@tiejs/common");
let Config = class Config {
    constructor() {
        this.typeorm = {
            type: 'mongodb',
            host: 'localhost',
            port: 27017,
            database: 'test',
            synchronize: true,
            logging: true,
            entities: ['./**/*.entity.ts'],
            migrations: ['./migration/**/*.ts'],
            subscribers: ['./subscriber/**/*.ts'],
            cli: {
                entitiesDir: './entity',
                migrationsDir: './migration',
                subscribersDir: './subscriber',
            },
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
    }
};
Config = tslib_1.__decorate([
    common_1.Injectable()
], Config);
exports.default = Config;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmRlZmF1bHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25maWcuZGVmYXVsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwQ0FBMEM7QUFHMUMsSUFBcUIsTUFBTSxHQUEzQixNQUFxQixNQUFNO0lBQTNCO1FBQ0UsWUFBTyxHQUFHO1lBQ1IsSUFBSSxFQUFFLFNBQVM7WUFDZixJQUFJLEVBQUUsV0FBVztZQUNqQixJQUFJLEVBQUUsS0FBSztZQUNYLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLE9BQU8sRUFBRSxJQUFJO1lBQ2IsUUFBUSxFQUFFLENBQUMsa0JBQWtCLENBQUM7WUFDOUIsVUFBVSxFQUFFLENBQUMscUJBQXFCLENBQUM7WUFDbkMsV0FBVyxFQUFFLENBQUMsc0JBQXNCLENBQUM7WUFDckMsR0FBRyxFQUFFO2dCQUNILFdBQVcsRUFBRSxVQUFVO2dCQUN2QixhQUFhLEVBQUUsYUFBYTtnQkFDNUIsY0FBYyxFQUFFLGNBQWM7YUFDL0I7WUFDRCxlQUFlLEVBQUUsSUFBSTtZQUNyQixrQkFBa0IsRUFBRSxJQUFJO1NBQ3pCLENBQUE7SUFDSCxDQUFDO0NBQUEsQ0FBQTtBQW5Cb0IsTUFBTTtJQUQxQixtQkFBVSxFQUFFO0dBQ1EsTUFBTSxDQW1CMUI7a0JBbkJvQixNQUFNIn0=