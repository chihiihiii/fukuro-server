Thuc hien voi sequelize-cli
- Di chuyen den thu muc app: cd app
- Tao model: npx sequelize-cli model:generate --name Ten_Model --attributes firstName:string
- Them table: npx sequelize db:migrate

- Tao seeder: npx sequelize-cli seed:generate --name seed-event
- Chạy seeder: npx sequelize-cli db:seed:all    