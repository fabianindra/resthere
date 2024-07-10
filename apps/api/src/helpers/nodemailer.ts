import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rizalfikri852@gmail.com',
    pass: 'esvr ailj frco vfie',
  },
});
