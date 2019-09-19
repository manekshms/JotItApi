const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const { setUpDatabase, testOneUserId, testOneUserToken, testOneUser } = require("./fixtures/db");

beforeEach(setUpDatabase);

test("Should create new user", async () => {
    const response = await request(app).post("/users").send({
        "name": "userOne",
        "email": "userone@gmail.com",
        "age": "22",
        "gender": "male",
        "username": "userone",
        "password": "UserOne@1234"
    }).expect(201);

    // Assert that the database was changed correctly
    const user = await User.findById(response.body.data.user.id);
    expect(user).not.toBeNull()

    // Assert that the data saved in database was correct
    expect(user).toMatchObject({
        "name": "userOne",
        "email": "userone@gmail.com",
        "age": 22,
        "gender": "male",
        "username": "userone",
    });

    // Assert that the response doesn't contain token
    expect(response.body.data.token).toEqual(undefined);
});

test("Should create new user and login", async () => {
    const response = await request(app).post("/users?login=true").send({
        "name": "userOne",
        "email": "userone@gmail.com",
        "age": "22",
        "gender": "male",
        "username": "userone",
        "password": "UserOne@1234"
    }).expect(201);

    // Assert that the data was saved correctly on database
    const user = await User.findById(response.body.data.user.id);
    expect(user).toMatchObject({
        "name": "userOne",
        "email": "userone@gmail.com",
        "age": 22,
        "gender": "male",
        "username": "userone",
    });

    // Assert that the response token was correct
    expect(response.body.data.token).toEqual(user.tokens[0].token);
});

test("Should login existing user", async () => {
    const response = await request(app).post("/auth/login").send({
        "username": testOneUser.username,
        "password": testOneUser.password
    }).expect(200);

    // Assert that the response contain user data
    const user = await User.findById(testOneUserId);
    expect(user).toMatchObject({ 
        name: response.body.data.user.name,
        email: response.body.data.user.email,
        username: response.body.data.user.username,
    });

    // Assert that the response contain token
    expect(user.tokens[user.tokens.length - 1].token).toEqual(response.body.data.token);
});

test("Should not login nonexisting user", async () => {
    const response = await request(app).post("/auth/login").send({
        "username": "unknownuser",
        "password": "password2323@"
    }).expect(400);
});

test("Should not login existing user with wrong password", async () => {
    const response = await request(app).post("/auth/login").send({
        "username": testOneUser._id,
        "password": "wrongpassword"
    }).expect(400);
});

test("Should get user data for logged in user", async () => {
    const response = await request(app).get("/users")
    .set("Authorization",  `Bearer ${testOneUserToken.token}`)
    .send().expect(200);

    // Assert 
    expect(response.body.data.user).toMatchObject({
        id: testOneUser._id.toString(),
        name: testOneUser.name,
        age: testOneUser.age,
        username: testOneUser.username
    });
});

test("Should logout logged in user", async () => {
    const response = await request(app).get('/auth/logout')
        .set("Authorization", `Bearer ${testOneUserToken.token}`)
        .send().expect(204);

    // Assert that the token is removed from the database
    const user = await User.findOne({_id: testOneUserId});
    const noResult = user.tokens.every(token => {
        token.token != testOneUserToken.token
    });
    expect(noResult).toEqual(true);
});

test("Should logout all logged in users", async () => {
    const response = await request(app).get("/auth/logout-all")
        .set("Authorization", `Bearer ${testOneUserToken.token}`)
        .send().expect(204);
    
    // Assert that all the token are removed for the user
    const user = await User.findOne({_id: testOneUserId});
    expect(user.tokens.length).toEqual(0);
})

test("Should update user data", async () => {
    const response = await request(app).put("/users/")
        .set("Authorization", `Bearer ${testOneUserToken.token}`)
        .send({
            name: "updated"
        }).expect(200);
    
    const user = await User.findById(testOneUserId);
    expect(user.name).toEqual(response.body.data.user.name);
});

test("Should delete user", async () => {
    const response = await request(app).delete("/users/me")
        .set("Authorization", `Bearer ${testOneUserToken.token}`)
        .send().expect(204);
    
    // Assert that user is null for the given user id
    const user = await User.findById(testOneUserId);
    expect(user).toBeNull();
});