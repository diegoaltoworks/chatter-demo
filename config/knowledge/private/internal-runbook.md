# SoleStride Operations Runbook

**INTERNAL USE ONLY - Operations, Management, and Technical Teams**

## Emergency Contacts

### Critical Issues (24/7 Hotline)
**Operations Emergency:** 1-800-555-0199

### Department Heads
- **CEO:** Maya Chen (maya.chen@solestride.com, 503-555-0101)
- **COO:** David Rodriguez (david.rodriguez@solestride.com, 503-555-0102)
- **VP Operations:** Maria Rodriguez (maria.rodriguez@solestride.com, 503-555-0103)
- **VP Marketing:** Sarah Kim (sarah.kim@solestride.com, 503-555-0104)
- **VP Product:** James Wilson (james.wilson@solestride.com, 503-555-0105)
- **CFO:** Linda Park (linda.park@solestride.com, 503-555-0106)

### After-Hours On-Call Rotation
Check Slack #operations-oncall for current week's contact

---

## Website & E-Commerce Issues

### Site Down (solestride.com not loading)

**Severity:** CRITICAL

**Immediate Actions:**
1. Check status page: status.solestride.com
2. Contact IT Emergency: support@solestride.com or 1-800-555-0197
3. Post update on social media within 15 minutes
4. Activate incident response team

**Incident Commander:** VP of Operations

**Communication Team:**
- Customer Service (handle incoming inquiries)
- Social Media (status updates every 30 minutes)
- PR (if downtime exceeds 2 hours)

**Last Incident:** April 2024 (AWS outage, 3-hour downtime)

---

### Checkout/Payment Processing Failure

**Severity:** CRITICAL

**Symptoms:**
- Customers can't complete orders
- Payment gateway errors
- Orders stuck in pending

**Immediate Actions:**
1. Test checkout yourself to confirm
2. Check Stripe dashboard: dashboard.stripe.com/solestride
3. Contact Stripe support: 1-888-926-2289
4. If Stripe is down: Activate backup payment processor (PayPal)
5. Post banner on site: "We're experiencing checkout issues. Please try again in 30 minutes or contact support."

**Escalation:**
- If not resolved in 15 minutes → Alert VP Operations
- If not resolved in 1 hour → Alert COO and CFO

**Estimated Revenue Loss:** ~$15,000 per hour during peak times

---

### Inventory Sync Issues

**Symptom:** Product shows in stock on website but actually sold out

**Severity:** HIGH

**Immediate Actions:**
1. Identify affected SKUs
2. Manually mark as "Out of Stock" on Shopify admin
3. Cancel any orders that can't be fulfilled
4. Offer affected customers:
   - Wait for restock (provide ETA)
   - Switch to alternative product (free shipping upgrade)
   - Full refund + 15% off next order

**Root Cause Check:**
- NetSuite <> Shopify integration
- Check last sync time
- Contact IT if sync hasn't run in 1+ hour

**IT Contact:** Sarah Chen (sarah.chen@solestride.com)

---

## Manufacturing Disruptions

### Supplier Delay (Missing Production Deadline)

**Severity:** Varies by volume

**When Supplier Reports Delay:**
1. Assess impact:
   - How many pairs affected?
   - What SKUs?
   - Current stock levels?
   - Will we stock out?
2. Calculate revenue risk
3. Explore solutions:
   - Can another facility cover?
   - Can we air freight to meet deadline?
   - Accept delay and communicate to customers?

**Decision Tree:**
- **<1000 pairs, non-critical SKU** → Accept delay
- **>1000 pairs, critical SKU** → Consider air freight or alternative supplier
- **>5000 pairs** → Escalate to COO

**Communication:**
- If stockout expected: Email customers with pending orders
- Offer: Wait with 10% discount OR switch products OR cancel

**Last Major Incident:** June 2024 Vietnam flooding (15,000 pair delay, cost $85k in air freight)

---

### Quality Failure (Defective Batch)

**Severity:** CRITICAL if safety issue, HIGH if quality issue

**Triggers:**
- Supplier reports defect before shipping
- Warehouse finds defects during receiving
- Multiple customer complaints about same issue
- Internal quality audit failure

**Immediate Actions:**
1. **STOP SHIPMENT** - Hold all inventory from affected batch
2. Quarantine affected units
3. Notify Quality Team: quality@solestride.com
4. Assess scope:
   - How many pairs affected?
   - Already shipped to customers?
   - Nature of defect (safety vs. cosmetic)?

