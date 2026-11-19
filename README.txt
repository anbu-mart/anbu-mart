ANBU MART – FREE ANDROID SHOPPING PWA
=====================================

WHAT THIS VERSION DOES
- Product catalogue with category filter and search
- Shopping cart with quantity controls
- Customer name, phone and delivery address form
- Sends order summary to WhatsApp +91 80151 76236
- INR prices
- Installable PWA with basic offline caching

IMPORTANT LIMITATIONS
- This starter app has sample products. Replace names, descriptions, prices and images in products.js.
- It does not have a shared cloud database, customer accounts, live inventory, automatic payment verification or an admin dashboard.
- Cart data is stored on the customer's device.
- Orders are sent to WhatsApp and are not automatically confirmed.
- Do not collect sensitive payment information in this app.

HOW TO PREVIEW
1. Extract the ZIP.
2. Open index.html in a browser for a basic preview. Product browsing and cart work; service-worker installation requires hosting over HTTPS or localhost.
3. For a proper PWA test, serve the folder locally using a local web server, or deploy it to GitHub Pages.

HOW TO ADD YOUR PRODUCTS
1. Open products.js in a text editor.
2. Replace the sample product entries with your real products.
3. Put product photos inside the assets folder, for example assets/space-kit.jpg.
4. Set the image field to "assets/space-kit.jpg".
5. Use a unique id for every product and enter price as a number (without ₹).

HOW TO USE YOUR REAL ANBU CRAFTS LOGO
The supplied Anbu Mart logo is installed as assets/logo.webp and the Android install icon is assets/icon.png. To change it later, replace these files with your artwork using the same filenames.

PUBLISH FREE USING GITHUB PAGES
1. Create/sign in to a GitHub account.
2. Create a new PUBLIC repository named anbu-mart.
3. Upload all extracted files and the assets folder to the repository root.
4. Open repository Settings > Pages.
5. Under Build and deployment, choose Deploy from a branch.
6. Select branch main and folder /(root), then Save.
7. Wait for GitHub Pages to publish. Your website address will look like https://YOUR-USERNAME.github.io/anbu-mart/
8. Open that HTTPS address on an Android phone in Chrome.
9. Tap the three-dot menu > Install app or Add to Home screen (wording varies).

UPDATING THE APP
After editing files, upload/commit the updated files to GitHub. If you change cached app files, change CACHE name in sw.js (for example anbu-mart-v2) so installed copies fetch the new version.

FREE HOSTING DOES NOT MEAN PLAY STORE PUBLISHING
GitHub Pages hosting is free for a public repository. Google Play Console has a separate developer registration fee and additional publishing requirements. This PWA can be installed directly from your website without Play Store.
