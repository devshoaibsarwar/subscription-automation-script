const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    let requests = [];

    const trackRequests = () => {
        // Track all network requests and responses
        page.on('request', request => {
            if (['POST', 'PUT', 'GET'].includes(request.method())) {
                requests.push({
                    url: request.url(),
                    method: request.method(),
                    headers: request.headers(),
                    postData: request.postData()
                });
            }
        });

        page.on('response', async response => {
            try {
                const req = response.request();
                if (['POST', 'PUT', 'GET'].includes(req.method())) {
                    const matchingReq = requests.find(r => r.url === req.url());
                    if (matchingReq) {
                        matchingReq.responseStatus = response.status();
                        matchingReq.responseHeaders = response.headers();
                        matchingReq.responseBody = await response.text();
                    }
                }
            } catch (e) {
                // ignore errors
            }
        });
    }
    // Go to your app
    await page.goto('http://localhost:3000/');

    trackRequests();


    //.................Input section
    // 1. Click the "Choose plan" button for "Single"
    await page.waitForTimeout(1000);
    await page.click('button:has-text("Choose plan")'); // Clicks the first "Choose plan" button

    // 2. Fill the modal form fields, with pauses
    await page.waitForTimeout(1000);
    await page.fill('input[placeholder="Name"]', 'Test User');
    await page.waitForTimeout(1000);
    await page.fill('input[placeholder="Email"]', 'testuser@example.com');
    await page.waitForTimeout(1000);
    await page.fill('input[placeholder="Phone Number"]', '1234567890');
    await page.waitForTimeout(1000);
    await page.fill('input[placeholder="Card Number"]', '4111111111111111');
    await page.waitForTimeout(1000);
    await page.fill('input[placeholder="CVV"]', '123');
    await page.waitForTimeout(1000);
    await page.fill('input[placeholder="Expiry (MM/YY)"]', '12/30');
    await page.waitForTimeout(1000);

    // 3. Click the Subscribe button in the modal
    await page.click('button:has-text("Subscribe")');

    // 4. Wait for toast or network call to finish
    await page.waitForTimeout(3000);

    // 5. If Unsubscribe button appears, click it
    const unsubscribeBtn = await page.$('button:has-text("Unsubscribe")');
    if (unsubscribeBtn) {
        await unsubscribeBtn.click();
        await page.waitForTimeout(2000);
    }

    //.........................................



    // Save the collected requests & responses & save it into the file
    let output = '--- Intercepted network calls AFTER button press ---\n';
    requests.forEach(req => {
        output += `URL: ${req.url}\n`;
        output += `Method: ${req.method}\n`;
        if (req.postData) output += `Payload: ${req.postData}\n`;
        output += `Status: ${req.responseStatus}\n`;
        output += `Response: ${req.responseBody?.slice(0, 200)}\n`; // truncate for brevity
        output += '---------------------------------\n';
    });

    fs.writeFileSync('network_calls.txt', output);




    // Get cookies
    const cookies = await page.context().cookies();
    fs.writeFileSync('cookies.json', JSON.stringify(cookies, null, 2));

    // Get local storage g
    const localStorageData = await page.evaluate(() => {
        const data = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            data[key] = localStorage.getItem(key);
        }
        return data;
    });

    // Write local storage data to a file
    fs.writeFileSync('local_storage.json', JSON.stringify(localStorageData, null, 2));

    // Close the browser
    await browser.close();
})();