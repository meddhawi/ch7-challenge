# Binar Chapter 6 Challenge: Database

## Follow these codes to run

```
# Clone repository
git clone https://github.com/meddhawi/ch7-challenge.git

# Install necessary dependencies
npm install

# Create database
npx sequelize db:create

# Migrate the database
npx sequelize db:migrate

# Create an account for SuperAdmin
npx sequelize-cli db:seed:all

# Run the command
npm start
```

### Endpoint list(API):
1. localhost:8000/api/register → for making PlayerUser account
2. localhost:8000/api/login → then copy the token to Authorization header
3. localhost:8000/api/me → to see your current info
4. localhost:8000/api/create → create a room
5. localhost:8000/fight/:id → join the room and input (:id → enter the created room id)
   1. When you fight as the owner of the room make an input: Key → PlayerOneMove, Value → rock/paper/scissor
   2. When you fight as the guest of the room make an input: Key → PlayerTwoMove, Value → rock/paper/scissor
   3. It will take 3 of your moves after 3 moves it will notify the User
6. localhost:8000/api/result/:id → see the result whether you win or not
7. localhost:8000/api/user_history → to see your activity and see the result of your previous fight
8. localhost:8000/api/user_info → see your biodata

### Endpoint list(FullStack(no auth)):
1. To play the game click Play Now on the homepage (localhost:8000/)
2. To register click Register on the Navbar (localhost:8000/register)
3. To change your biodata → click login → click change your information (localhost:8000/user_update)
4. To delete your account → from change your information → delete your account(localhost:8000/user_delete)
5. To see the other player go to (localhost:8000/user_list)

****