**Decision Matrix:**

**Safety Issue (sole separation, choking hazard, chemical):**
- IMMEDIATE recall
- Alert legal team
- Contact all affected customers
- Offer full refund + replacement
- Escalate to CEO and COO immediately

**Quality Issue (cosmetic defects, minor performance):**
- If in warehouse: Reject batch, return to supplier
- If shipped: Proactive outreach, offer replacement or refund
- Discount and sell through outlet if minor

**Recent Example:** March 2024 lace defect (8,000 pairs) - cost $96k

---

## Customer Service Escalations

### Social Media Crisis

**Definition:** Negative post goes viral (10k+ engagements)

**Severity:** CRITICAL

**Immediate Actions (Within 30 Minutes):**
1. Screenshot and document
2. Alert Social Media Manager, PR, and CMO
3. Assess: Is criticism valid?
4. Draft response (CEO approval for serious issues)
5. Respond publicly with action plan

**Response Framework:**
1. Acknowledge the issue
2. Apologize if we're at fault
3. Explain what we're doing to fix it
4. Provide timeline
5. Offer to resolve privately

**Do NOT:**
- Delete comments (makes it worse)
- Argue or get defensive
- Ignore it (silence = guilt)

**Recent Example:** May 2024 sustainability claim questioned on TikTok (2M views)
- Response: Published full manufacturing audit within 48 hours
- Outcome: Positive coverage, increased trust

---

### High-Profile Customer Issue

**Definition:** Complaint from influencer, celebrity, or journalist

**Severity:** HIGH

**Immediate Actions:**
1. Alert PR team IMMEDIATELY
2. Resolve issue within 1 hour (empower CS to do whatever needed)
3. Follow up personally from executive team
4. Send thank you package

**Do NOT:** Give special treatment that's unfair to regular customers
**DO:** Resolve quickly and professionally

---

## Supply Chain Disruptions

### Shipping Delays (Port Congestion, Customs)

**Monitoring:** Track shipments in Flexport dashboard

**Thresholds:**
- **+3 days delay:** Monitor
- **+7 days delay:** Investigate alternatives
- **+14 days delay:** Escalate, consider air freight

**Recent Example:** December 2023 LA port congestion (+21 days)
- Solution: Diverted 30% of shipments to Seattle port
- Cost: $45k additional freight

---

### Raw Material Shortage

**Early Warning Signs:**
- Supplier mentions allocation
- Price increases
- Industry news about shortages

**Actions:**
1. Secure current orders with deposits
2. Explore alternative suppliers
3. Adjust production schedule
4. Consider material substitutions

**Critical Materials:**
- Ocean plastic (limited supply)
- AlgaeFoam™ (exclusive supplier)
- Merino wool (seasonal availability)

---

## IT & Security

### Data Breach

**Severity:** CRITICAL

**If Customer Data Compromised:**
1. Immediately alert Security team: security@solestride.com
2. Activate Incident Response Team
3. Engage legal counsel
4. Contain breach (isolate systems)
5. Assess scope (what data, how many customers)
6. Notify customers within 72 hours (legal requirement)
7. Offer credit monitoring (via Identity Guard)

**Escalation:** CEO, CFO, Legal, PR must be looped in immediately

**Insurance:** Cyber insurance policy covers up to $5M

---

### Payment Processing Fraud

**Symptoms:**
- Unusual order patterns
- High-value orders to freight forwarders
- Multiple orders, same billing, different shipping
- Orders from high-risk countries

**Automated:** Signifyd handles most fraud detection

**Manual Review Required:**
- Orders >$1,000
- International orders >$500
- Flagged by Signifyd

**When in Doubt:** Cancel and refund (better safe than sorry)

---

## Seasonal Operations

### Black Friday / Cyber Monday Prep

**Timeline:**
- **T-60 days:** Finalize promo strategy
- **T-45 days:** Build inventory to 150% of forecast
- **T-30 days:** Brief all teams
- **T-14 days:** Load test website
- **T-7 days:** Double check inventory
- **T-1 day:** All-hands prep meeting

**Staffing:**
- Customer Service: 2x normal staff
- Warehouse: Extend hours to 24/5
- IT: On-call all weekend
- Executives: Available for escalations

**Last Year (2023):**
- Revenue: $4.2M over 4 days (18% of Q4)
- Orders: 28,400
- Website uptime: 99.97%
- Customer complaints: 0.8% (below 1% target)

