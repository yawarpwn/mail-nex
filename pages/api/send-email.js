const nodemailer = require("nodemailer");

export default function handler (req, res) {
  const { name, email, message } = req.body;
  console.log(process.env.PASSWORD)

  const html = `
    <div>
      <h2>Informacion</h2>
      <ul>
        <li>usuario: ${name}</li>
        <li>correo: ${email}</li>
      </ul>
      <h2>Mensaje:</h2>
      <p>${message}</p>
      <ul>

      </ul>
    </div>
  `;

  async function nodeMailer() {
    const transporter = nodemailer.createTransport({
      host: "mail.tellsenales.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "ventas@tellsenales.com", // generated ethereal user
        pass: `${process.env.PASSWORD}$`, // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const info = await transporter.sendMail({
      from: email, // sender address
      to: "tellsenales@gmail.com", // list of receivers
      subject: `Mensaje de ${name} `, // Subject line
      text: "Hello world?", // plain text body
      html: html, // html body
    });

    console.log("Message sent", info.messageId);
    console.log(req.body);
    res.json('working.....');
  }

  nodeMailer();
}
