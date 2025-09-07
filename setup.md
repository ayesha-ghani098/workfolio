# Setup Instructions

## EmailJS Configuration

1. **Create EmailJS Account**

   - Visit [EmailJS](https://www.emailjs.com/)
   - Sign up for a free account

2. **Add Email Service**

   - Go to Email Services
   - Add your email provider (Gmail, Outlook, etc.)
   - Note the Service ID

3. **Create Email Template**

   - Go to Email Templates
   - Create a new template
   - Use variables: `{{from_name}}`, `{{from_email}}`, `{{subject}}`, `{{message}}`
   - Note the Template ID

4. **Get Public Key**

   - Go to Account → API Keys
   - Copy your Public Key

5. **Create .env file**
   Create a `.env` file in the root directory with:
   ```
   VITE_EMAILJS_SERVICE_ID=your_service_id_here
   VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
   VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
   ```

## Content Customization

1. **Update Personal Info**

   - Edit `content/site-data.json`
   - Replace placeholder content with your information

2. **Replace Media Placeholders**

   - Replace `[DEMO]` with actual video URLs
   - Replace `[IMAGE: description]` with actual image URLs
   - Update contact information

3. **Update Links**
   - Change Topmate URL to your profile
   - Update GitHub and LinkedIn links

## Installation Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```
