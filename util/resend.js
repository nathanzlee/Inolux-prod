import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export function sendEmail(recipient) {
    resend.emails.send({
        from: 'onboarding@resend.dev',
        to: recipient,
        subject: 'New Travel Authorization',
        html: `<p> has requested a new travel authorization. Click <a href="/travel">here</a> to approve the form.</p>`
    });
}
export function sendEmail_newTravelAuth(id, employee, recipient) {
    resend.emails.send({
        from: 'onboarding@resend.dev',
        to: recipient,
        subject: 'New Travel Authorization',
        html: `<p>${employee} has requested a new travel authorization. Click <a href="/travel">here</a> to approve the form.</p>`
    });
}

export function sendEmail_travelAuthApproved(id, number, manager, recipient) {
    resend.emails.send({
        from: 'onboarding@resend.dev',
        to: recipient,
        subject: 'Travel Authorization #' + number + ' approved',
        html: `<p>Your travel authorization (#${number}) has been approved by ${manager}. Click <a href="">here</a> to view the form.</p>`
    });
}

export function sendEmail_travelAuthDenied(id, number, manager, recipient) {
    resend.emails.send({
        from: 'onboarding@resend.dev',
        to: recipient,
        subject: 'Revision needed for Travel Authorization #' + number,
        html: `<p>${manager} has requested a revision for your travel authorization (#${number}). Click <a href="">here</a> to revise the form.</p>`
    });
}

export function sendEmail_travelAuthRevised(id, number, employee, recipient) {
    resend.emails.send({
        from: 'onboarding@resend.dev',
        to: recipient,
        subject: 'Revision needed for Travel Authorization #' + number,
        html: `<p>${employee} has revised travel authorization #${number}. Click <a href="">here</a> to approve the form.</p>`
    });
}