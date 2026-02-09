

const inquiryReceivedEmail = ({
    name,
    requestId,
    from,
    date
}) =>
    `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Inquiry Confirmation Email</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background-color: #f0edf7;
            line-height: 1.6;

        }

        .container {
            width: 100%;
            max-width: 640px;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
            border: 1px solid #ffffff;
        }

        .header {
            padding: 30px 20px;
            border-bottom: 1px solid #f3f4f6;
            text-align: center;
        }

        .logo-section {
            margin-bottom: 15px;
        }

        .logo {
            display: inline-block;
            width: 40px;
            height: 40px;
            margin-right: 8px;
            vertical-align: middle;
            color: #a172fd;
        }

        .brand-name {
            display: inline-block;
            font-size: 22px;
            font-weight: 700;
            color: #1e293b;
            vertical-align: middle;
            letter-spacing: -0.5px;
        }

        .divider-line {
            width: 50px;
            height: 4px;
            background-color: rgba(161, 114, 253, 0.2);
            border-radius: 2px;
            margin: 12px auto 0;
        }

        .content {
            padding: 40px 24px;
        }

        .hero-image {
            background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuC_Hm5wWsEI8-rPuDgvG42BuUZleu62pvtAi31dAVtA6a-T09MlwWiJCsCFq6oDBXD4RkBQ5dZIBhcoqaHK6tLmGH02dINrYSkjZ9lOfrtpQl9vk44WxuXhjepTa0lS59FSVhalUXGRNzm-ZBOJnNw0BqBhkLi9EMMo-mB9K_aeg9JlrwZlAu71QYpMSqfReiPoVTcxWaDhoEDsMNA6E6oikgk9beSOr6mgOLXULKIFzZhnHqLHrRl2WKKI0lmoDoc1CSPibElTjPI');
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            width: 100%;
            height: 200px;
            background-color: rgba(161, 114, 253, 0.05);
            border-radius: 48px;
            border: 1px solid #f3f4f6;
            margin-bottom: 30px;

            align-items: center;
            justify-content: center;
            overflow: hidden;
        }

        .hero-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .greeting {
            margin-bottom: 30px;
        }

        .greeting h2 {
            font-size: 28px;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 20px;
            line-height: 1.3;
        }

        .greeting p {
            font-size: 16px;
            color: #475569;
            margin-bottom: 16px;
            line-height: 1.6;
        }

        .highlight {
            font-weight: 600;
            color: #a172fd;
        }

        .section-header {
            font-size: 11px;
            font-weight: 700;
            color: #a172fd;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            margin: 30px 0 15px 0;
        }

        .summary-table {
            width: 100%;
            border-collapse: collapse;
            border-top: 1px solid #f3f4f6;
            border-bottom: 1px solid #f3f4f6;
            margin-bottom: 30px;
        }

        .summary-table tr {
            border-bottom: 1px solid #f3f4f6;
        }

        .summary-table tr:last-child {
            border-bottom: none;
        }

        .summary-table td {
            padding: 16px 0;
            font-size: 14px;
        }

        .summary-label {
            color: #94a3b8;
            font-weight: 500;
            width: 30%;
            vertical-align: top;
        }

        .summary-value {
            color: #1e293b;
            font-weight: 600;
        }

        .button-group {
            margin-top: 30px;
            text-align: center;
        }

        .button {
            display: inline-block;
            padding: 12px 24px;
            margin: 8px;
            border-radius: 50px;
            font-size: 16px;
            font-weight: 700;
            text-decoration: none;
            cursor: pointer;
            border: none;
            text-align: center;
            min-width: 160px;
            transition: opacity 0.2s;
        }

        .button-primary {
            background: linear-gradient(135deg, #E770C1 0%, #a172fd 100%);
            color: #ffffff;
            box-shadow: 0 10px 25px rgba(161, 114, 253, 0.25);
        }

        .button-primary:hover {
            opacity: 0.9;
        }

        .button-secondary {
            background-color: #f3f4f6;
            color: #1e293b;
        }

        .button-secondary:hover {
            background-color: #e2e8f0;
        }

        .footer {
            background-color: #f8fafc;
            border-top: 1px solid #f3f4f6;
            padding: 30px 24px;
            text-align: center;
        }

        .social-links {
            margin-bottom: 24px;
            text-align: center;
        }

        .social-links a {
            display: inline-block;
            width: 32px;
            height: 32px;
            line-height: 32px;
            margin: 0 12px;
            color: #94a3b8;
            text-decoration: none;
            font-size: 18px;
        }

        .footer-text {
            font-size: 12px;
            color: #94a3b8;
            line-height: 1.6;
            margin-bottom: 16px;
        }

        .footer-links {
            font-size: 12px;
            text-align: center;
        }

        .footer-links a {
            color: #a172fd;
            text-decoration: none;
            margin: 0 8px;
        }

        .footer-links span {
            color: #cbd5e1;
            margin: 0 4px;
        }

        @media (max-width: 600px) {
        .container{
        padding:10px;
        }
            .content {
                padding: 24px 16px;
            }

            .greeting h2 {
                font-size: 24px;
            }

            .button {
                display: block;
                width: 100%;
                margin: 8px 0;
            }
        }
    </style>
</head>

<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <div class="logo-section">

                <img src='https://finora-sandy.vercel.app/images/logo.png' alt="LOGO" />
            </div>
            <div class="divider-line"></div>
        </div>

        <!-- Main Content -->
        <div class="content">
            <!-- Hero Image -->
            <div class="hero-image">
                <table role="presentation" width="100%" height="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td align="center" valign="middle">
                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"
                                fill="none" stroke="#AC8CE4" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" style="display:block;margin:0 auto;">
                                <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" />
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                <path d="m16 19 2 2 4-4" />
                            </svg>
                        </td>
                    </tr>
                </table>
            </div>


            <!-- Greeting -->
            <div class="greeting">
                <h2>We've received your message.</h2>
                <p>Hi ${name}, thank you for reaching out! We've received your inquiry and our team is already looking into
                    it. We appreciate you taking the time to share your thoughts with us.</p>
                <p>You can expect a detailed response from one of our specialists within <span class="highlight">24-48
                        hours</span>. In the meantime, feel free to explore our resource center.</p>
            </div>

            <!-- Section Header -->
            <div class="section-header">Inquiry Summary</div>

            <!-- Summary Table -->
            <table class="summary-table">
                <tr>
                    <td class="summary-label">Subject</td>
                    <td class="summary-value">General Inquiry</td>
                </tr>
                <tr>
                    <td class="summary-label">Date</td>
                    <td class="summary-value">${date}</td>
                </tr>
                <tr>
                    <td class="summary-label">Ticket ID</td>
                    <td class="summary-value">#INC-${requestId.toString().slice(0, 4)}</td>
                </tr>
            </table>

            <!-- Buttons -->
            <div class="button-group">
                <a href="#" class="button button-primary">Visit WebSite</a>
                <a href="#" class="button button-secondary">Visit our FAQ</a>
            </div>
        </div>

        <!-- Footer -->
        <footer class="footer">
            <div class="social-links">
                <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" class="lucide lucide-globe-icon lucide-globe">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                        <path d="M2 12h20" />
                    </svg></a>
                <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" class="lucide lucide-message-circle-icon lucide-message-circle">
                        <path
                            d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
                    </svg></a>
                <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" class="lucide lucide-users-icon lucide-users">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <path d="M16 3.128a4 4 0 0 1 0 7.744" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <circle cx="9" cy="7" r="4" />
                    </svg></a>
            </div>
            <div class="footer-text">
                Sent by FinoraCFO Inc. ${from}<br />
            </div>
            <div class="footer-links">
                <a href="#">Unsubscribe</a>
                <span>|</span>
                <a href="#">Privacy Policy</a>
                <span>|</span>
                <a href="#">Contact Us</a>
            </div>
        </footer>
    </div>
</body>

</html>`;
const requestApprovedEmail = ({
    name,
    requestId,
    from,
    date
}) =>
    `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Inquiry Confirmation Email</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background-color: #f0edf7;
            line-height: 1.6;

        }

        .container {
            width: 100%;
            max-width: 640px;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
            border: 1px solid #ffffff;
        }

        .header {
            padding: 30px 20px;
            border-bottom: 1px solid #f3f4f6;
            text-align: center;
        }

        .logo-section {
            margin-bottom: 15px;
        }

        .logo {
            display: inline-block;
            width: 40px;
            height: 40px;
            margin-right: 8px;
            vertical-align: middle;
            color: #a172fd;
        }

        .brand-name {
            display: inline-block;
            font-size: 22px;
            font-weight: 700;
            color: #1e293b;
            vertical-align: middle;
            letter-spacing: -0.5px;
        }

        .divider-line {
            width: 50px;
            height: 4px;
            background-color: rgba(161, 114, 253, 0.2);
            border-radius: 2px;
            margin: 12px auto 0;
        }

        .content {
            padding: 40px 24px;
        }

        .hero-image {
            background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuC_Hm5wWsEI8-rPuDgvG42BuUZleu62pvtAi31dAVtA6a-T09MlwWiJCsCFq6oDBXD4RkBQ5dZIBhcoqaHK6tLmGH02dINrYSkjZ9lOfrtpQl9vk44WxuXhjepTa0lS59FSVhalUXGRNzm-ZBOJnNw0BqBhkLi9EMMo-mB9K_aeg9JlrwZlAu71QYpMSqfReiPoVTcxWaDhoEDsMNA6E6oikgk9beSOr6mgOLXULKIFzZhnHqLHrRl2WKKI0lmoDoc1CSPibElTjPI');
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            width: 100%;
            height: 200px;
            background-color: rgba(161, 114, 253, 0.05);
            border-radius: 48px;
            border: 1px solid #f3f4f6;
            margin-bottom: 30px;

            align-items: center;
            justify-content: center;
            overflow: hidden;
        }

        .hero-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .greeting {
            margin-bottom: 30px;
        }

        .greeting h2 {
            font-size: 28px;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 20px;
            line-height: 1.3;
        }

        .greeting p {
            font-size: 16px;
            color: #475569;
            margin-bottom: 16px;
            line-height: 1.6;
        }

        .highlight {
            font-weight: 600;
            color: #a172fd;
        }

        .section-header {
            font-size: 11px;
            font-weight: 700;
            color: #a172fd;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            margin: 30px 0 15px 0;
        }

        .summary-table {
            width: 100%;
            border-collapse: collapse;
            border-top: 1px solid #f3f4f6;
            border-bottom: 1px solid #f3f4f6;
            margin-bottom: 30px;
        }

        .summary-table tr {
            border-bottom: 1px solid #f3f4f6;
        }

        .summary-table tr:last-child {
            border-bottom: none;
        }

        .summary-table td {
            padding: 16px 0;
            font-size: 14px;
        }

        .summary-label {
            color: #94a3b8;
            font-weight: 500;
            width: 30%;
            vertical-align: top;
        }

        .summary-value {
            color: #1e293b;
            font-weight: 600;
        }

        .button-group {
            margin-top: 30px;
            text-align: center;
            
        }

        .button {
            display: inline-block;
            padding: 12px 24px;
            margin: 8px;
            border-radius: 50px;
            font-size: 16px;
            font-weight: 700;
            text-decoration: none;
            cursor: pointer;
            border: none;
            text-color:white;
            text-align: center;
            min-width: 160px;
            transition: opacity 0.2s;
            
        }

        .button-primary {
            background: linear-gradient(135deg, #E770C1 0%, #a172fd 100%);
            color: #ffffff;
            box-shadow: 0 10px 25px rgba(161, 114, 253, 0.25);
        }

        .button-primary:hover {
            opacity: 0.9;
        }

        .button-secondary {
            background-color: #f3f4f6;
            color: #1e293b;
            text-color:#1e293b;
        }

        .button-secondary:hover {
            background-color: #e2e8f0;
        }

        .footer {
            background-color: #f8fafc;
            border-top: 1px solid #f3f4f6;
            padding: 30px 24px;
            text-align: center;
        }

        .social-links {
            margin-bottom: 24px;
            text-align: center;
        }

        .social-links a {
            display: inline-block;
            width: 32px;
            height: 32px;
            line-height: 32px;
            margin: 0 12px;
            color: #94a3b8;
            text-decoration: none;
            font-size: 18px;
        }

        .footer-text {
            font-size: 12px;
            color: #94a3b8;
            line-height: 1.6;
            margin-bottom: 16px;
        }

        .footer-links {
            font-size: 12px;
            text-align: center;
        }

        .footer-links a {
            color: #a172fd;
            text-decoration: none;
            margin: 0 8px;
        }

        .footer-links span {
            color: #cbd5e1;
            margin: 0 4px;
        }

        @media (max-width: 600px) {
        .container{
        padding:10px;
        }
            .content {
                padding: 24px 16px;
            }

            .greeting h2 {
                font-size: 24px;
            }

            .button {
                display: block;
                width: 100%;
                margin: 8px 0;
            }
        }
    </style>
</head>

<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <div class="logo-section">

                <img src='https://finora-sandy.vercel.app/images/logo.png' alt="LOGO" />
            </div>
            <div class="divider-line"></div>
        </div>

        <!-- Main Content -->
        <div class="content">
            <!-- Hero Image -->
            <div class="hero-image">
                <table role="presentation" width="100%" height="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td align="center" valign="middle">
                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"
                                fill="none" stroke="#AC8CE4" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" style="display:block;margin:0 auto;">
                                <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" />
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                <path d="m16 19 2 2 4-4" />
                            </svg>
                        </td>
                    </tr>
                </table>
            </div>


            <!-- Greeting -->
            <div class="greeting">
                <h2>Your request has been approved.</h2>
                <p>Hi ${name}, thank you for reaching out! We've received your inquiry and our team is approved your request .
                 We appreciate you taking the time to share your thoughts with us.</p>
                <p>You can expect a detailed response from one of our specialists within <span class="highlight">24-48
                        hours</span>. In the meantime, feel free to explore our resource center.</p>
            </div>

            <!-- Section Header -->
            <div class="section-header">Inquiry Summary</div>

            <!-- Summary Table -->
            <table class="summary-table">
                <tr>
                    <td class="summary-label">Subject</td>
                    <td class="summary-value">General Inquiry</td>
                </tr>
                <tr>
                    <td class="summary-label">Date</td>
                    <td class="summary-value">${date}</td>
                </tr>
                <tr>
                    <td class="summary-label">Ticket ID</td>
                    <td class="summary-value">#INC-${requestId.toString().slice(0, 4)}</td>
                </tr>
            </table>

            <!-- Buttons -->
            <div class="button-group">
                <a href="#" class="button button-primary">Visit WebSite</a>
                <a href="#" class="button button-secondary">Visit our FAQ</a>
            </div>
        </div>

        <!-- Footer -->
        <footer class="footer">
            <div class="social-links">
                <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" class="lucide lucide-globe-icon lucide-globe">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                        <path d="M2 12h20" />
                    </svg></a>
                <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" class="lucide lucide-message-circle-icon lucide-message-circle">
                        <path
                            d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
                    </svg></a>
                <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" class="lucide lucide-users-icon lucide-users">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <path d="M16 3.128a4 4 0 0 1 0 7.744" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <circle cx="9" cy="7" r="4" />
                    </svg></a>
            </div>
            <div class="footer-text">
                Sent by FinoraCFO Inc. ${from}<br />
            </div>
            <div class="footer-links">
                <a href="#">Unsubscribe</a>
                <span>|</span>
                <a href="#">Privacy Policy</a>
                <span>|</span>
                <a href="#">Contact Us</a>
            </div>
        </footer>
    </div>
</body>

</html>`;

module.exports = {
    inquiryReceivedEmail,
    requestApprovedEmail
}
