const regTemplate = (username) => `
<div style="font-family: Arial, sans-serif; background-color: #f4f4f7; padding: 20px;">
  <table align="center" width="100%" max-width="600px" style="background: #ffffff; border-radius: 10px; overflow: hidden;">
    
    <!-- Header -->
    <tr>
      <td style="background: #4f46e5; color: white; text-align: center; padding: 20px; font-size: 24px; font-weight: bold;">
        Ledger
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding: 30px; color: #333;">
        <h2 style="margin-top: 0;">Welcome ${username}</h2>
        <p style="font-size: 16px;">
          Your account has been successfully created.
        </p>

        <p style="font-size: 16px;">
          We're excited to have you onboard. Start exploring now!
        </p>

        <!-- Button -->
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://aman8cse.vercel.app/" 
             style="background: #4f46e5; color: white; padding: 12px 20px; 
                    text-decoration: none; border-radius: 6px; font-size: 16px;">
            Explore the developer's portfolio
          </a>
        </div>

        <p style="font-size: 14px; color: #888;">
          If you did not create this account, please ignore this email.
        </p>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background: #f4f4f7; text-align: center; padding: 15px; font-size: 12px; color: #999;">
        © 2026 Ledger. All rights reserved.
      </td>
    </tr>

  </table>
</div>
`;

const transactionTemplate = ({ username, amount, type, date, balance }) => `
<div style="font-family: Arial, sans-serif; background-color: #f4f4f7; padding: 20px;">
  <table align="center" width="100%" style="max-width:600px; background: #ffffff; border-radius: 10px; overflow: hidden;">
    
    <!-- Header -->
    <tr>
      <td style="background: #4f46e5; color: white; text-align: center; padding: 20px; font-size: 22px; font-weight: bold;">
        Ledger Transaction Alert
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding: 30px; color: #333;">
        <h2 style="margin-top: 0;">Hi ${username},</h2>

        <p style="font-size: 16px;">
          A new transaction has been recorded in your account.
        </p>

        <!-- Transaction Box -->
        <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin: 20px 0;">
          
          <p style="margin: 8px 0; font-size: 16px;">
            <strong>Type:</strong> 
            <span style="color: ${type === "CREDIT" ? "#16a34a" : "#dc2626"};">
              ${type}
            </span>
          </p>

          <p style="margin: 8px 0; font-size: 16px;">
            <strong>Amount:</strong> ₹${amount}
          </p>

          <p style="margin: 8px 0; font-size: 16px;">
            <strong>Date:</strong> ${date}
          </p>

          <p style="margin: 8px 0; font-size: 16px;">
            <strong>Updated Balance:</strong> ₹${balance}
          </p>

        </div>

        <!-- Button -->
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://your-app-link.com/dashboard" 
             style="background: #4f46e5; color: white; padding: 12px 20px; 
                    text-decoration: none; border-radius: 6px; font-size: 16px;">
            View Details
          </a>
        </div>

        <p style="font-size: 14px; color: #888;">
          If you did not authorize this transaction, please contact support immediately.
        </p>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background: #f4f4f7; text-align: center; padding: 15px; font-size: 12px; color: #999;">
        © 2026 Ledger. All rights reserved.
      </td>
    </tr>

  </table>
</div>
`;

const transactionFailureTemplate = ({ username, amount, reason, date, supportLink }) => `
<div style="font-family: Arial, sans-serif; background-color: #f4f4f7; padding: 20px;">
  <table align="center" width="100%" style="max-width:600px; background: #ffffff; border-radius: 10px; overflow: hidden;">
    
    <!-- Header -->
    <tr>
      <td style="background: #dc2626; color: white; text-align: center; padding: 20px; font-size: 22px; font-weight: bold;">
        Transaction Failed ❌
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding: 30px; color: #333;">
        <h2 style="margin-top: 0;">Hi ${username},</h2>

        <p style="font-size: 16px;">
          We regret to inform you that your recent transaction could not be completed.
        </p>

        <!-- Failure Details Box -->
        <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 20px; margin: 20px 0;">
          
          <p style="margin: 8px 0; font-size: 16px;">
            <strong>Amount:</strong> ₹${amount}
          </p>

          <p style="margin: 8px 0; font-size: 16px;">
            <strong>Date:</strong> ${date}
          </p>

          <p style="margin: 8px 0; font-size: 16px;">
            <strong>Reason:</strong> 
            <span style="color: #dc2626;">${reason}</span>
          </p>

        </div>

        <!-- Suggestions -->
        <p style="font-size: 16px;">
          You may try again after resolving the issue. If the problem persists, please contact support.
        </p>

        <!-- Button -->
        <div style="text-align: center; margin: 30px 0;">
          <a href="${supportLink}" 
             style="background: #4f46e5; color: white; padding: 12px 20px; 
                    text-decoration: none; border-radius: 6px; font-size: 16px;">
            Contact Support
          </a>
        </div>

        <p style="font-size: 14px; color: #888;">
          If you did not initiate this transaction, please secure your account immediately.
        </p>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background: #f4f4f7; text-align: center; padding: 15px; font-size: 12px; color: #999;">
        © 2026 Ledger. All rights reserved.
      </td>
    </tr>

  </table>
</div>
`;

export { transactionFailureTemplate };


export { regTemplate, transactionTemplate }