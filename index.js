const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
const nodemailer = require('nodemailer');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
    return res.status(200).json({
        msg: 'SERVER IS RUNNING'
    })
})

app.post('/getMessage', async (req, res) => {
    try {
        const { firstname, lastname, email, phone, message } = req.body;
        if (firstname === "") {
            return res.status(400).json({
                error: 'Firstname is required!'
            })
        } else {
            if (lastname === "") {
                return res.status(400).json({
                    error: 'Lastname is required'
                })
            } else {
                if (email === "") {
                    return res.status(400).json({
                        error: 'Email is required'
                    })
                } else {
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                        return res.status(400).json({
                            error: 'Provide a valid email!'
                        })
                    } else {
                        if (phone === "") {
                            return res.status(400).json({
                                error: 'Phone is required!'
                            })
                        } else {
                            if (message === "") {
                                return res.status(400).json({
                                    error: 'Say Something!'
                                })
                            } else {
                                const mailTransporter = nodemailer.createTransport({
                                    service: 'Gmail',
                                    auth: {
                                        user: 'palshuvo13@gmail.com',
                                        pass: 'sltz mcxh vloz jodw'
                                    }
                                })

                                const mail = {
                                    from: email,
                                    to: 'palshuvo13@gmail.com',
                                    subject: 'Someone Messaged From Your Portfolio. Check Shuvo Pal!',
                                    html: `<h1 style='background: black; width: 700px; color: white; padding: 20px 30px; margin: 0 auto; text-align: center;'>From Your Portfolio</h1><br /><div style='width: 730px; margin: 0 auto; background: #ecfccb; padding: 15px;'>
                                      <p style='font-size: 16px;'>Firstname: ${firstname}</p>
                                      <p style='font-size: 16px;'>Lastname: ${lastname}</p>
                                      <p style='font-size: 16px;'>Email: ${email}</p>
                                      <p style='font-size: 16px;'>Phone: ${phone}</p>
                                      <p style='font-size: 16px;'>Message: ${message}</p>
                                    </div>`
                                }

                                await mailTransporter.sendMail(mail);
                                return res.status(200).json({
                                    msg: 'Thanks for contacting me!'
                                })
                            }
                        }
                    }
                }
            }
        }
    } catch (err) {
        console.error('Error sending email:', err);
        res.status(500).send('Failed to send message or something went to wrong!');
    }
})


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`SERVER IS RUNNING ON PORT ${PORT}`));