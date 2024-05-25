require('dotenv').config();
const nodemailer = require('nodemailer');
const sendEmail = async (req, res) => {
    if (req.method === 'POST') {
        const { email } = req.body;

        const transporter = nodemailer.createTransport({
            host: 'smtp.mail.ru',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: 'New Contact Request',
            text: `You have a new contact request from ${email}.`
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Email sent successfully' }); // Вернуть успешный JSON-ответ
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ message: 'Error sending email' }); // Вернуть JSON-ответ с ошибкой
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' }); // Обработать неподдерживаемые методы запросов
    }
};

export default sendEmail;
