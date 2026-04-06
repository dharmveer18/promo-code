1. The Smart Submission Flow (User Experience)

These features reduce "friction," making it as easy as possible for a user to share a deal.
Metadata Scraper (OpenGraph/Parsing):Automated Image Fetching: Grabbing the high-res product image via <meta property="og:image">.

Mandatory Deal Metadata : Forcing users to provide Store, Price, and Expiry (to keep data clean).

Affiliate Link Injection : The logic that automatically strips a user's link and replaces it with the site's own monetized ID.

Strict Disclosure: If a user is associated with a store, they must tick a "I am associated with this merchant" box, or they risk a permanent ban.

Price Parsing: Using regex or specific site scrapers to find the currency and price value automatically so the user doesn't have to type it.

Archive/Expired Automation: Deals are automatically moved to the "Expired" section based on the expiry date or if enough users click a "Mark as Expired" button.

"Local" Tags & GPS: Using geolocation to tag deals to specific physical stores (e.g., a "Clearance" alert specifically for the Woolworths in Hoppers Crossing or Truganina).
Categorization of Offers: Distinguishing between standard deals and "Rebates" or "Credit Card Offers" (which usually require extra steps like "Cashback" or "Points").

Merchant Talk: A dedicated forum section where stores can discuss their upcoming sales or defend themselves against community criticism.

Mobile: fully native app with haptic feedback and swipe-to-vote gestures.


2. The Trust & Security Engine (Backend Logic)

These features protect the platform’s integrity and prevent it from being overrun by marketers.
Anti-Spam Strategy:
Domain Blacklisting: A "deny-list" of low-quality or predatory affiliate sites that are blocked at the submission level.
Reputation System (Karma-Gating): Restricting users from posting deals from "High-Value" domains (like Amazon or eBay) until they have earned enough community trust/upvotes.
Live Update Counters: Tracking active viewers in real-time. This serves two purposes: identifying bot spikes (security) and creating FOMO (social proof).

Weighted Voting: Not all votes are equal. The more "Karma" a user has, the more their vote matters.

The "Front Page" Algorithm: A deal doesn't just go to the front page based on time; it needs a specific velocity of upvotes (usually +25 to +50) within a short window.

The Penalty Box: Users who post low-quality deals or break rules are "timed out," losing the ability to post or comment for set periods.

IP/Fingerprint Tracking : Advanced backend detection to stop "sock-puppet" accounts.

The Deal Specialist Funnel/staff editors: They vet deals for price history and merchant reliability before "promoting" them to the Frontpage

3. Community Engagement & Gamification

These features define how users interact with the content and each other.
Degrees (Hot/Cold) System: Moving beyond the binary $+/-$ to a "Temperature" model. The "Degrees" ($\text{temp } ^\circ\text{C}$) rise as a deal gets popular, providing better visual feedback than simple numbers.

Weighted Voting: Logic where a vote from a "Senior" member counts more toward the "Front Page" than a new user's vote.

The "Personalized Feed": A "For You" section that uses basic machine learning to prioritize categories a user clicks on frequently (e.g., if they always click "Tech," show Tech deals first).
Deal of the Day: A curated or top-voted "Hero" deal that is pinned to the top of the UI for 24 hours.

Front Page Algorithm : Logic that calculates "velocity" (how fast votes come in) to promote a deal.

The Penalty Box : A "time-out" system for users who post spam or low-quality content.

4. Retention & Notification Infrastructure

These features ensure users keep coming back to the site.

Deal Alerts:Custom Alerts: Users can save specific keywords (e.g., "Air Fryer") and get notified when a match is posted.

Alert Matches: A dedicated dashboard for users to manage their active notifications.
Keyword Alerts: Users set triggers for "RTX 4080" or "Nespresso pods." When a deal is posted with those words, they get an instant email or push notification.

Brand/Merchant Following: Allowing users to "Subscribe" to specific stores (e.g., Apple or JB Hi-Fi) to see a dedicated feed of those updates.
Price History: 
    a) Providing a historical view of what the item cost in the past. This is the ultimate tool for community "policing" to see if a discount is genuine.

    b) User-Generated: While they don't have an automated graph like CamelCamelCamel, the community "polices" prices in the comments by linking to previous deals to prove if the current "sale" is actually a good price.
    c) Automated Price Tracking: Integrating a real-time price tracker (like PriceHipster) directly into the deal submission would be a massive UX win.

RSS Feeds: Every category, search result, and user profile has its own RSS feed, allowing power users to pipe deals into Discord or custom apps.

Minimum Rating: "Only alert me if the deal is +20 rating."

5. Collaborative Knowledge:

This category was created specifically because OzBargain operates like a Wiki, which modern sites often ignore.

Collaborative Wiki Editing : Allowing the community to fix typos or update expired coupons in a post.

Merchant Representative Accounts : Official badges and rules for brand owners accounts.
Modern Search:Semantic/Voucher Database : A separate section just for generic store-wide discount code