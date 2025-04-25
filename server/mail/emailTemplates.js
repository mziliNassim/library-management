const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 0; background-color: #f5f5f5;">
  <div style="margin: 20px;">
    <!-- Header with modern design -->
    <div style="background: linear-gradient(135deg, #6a3de8, #9d41e0); padding: 30px 20px; text-align: center; border-radius: 12px 12px 0 0;">
      <div style="font-size: 28px; color: white; margin-bottom: 5px;">
        <i class="fas fa-lock" style="margin-right: 10px;"></i>Password Reset
      </div>
      <p style="color: rgba(255, 255, 255, 0.9); margin: 0; font-size: 16px;">Secure your account in just a few clicks</p>
    </div>

    <!-- Main content with shadow and rounded corners -->
    <div style="background-color: white; padding: 35px 30px; border-radius: 0 0 12px 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.05);">
      <p style="font-size: 17px;">Hi there,</p>

      <!-- Visual separator -->
      <div style="width: 60px; height: 5px; background: linear-gradient(to right, #6a3de8, #9d41e0); margin: 20px 0;"></div>

      <p style="font-size: 16px; color: #555;">We noticed you're having trouble accessing your account. No worries! We can help you reset your password.</p>

      <!-- Info box -->
      <div style="background-color: rgba(106, 61, 232, 0.05); border-left: 4px solid #6a3de8; padding: 15px; margin: 25px 0; border-radius: 0 8px 8px 0;">
        <p style="margin: 0; color: #444;">This link will expire in <strong>60 minutes</strong> for security reasons.</p>
      </div>

      <!-- Call to action button -->
      <div style="text-align: center; margin: 35px 0;">
        <a href="{resetURL}" style="display: inline-block; background: linear-gradient(to right, #6a3de8, #9d41e0); color: white; padding: 15px 35px; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 16px; box-shadow: 0 5px 15px rgba(106, 61, 232, 0.3); transition: all 0.3s ease;">Reset My Password</a>
      </div>

      <p style="color: #666; font-size: 15px;">If you didn't request a password reset, you can safely ignore this email.</p>

      <!-- Signature area -->
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
        <p style="margin: 0; color: #555;">Stay secure</p>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align: center; margin-top: 25px; color: #999; font-size: 14px;">
      <p style="margin: 5px 0;">This is an automated message. Please do not reply.</p>
      <div style="margin-top: 15px;">
        <a href="https://library-system-pfe.netlify.app/libritech/contact-us" style="color: #6a3de8; text-decoration: none; margin: 0 10px;">Contact Us</a>
        <a href="https://library-system-pfe.netlify.app/privacy-policy" style="color: #6a3de8; text-decoration: none; margin: 0 10px;">Privacy Policy</a>
      </div>
    </div>

  </div>
</body>
</html>
`;

const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 0; background-color: #f5f5f5;">
  <div style="margin: 20px;">
    <!-- Header with modern design -->
    <div style="background: linear-gradient(135deg, #6a3de8, #9d41e0); padding: 30px 20px; text-align: center; border-radius: 12px 12px 0 0;">
      <div style="font-size: 28px; color: white; margin-bottom: 5px;">
        <i class="fas fa-shield-alt" style="margin-right: 10px;"></i>Password Reset Successful
      </div>
      <p style="color: rgba(255, 255, 255, 0.9); margin: 0; font-size: 16px;">Your account is now secure</p>
    </div>

    <!-- Main content with shadow and rounded corners -->
    <div style="background-color: white; padding: 35px 30px; border-radius: 0 0 12px 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.05);">
      <p style="font-size: 17px;">Hi there,</p>

      <!-- Visual separator -->
      <div style="width: 60px; height: 5px; background: linear-gradient(to right, #6a3de8, #9d41e0); margin: 20px 0;"></div>

      <p style="font-size: 16px; color: #555;">We're writing to confirm that your password has been successfully reset.</p>

      <!-- Success checkmark icon -->
      <div style="text-align: center; margin: 35px 0;">
        <div style="background: linear-gradient(135deg, #6a3de8, #9d41e0); color: white; width: 80px; height: 80px; line-height: 80px; border-radius: 50%; display: inline-block; font-size: 40px; box-shadow: 0 5px 15px rgba(106, 61, 232, 0.3);">
        ✓
        </div>
      </div>

      <!-- Warning box -->
      <div style="background-color: rgba(255, 177, 0, 0.05); border-left: 4px solid #ffb100; padding: 15px; margin: 25px 0; border-radius: 0 8px 8px 0;">
        <p style="margin: 0; color: #444;"><strong>Important:</strong> If you did not initiate this password reset, please contact our support team immediately.</p>
      </div>

      <!-- Security recommendations -->
      <div style="background-color: rgba(106, 61, 232, 0.05); padding: 20px; border-radius: 8px; margin: 25px 0;">
        <p style="margin-top: 0; color: #555; font-weight: 600;">For enhanced security, we recommend:</p>
        <ul style="color: #555; padding-left: 25px;">
          <li style="margin-bottom: 10px;">Use a strong, unique password with a mix of letters, numbers, and symbols</li>
          <li>Avoid using the same password across multiple sites or services</li>
        </ul>
      </div>

      <p style="color: #555; font-size: 16px;">Thank you for helping us keep your account secure.</p>

     <!-- Signature area -->
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
        <p style="margin: 0; color: #555;">Stay secure</p>
      </div>
    </div>

    <!-- Footer -->

    <!-- Footer -->
    <div style="text-align: center; margin-top: 25px; color: #999; font-size: 14px;">
      <p style="margin: 5px 0;">This is an automated message. Please do not reply.</p>
      <div style="margin-top: 15px;">
        <a href="https://library-system-pfe.netlify.app/libritech/contact-us" style="color: #6a3de8; text-decoration: none; margin: 0 10px;">Contact Us</a>
        <a href="https://library-system-pfe.netlify.app/privacy-policy" style="color: #6a3de8; text-decoration: none; margin: 0 10px;">Privacy Policy</a>
      </div>
    </div>
  </div>
</body>
</html>
`;

const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Welcome to Digital Business Cards</title>
</head>
<body>
    <h1>Welcome {{name}}!</h1>
    <p>Thank you for joining {{company_name}}. We're excited to have you on board!</p>
    <p>Start creating your digital business card today and enhance your professional networking.</p>
    <p>If you have any questions, feel free to reach out to our support team.</p>
    <br>
    <p>Best regards,</p>
    <p>The {{company_name}} Team</p>
</body>
</html>
`;

module.exports = {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
};
