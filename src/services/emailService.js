import dotenv from 'dotenv';
dotenv.config()
import { Resend } from "resend";
import { regTemplate } from '../utils/HTMLTemplate.js';

const apiKey = process.env.RESEND_API_KEY;

if(!apiKey) throw new Error("RESEND_API_KEY is not defined");

const resend = new Resend(apiKey);

export async function sendMail(sendTo, name) {
    const regHTML = regTemplate(name);
    const { data, error } = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: sendTo,
        subject: `Welcome to Ledger, ${name}! 🎉`,
        html: regHTML,
    });

    if (error) {
        console.error("Error sending email:", error);
        return { success: false, error };
    }

    console.log("Email sent successfully!");
    console.log("Email ID:", data?.id);
}