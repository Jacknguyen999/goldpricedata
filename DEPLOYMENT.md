# 🚀 Deployment Instructions

## Quick Deploy to GitHub Pages

### Option 1: Automated PowerShell Script (Recommended for Windows)

Run this command in PowerShell:

```powershell
.\deploy.ps1 -RepositoryName "gold-price-tracker"
```

Or with your GitHub username:

```powershell
.\deploy.ps1 -RepositoryName "gold-price-tracker" -GitHubUsername "your-username"
```

### Option 2: Manual Git Commands

1. **Initialize Git repository**:

   ```bash
   git init
   git add .
   git commit -m "Initial commit: Gold price tracker website"
   ```

2. **Create repository on GitHub**:

   - Go to https://github.com/new
   - Repository name: `gold-price-tracker`
   - Make it **Public** (required for free GitHub Pages)
   - **Don't** initialize with README, .gitignore, or license

3. **Push to GitHub**:

   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/gold-price-tracker.git
   git branch -M main
   git push -u origin main
   ```

4. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: `main`
   - Folder: `/ (root)`
   - Click Save

## Expected Results

After deployment, your website will be available at:
`https://YOUR_USERNAME.github.io/gold-price-tracker`

## Troubleshooting

### Common Issues:

1. **CORS Errors**: The app uses a proxy service to handle CORS. If you see network errors, the proxy might be down.

2. **GitHub Pages not updating**:

   - Wait 5-10 minutes after enabling Pages
   - Check the Actions tab for deployment status
   - Ensure repository is public

3. **Authentication Issues**:

   - Use GitHub CLI: `gh auth login`
   - Or set up SSH keys: https://docs.github.com/en/authentication/connecting-to-github-with-ssh

4. **API Data not loading**:
   - Check browser console for errors
   - Verify the BTMC API is accessible
   - The proxy service might be temporarily unavailable

### PowerShell Execution Policy Error:

If you get an execution policy error, run:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## Features Included

✅ Responsive design for mobile and desktop  
✅ Real-time gold price fetching  
✅ Search and filter functionality  
✅ Auto-refresh every 5 minutes  
✅ Offline detection  
✅ Vietnamese language interface  
✅ Beautiful modern UI with hover effects

## Next Steps

After deployment:

1. Test the website on different devices
2. Monitor the browser console for any errors
3. Consider setting up a custom domain (optional)
4. Add Google Analytics for usage tracking (optional)

## Support

If you encounter issues:

1. Check the browser console for errors
2. Verify all files are correctly uploaded to GitHub
3. Ensure the repository is public
4. Wait a few minutes for GitHub Pages to update
