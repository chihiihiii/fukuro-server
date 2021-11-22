Thuc hien voi sequelize-cli
- Di chuyen den thu muc app: cd app
- Tao model: npx sequelize-cli model:generate --name Ten_Model --attributes firstName:string
- Them table: npx sequelize db:migrate

- Tao seeder: npx sequelize-cli seed:generate --name seed-event
- Chạy seeder: npx sequelize-cli db:seed:all    

*** Chú thích:
- Database name: fukuro_server (app/config/config.json)
- Account client: 
    - username: customer_chi
    - password: 123456

    - username: customer_mai
    - password: 123456

    - username: customer_binh
    - password: 123456

    - username: customer_toan
    - password: 123456

- Account admin: 
    - username: admin_chi
    - password: 123456

    - username: admin_mai
    - password: 123456

    - username: admin_binh
    - password: 123456

    - username: admin_toan
    - password: 123456

*** Hướng dẫn (development):
- Clone code
- Tạo database tên fukuro_server
- npm install
- npm run dev
- cd app
- npx sequelize-cli db:seed:all (Thêm data cho database)

*** Hướng dẫn (production):
- Clone code
- Tạo database tên fukuro_server
- npm install
- cd app
- npx sequelize db:migrate
- npx sequelize-cli db:seed:all
- cd ../
- node server.js
