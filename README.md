# Subscription Automation Script

An automation script that demonstrates reverse engineering and automation of subscription management workflows for streaming services. This project showcases the ability to handle secure authentication and automate subscription-related actions using Playwright.

## 🎯 Project Overview

This script was developed as part of a reverse engineering demo task to demonstrate the ability to:
- Reverse engineer subscription management workflows
- Handle secure authentication mechanisms
- Automate subscription plan changes and cancellations
- Work across different environments using proxy/VPN

## 🛠️ Technical Stack

- **Node.js**: Runtime environment
- **Playwright**: Browser automation framework
- **Chromium**: Headless browser for automation

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- A modern web browser (Chrome/Chromium recommended)

## 🚀 Installation

1. Clone the repository:
```bash
git clone https://github.com/devshoaibsarwar/subscription-automation-script.git
cd subscription-automation-script
```

2. Install dependencies:
```bash
npm install
```

## 💻 Usage

1. Configure your environment:
   - Update the target URL in `main.js`
   - Modify the form fields according to your needs

2. Run the script:
```bash
node main.js
```

## 🔍 Features

- Automated subscription management
- Network request tracking and logging
- Cookie and local storage management
- Cross-environment compatibility
- Secure authentication handling

## 📝 Output Files

The script generates several output files:
- `network_calls.txt`: Logs of all intercepted network requests
- `cookies.json`: Session cookies data
- `local_storage.json`: Local storage data

## 🔒 Security Considerations

- The script handles secure authentication mechanisms
- Session management is properly implemented
- Sensitive data is handled securely
- Cross-environment testing is supported

## 📚 Documentation

The script includes detailed comments explaining:
- Network request tracking
- Form submission process
- Authentication handling
- Data collection methods
