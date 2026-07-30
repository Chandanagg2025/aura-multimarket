const nodemailer = require('nodemailer');

// Helper to construct SMTP transporter
async function getTransporter() {
  const user = process.env.EMAIL_USER || 'chandanaggarwal2004@gmail.com';
  const pass = process.env.EMAIL_PASS;

  if (pass) {
    console.log(`[SMTP] Using Gmail credentials for user: ${user}`);
    return nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass }
    });
  }

  // Fallback: Generate ethereal test account for local testing
  console.log("[SMTP] Gmail credentials not set. Creating automatic Ethereal test account...");
  const testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  });
}

// 1. Send Order Confirmation Invoice Email
async function sendOrderEmail(order) {
  try {
    const transporter = await getTransporter();
    const isTest = !process.env.EMAIL_PASS;
    const fromEmail = process.env.EMAIL_USER || 'chandanaggarwal2004@gmail.com';
    const toEmail = order.customerEmail || 'chandanaggarwal2004@gmail.com';
    const trackingCode = order.orderRef.replace('#', '');
    const trackingLink = `http://localhost:3000/?track=${trackingCode}`;

    let itemsRows = '';
    order.items.forEach(item => {
      itemsRows += `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #475569; color: #E2E8F0;">${item.name} (${item.sector})</td>
          <td style="padding: 12px; border-bottom: 1px solid #475569; color: #E2E8F0; text-align: center;">${item.quantity}</td>
          <td style="padding: 12px; border-bottom: 1px solid #475569; color: #E2E8F0; text-align: right;">₹${parseFloat(item.price).toLocaleString('en-IN')}</td>
          <td style="padding: 12px; border-bottom: 1px solid #475569; color: #E2E8F0; text-align: right;">₹${(item.price * item.quantity).toLocaleString('en-IN')}</td>
        </tr>
      `;
    });

    const mailOptions = {
      from: `"Shree Pratham Multi-Market" <${fromEmail}>`,
      to: toEmail,
      subject: `Order Placed Successfully! - ${order.orderRef}`,
      html: `
        <div style="background-color: #0F172A; color: #F8FAFC; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid #1E293B;">
          <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #0EA5E9; padding-bottom: 20px;">
            <h1 style="color: #FFF; margin: 0 0 5px; font-size: 24px; font-weight: 800;">SHREE PRATHAM MULTI-MARKET</h1>
            <p style="color: #0EA5E9; margin: 0; font-size: 14px; font-weight: 600; letter-spacing: 2px;">SECURE CHECKOUT INVOICE</p>
          </div>

          <div style="margin-bottom: 25px;">
            <h2 style="color: #FFF; font-size: 18px; margin-top: 0;">Thank You for Your Purchase, ${order.customerName}!</h2>
            <p style="color: #94A3B8; font-size: 14px; line-height: 1.6;">We have successfully registered your payment. Below is your detailed purchase breakdown. You can track this shipment status using the tracking button below.</p>
          </div>

          <div style="background-color: #1E293B; padding: 15px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #0EA5E9;">
            <table style="width: 100%; border-collapse: collapse; font-size: 13px; color: #E2E8F0;">
              <tr>
                <td style="padding: 4px 0; font-weight: 600; color: #94A3B8;">Order Reference:</td>
                <td style="padding: 4px 0; text-align: right; color: #FFF; font-weight: 700;">${order.orderRef}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; font-weight: 600; color: #94A3B8;">Date:</td>
                <td style="padding: 4px 0; text-align: right;">${order.date}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; font-weight: 600; color: #94A3B8;">Shipping Address:</td>
                <td style="padding: 4px 0; text-align: right;">${order.shippingAddress}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; font-weight: 600; color: #94A3B8;">Payment Gateway:</td>
                <td style="padding: 4px 0; text-align: right; color: #10B981; font-weight: bold;">${order.paymentMethod}</td>
              </tr>
            </table>
          </div>

          <h3 style="color: #FFF; font-size: 15px; margin-bottom: 12px; border-bottom: 1px solid #1E293B; padding-bottom: 6px;">Order Items</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 25px;">
            <thead>
              <tr style="background-color: rgba(255,255,255,0.03);">
                <th style="padding: 10px; border-bottom: 2px solid #475569; text-align: left; color: #FFF;">Item Description</th>
                <th style="padding: 10px; border-bottom: 2px solid #475569; text-align: center; color: #FFF; width: 60px;">Qty</th>
                <th style="padding: 10px; border-bottom: 2px solid #475569; text-align: right; color: #FFF; width: 100px;">Price</th>
                <th style="padding: 10px; border-bottom: 2px solid #475569; text-align: right; color: #FFF; width: 100px;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsRows}
            </tbody>
          </table>

          <div style="background-color: rgba(255,255,255,0.02); padding: 15px; border-radius: 8px; margin-bottom: 30px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 13px; color: #E2E8F0;">
              <tr>
                <td style="padding: 5px 0; color: #94A3B8;">Subtotal</td>
                <td style="padding: 5px 0; text-align: right;">₹${parseFloat(order.subtotal).toLocaleString('en-IN')}</td>
              </tr>
              ${order.discount > 0 ? `
              <tr>
                <td style="padding: 5px 0; color: #10B981;">Discount Applied</td>
                <td style="padding: 5px 0; text-align: right; color: #10B981;">-₹${parseFloat(order.discount).toLocaleString('en-IN')}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 5px 0; color: #94A3B8;">GST / Tax (8%)</td>
                <td style="padding: 5px 0; text-align: right;">₹${parseFloat(order.tax).toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td style="padding: 5px 0; color: #94A3B8;">Shipping Delivery</td>
                <td style="padding: 5px 0; text-align: right;">${order.shippingFee === 0 ? 'FREE' : `₹${parseFloat(order.shippingFee).toLocaleString('en-IN')}`}</td>
              </tr>
              <tr style="border-top: 1px solid #475569;">
                <td style="padding: 10px 0 0; font-size: 16px; font-weight: 800; color: #FFF;">Total Amount Paid</td>
                <td style="padding: 10px 0 0; text-align: right; font-size: 16px; font-weight: 800; color: #0EA5E9;">₹${parseFloat(order.totalPaid).toLocaleString('en-IN')}</td>
              </tr>
            </table>
          </div>

          <div style="text-align: center; margin-bottom: 10px;">
            <a href="${trackingLink}" style="background-color: #0EA5E9; color: #FFF; padding: 12px 28px; text-decoration: none; border-radius: 6px; font-weight: 800; font-size: 14px; display: inline-block; box-shadow: 0 4px 10px rgba(14, 165, 233, 0.25);">TRACK SURVEILLANCE SHIPMENT</a>
          </div>

          <div style="text-align: center; margin-top: 30px; font-size: 11px; color: #64748B; border-top: 1px solid #1E293B; padding-top: 20px;">
            <p style="margin: 0;">This email is sent automatically by Shree Pratham Multi-Market secure system gateway.</p>
            <p style="margin: 4px 0 0;">Concierge Support: concierge@shreepratham.in | Cyber District, Sector 9</p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);

    if (isTest) {
      const previewUrl = nodemailer.getTestMessageUrl(info);
      console.log(`\n=============================================================`);
      console.log(`[SMTP SIMULATION SUCCESS] Email sent to: ${toEmail}`);
      console.log(`[SMTP SIMULATION SUCCESS] View receipt invoice at: ${previewUrl}`);
      console.log(`=============================================================\n`);
      return previewUrl;
    } else {
      console.log(`[SMTP SUCCESS] Real invoice email successfully sent to: ${toEmail} (MessageId: ${info.messageId})`);
      return true;
    }
  } catch (error) {
    console.error('[SMTP ERROR] Failed to send order invoice email:', error);
    return false;
  }
}

// 2. Send Contact Form Confirmation Email
async function sendContactEmail(contactData) {
  try {
    const transporter = await getTransporter();
    const isTest = !process.env.EMAIL_PASS;
    const fromEmail = process.env.EMAIL_USER || 'chandanaggarwal2004@gmail.com';
    const customerEmail = contactData.email;

    // Email to the customer confirming receipt
    const customerMailOptions = {
      from: `"Shree Pratham Multi-Market" <${fromEmail}>`,
      to: customerEmail,
      subject: `Inquiry Received - Shree Pratham Support`,
      html: `
        <div style="background-color: #0F172A; color: #F8FAFC; font-family: sans-serif; padding: 25px; border-radius: 8px; max-width: 550px; margin: 0 auto; border: 1px solid #1E293B;">
          <h2 style="color: #FFF; border-bottom: 2px solid #F59E0B; padding-bottom: 10px; margin-top: 0;">Hello ${contactData.name},</h2>
          <p style="font-size: 14px; line-height: 1.5; color: #CBD5E1;">We have successfully received your inquiry ticket regarding **"${contactData.subject}"**.</p>
          <div style="background: rgba(255,255,255,0.03); padding: 15px; border-radius: 6px; font-size: 13px; margin: 15px 0;">
            <strong>Your Message Details:</strong><br/>
            <span style="color: #94A3B8;">Sector: ${contactData.sector || 'General Support'}</span><br/>
            <span style="color: #E2E8F0; display:block; margin-top: 6px;">"${contactData.message}"</span>
          </div>
          <p style="font-size: 14px; line-height: 1.5; color: #CBD5E1;">A Shree Pratham sector specialist has been assigned to your query and will reply to this email address within 4 hours.</p>
          <p style="font-size: 12px; color: #64748B; margin-top: 20px; border-top: 1px solid #1E293B; padding-top: 10px;">Shree Pratham Multi-Market Support Concierge | Cyber District, Sector 9</p>
        </div>
      `
    };

    // Email alert copy to the store owner/seller (chandanaggarwal2004@gmail.com)
    const sellerMailOptions = {
      from: `"Shree Pratham System Alert" <${fromEmail}>`,
      to: 'chandanaggarwal2004@gmail.com',
      subject: `NEW SUPPORT INQUIRY: ${contactData.subject}`,
      html: `
        <div style="background-color: #0F172A; color: #F8FAFC; font-family: sans-serif; padding: 25px; border-radius: 8px; max-width: 550px; margin: 0 auto; border: 1px solid #1E293B;">
          <h2 style="color: #F59E0B; margin-top:0;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px; color: #CBD5E1;">
            <tr><td style="padding: 4px; font-weight:bold;">Sender Name:</td><td style="padding:4px;">${contactData.name}</td></tr>
            <tr><td style="padding: 4px; font-weight:bold;">Sender Email:</td><td style="padding:4px;">${contactData.email}</td></tr>
            <tr><td style="padding: 4px; font-weight:bold;">Sector:</td><td style="padding:4px;">${contactData.sector || 'General'}</td></tr>
            <tr><td style="padding: 4px; font-weight:bold;">Subject:</td><td style="padding:4px;">${contactData.subject}</td></tr>
            <tr><td style="padding: 4px; font-weight:bold; vertical-align:top;">Message:</td><td style="padding:4px; color:#FFF;">${contactData.message}</td></tr>
          </table>
        </div>
      `
    };

    const customerInfo = await transporter.sendMail(customerMailOptions);
    await transporter.sendMail(sellerMailOptions);

    if (isTest) {
      const previewUrl = nodemailer.getTestMessageUrl(customerInfo);
      console.log(`\n=============================================================`);
      console.log(`[CONTACT EMAIL SIMULATION SUCCESS] Inquiry logged by customer.`);
      console.log(`[CONTACT EMAIL SIMULATION SUCCESS] View confirmation email preview at: ${previewUrl}`);
      console.log(`=============================================================\n`);
      return previewUrl;
    } else {
      console.log(`[SMTP SUCCESS] Contact confirmation mails successfully sent to customer and seller.`);
      return true;
    }
  } catch (error) {
    console.error('[SMTP ERROR] Failed to send contact support emails:', error);
    return false;
  }
}

// 3. Push WhatsApp Order Notification
async function sendWhatsAppNotification(order) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const fromNum = process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+14155238886';
  const trackingCode = order.orderRef.replace('#', '');
  const trackingLink = `http://localhost:3000/?track=${trackingCode}`;

  const messageText = `*Shree Pratham Multi-Market Order Alert!* 🛍️\n\n` +
                      `Hello ${order.customerName},\n` +
                      `Your order *${order.orderRef}* has been successfully registered!\n\n` +
                      `*Order Details:*\n` +
                      `• Payment: ${order.paymentMethod}\n` +
                      `• Total Paid: ₹${parseFloat(order.totalPaid).toLocaleString('en-IN')}\n` +
                      `• Address: ${order.shippingAddress}\n\n` +
                      `📦 *Track your shipment here:* ${trackingLink}\n\n` +
                      `Thank you for choosing Shree Pratham!`;

  const toNum = order.customerPhone ? (order.customerPhone.startsWith('whatsapp:') ? order.customerPhone : `whatsapp:${order.customerPhone}`) : 'whatsapp:+919876543210';

  if (sid && token) {
    try {
      console.log(`[WhatsApp] Twilio configurations found. Dispatching request to Twilio API...`);
      // Standard dynamic load of twilio library or API post call
      const client = require('twilio')(sid, token);
      const message = await client.messages.create({
        body: messageText,
        from: fromNum,
        to: toNum
      });
      console.log(`[WhatsApp SUCCESS] Twilio Message dispatched successfully. SID: ${message.sid}`);
      return message.sid;
    } catch (error) {
      console.error('[WhatsApp ERROR] Twilio request failed:', error.message);
      // Fall back to console logs
    }
  }

  // Fallback Simulation Log
  console.log(`\n=============================================================`);
  console.log(`[WHATSAPP NOTIFICATION SIMULATION]`);
  console.log(`Sender VPA/No: ${fromNum}`);
  console.log(`Recipient Number: ${toNum}`);
  console.log(`Message Content:\n-------------------------------------------------------------`);
  console.log(messageText);
  console.log(`-------------------------------------------------------------`);
  console.log(`=============================================================\n`);
  return 'SIMULATED_MSG_ID';
}

module.exports = {
  sendOrderEmail,
  sendContactEmail,
  sendWhatsAppNotification
};
