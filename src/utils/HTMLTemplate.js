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


export { regTemplate }