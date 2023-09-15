const nodemailer=require("nodemailer")

const sendEmail=async(options)=>{
    const transporter=nodemailer.createTransport({
        service:process.env.SMPT_SERVICE,
        auth:{
            user:process.env.SMPT_EMAIL,
            pass:process.env.SMPT_PASS,
        }
    })
    const message_options={
        from:process.env.SMPT_EMAIL,
        to:options.email,
        subject:options.subject,
        text:options.msg

    }
    await transporter.sendMail(message_options)

}
module.exports=sendEmail