---

### Holiday Shipping Deadlines

**Publicize These Dates (Update Annually):**
- Standard Shipping: December 16
- Express Shipping: December 20
- Overnight Shipping: December 22

**Communication:**
- Email blast: December 1
- Website banner: December 1-22
- Social media: Weekly reminders

**Late Orders:**
- Don't promise impossible dates
- Offer refund if we can't deliver
- Consider offering digital gift cards

---

## Product Launches

### New Product Launch Checklist

**T-90 Days:**
- [ ] Finalize product specs
- [ ] Order inventory (first batch)
- [ ] Create marketing assets
- [ ] Train customer service on product

**T-60 Days:**
- [ ] Set up Shopify product page
- [ ] Create size guide
- [ ] Film product videos
- [ ] Plan influencer seeding

**T-30 Days:**
- [ ] Receive inventory
- [ ] QA test samples
- [ ] Finalize pricing
- [ ] Set up email campaigns

**T-7 Days:**
- [ ] Soft launch to email list
- [ ] Monitor initial reviews
- [ ] Adjust messaging based on feedback

**Launch Day:**
- [ ] Publish product page
- [ ] Send email announcement
- [ ] Social media push
- [ ] Monitor for issues
- [ ] CS team ready for questions

**T+7 Days:**
- [ ] Review sales vs. forecast
- [ ] Gather customer feedback
- [ ] Adjust inventory orders
- [ ] Document lessons learned

---

## Financial Operations

### Month-End Close

**Timeline:** Close books by 5th business day of following month

**Responsibilities:**
- Finance Team: Reconcile accounts
- Operations: Confirm inventory values
- Sales: Verify revenue recognition
- HR: Confirm payroll expenses

**Key Reports:**
- P&L Statement
- Balance Sheet
- Cash Flow Statement
- Inventory Valuation

**Distribution:** Board of Directors, Executive Team

---

### Cash Flow Monitoring

**Weekly Cash Position Review:** Every Monday 9 AM PT

**Red Flags:**
- Cash below $2M (minimum operating reserve)
- Days of inventory >90
- AR aging >60 days

**Actions:**
- Accelerate collections
- Delay non-critical payments
- Draw on line of credit if needed

**Current LOC:** $10M with Wells Fargo (currently $2.5M drawn)

---

## Compliance & Legal

### Sustainability Claims (Avoid Greenwashing)

**Rules:**
- Only claim what we can prove
- Have third-party verification
- Don't exaggerate ("eco-friendly" vs "most sustainable")
- Disclose limitations

**Approved Claims:**
- "Carbon neutral certified" (we are)
- "Made with recycled materials" (specify %)
- "B Corp Certified" (we are)

**Not Approved:**
- "100% sustainable" (nothing is)
- "Saves the planet" (too broad)
- "Zero environmental impact" (impossible)

**Review:** Legal and Sustainability teams approve all claims

---

### Labor Compliance

**Audits:**
- All facilities audited annually
- Third-party auditor (Bureau Veritas)
- Unannounced visits

**Non-Negotiable:**
- No child labor
- No forced labor
- Living wages (minimum 150% local minimum)
- Safe working conditions
- Freedom to unionize

**If Violation Found:**
- Immediate corrective action plan
- Re-audit in 90 days
- Terminate supplier if not corrected

---

## Contacts & Systems

### Key Systems
- **Website:** Shopify (shopify.solestride.com/admin)
- **Inventory:** NetSuite ERP
- **CRM:** Salesforce
- **Customer Service:** Zendesk, Gorgias
- **Email:** Klaviyo
- **Accounting:** QuickBooks Online
- **HR:** BambooHR

### System Status
- Status page: status.solestride.com
- Slack: #system-status for real-time updates

### IT Support
- **Email:** support@solestride.com
- **Phone:** 1-800-555-0197
- **Emergency (After Hours):** On-call engineer via PagerDuty

---

## Documentation

**Where to Find:**
- Operational procedures: Google Drive > Operations
- Product specs: Google Drive > Product
- Marketing assets: Google Drive > Marketing
- HR policies: BambooHR > Documents

**Update This Runbook:**
- Review quarterly
- Owner: VP of Operations
- Submit updates via Slack #operations or email operations@solestride.com

---

**Last Updated:** July 2024
**Next Review:** October 2024
