const dotenv = require('dotenv');
dotenv.config();
const Steam = require('steam-user');
const TOTPSteam = require('steam-totp');

const client = new Steam();

client.logOn({
    "accountName": process.env.USER,
    "password": process.env.PASSWORD,
    "twoFactorCode": TOTPSteam.generateAuthCode(process.env.SHARED_SECRET)
});

client.on('loggedOn', () =>{
    console.log(`Logged in ${process.env.USER}`);

    client.setPersona(process.env.STATUS);
    client.gamesPlayed([730]);
});

client.on('appLaunched', () =>{
    console.log("Game is running!");
});