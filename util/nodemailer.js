import nodemailer from 'nodemailer'

const email = process.env.EMAIL; 
const pass = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email,
        pass: pass,
    }
})

const mailOptions = {
    from: email
}

export async function sendEmail_newTravelAuth(id, employee, recipient) {
    await transporter.sendMail({
        ...mailOptions, 
        to: recipient,
        subject: "New Travel Authorization",
        html: `<p>${employee} has requested a new travel authorization. Click <a href=${process.env.PROD_URL + 'travel/travelauth/authorize/' + id}>here</a> to approve the form.</p>`
    })
}

export async function sendEmail_travelAuthApproved(id, number, manager, recipient) {
    await transporter.sendMail({
        ...mailOptions, 
        to: recipient,
        subject: 'Travel Authorization #' + number + ' approved',
        html: `<p>Your travel authorization (#${number}) has been approved by ${manager}. Click <a href=${process.env.PROD_URL + 'travel/travelauth/view/' + id}>here</a> to view the form.</p>`
    })
}

export async function sendEmail_travelAuthDenied(id, number, manager, recipient) {
    await transporter.sendMail({
        ...mailOptions, 
        to: recipient,
        subject: 'Revision needed for Travel Authorization #' + number,
        html: `<p>${manager} has requested a revision for your travel authorization (#${number}). Click <a href=${process.env.PROD_URL + 'travel/travelauth/view/' + id}>here</a> to revise the form.</p>`
    })
}

export async function sendEmail_travelAuthRevised(id, number, employee, recipient) {
    await transporter.sendMail({
        ...mailOptions, 
        to: recipient,
        subject: 'Travel Authorization #' + number + ' revised',
        html: `<p>${employee} has revised travel authorization #${number}. Click <a href=${process.env.PROD_URL + 'travel/travelauth/authorize/' + id}>here</a> to view the form.</p>`
    })
}

export async function sendEmail_advDisbursementNeeded(id, number, employee, recipient) {
    await transporter.sendMail({
        ...mailOptions, 
        to: recipient,
        subject: 'Travel Advance Disbursement For Travel Authorization #' + number,
        html: `<p>Travel authorization #${number} requested by ${employee} has been approved. Click <a href=${process.env.PROD_URL + 'travel/travelauth/view/' + id}>here</a> to fill out the travel advance disbursement date.</p>`
    })
}


