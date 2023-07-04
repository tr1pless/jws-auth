const nodemailer = require('nodemailer')
const cron = require('node-cron')

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Активация аккаунта на ` + process.env.API_URL,
      text: '',
      html: `
        <div>
          <h1>Для активации аккаута перейдите по ссылке</h1>
          <a href='${link}'>${link}</a>
        </div>
        `,
    })
  }

  async send3hNotice(to, title, description, deadline) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `У вашей заметки ${title} через 3 часа подойдет дедлайн`,
      text: '',
      html: `
        <div>
          <h1>${title}</h1>
          <p>${description}</p>
          <p style="color:red">${deadline}</p>
          <a href='${process.env.API_URL}'>${process.env.CLIENT_URL}</a>
        </div>
        `,
    })
  }
}

module.exports = new MailService()
