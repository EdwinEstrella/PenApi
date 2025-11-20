#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const managerDistPath = path.join(__dirname, '..', 'PenManager', 'dist');
const managerIndexPath = path.join(managerDistPath, 'index.html');

console.log('🚀 Starting PenApi...\n');

// Check if manager is built
if (!fs.existsSync(managerIndexPath)) {
  console.log('📦 Manager not found. Building manager...');
  try {
    process.chdir(path.join(__dirname, '..', 'PenManager'));
    execSync('npm install', { stdio: 'inherit' });
    execSync('npm run build', { stdio: 'inherit' });
    process.chdir(path.join(__dirname, '..'));
    console.log('✅ Manager built successfully!\n');
  } catch (error) {
    console.error('❌ Error building manager:', error.message);
    process.exit(1);
  }
} else {
  console.log('✅ Manager already built\n');
}

// Start the API server
console.log('🌐 Starting API server...\n');
try {
  process.chdir(path.join(__dirname, '..'));
  execSync('npm run start:api', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Error starting server:', error.message);
  process.exit(1);
}

