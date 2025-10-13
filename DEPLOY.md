# Vercel Deployment Instructions

## Prerequisites
1. **Install Vercel CLI** (already done):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```
   - Visit the URL shown in the terminal
   - Complete the authentication process

## Deployment Steps

### Option 1: Deploy from Local Directory
1. Navigate to your project directory:
   ```bash
   cd /Users/crysource/Projects/All-Ai/21-KanomMa--hello-world
   ```

2. Deploy to Vercel:
   ```bash
   vercel --prod
   ```

3. Follow the prompts to:
   - Link to your Vercel account
   - Set up the project
   - Deploy to production

### Option 2: Deploy from GitHub Repository
1. **Connect GitHub to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository: `Soul-Brews-Hub/21-KanomMa--hello-world`
   - Vercel will automatically detect it's a React/Vite project

2. **Configure Build Settings**:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

3. **Deploy**:
   - Vercel will automatically build and deploy
   - Each push to main branch will trigger auto-deployment

## Project Configuration

The project is already configured for Vercel deployment:

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Development Command**: `npm run dev`
- **Install Command**: `npm install`

## Environment Variables (if needed)
If you need environment variables in the future:
1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add your variables

## Deployment Verification

After deployment, verify:
- [ ] Counter functionality works
- [ ] Keyboard shortcuts work (arrow keys, R)
- [ ] Responsive design works on mobile
- [ ] Animations are smooth
- [ ] No console errors

## Custom Domain (Optional)
1. Go to your Vercel project dashboard
2. Navigate to Settings → Domains
3. Add your custom domain

## Support
If you encounter any issues:
- Check the Vercel logs in the dashboard
- Run `vercel logs` to view deployment logs
- Ensure all dependencies are properly installed

---

## Quick Deploy Commands

```bash
# After logging in:
vercel --prod

# For development deployment:
vercel

# View deployment logs:
vercel logs
```

The application will be available at a `.vercel.app` URL after successful deployment.