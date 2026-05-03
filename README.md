#  LangNest

LangNest brings developers together around programming languages and tech stacks. Users can create posts, share code, and collaborate in real time — with a subscription model that unlocks full platform access via Stripe, admin tooling for user management, and a live messaging system powered by Socket.IO.

##  Frontend
 
Built with **React.js**, **Tailwind CSS**, **React Router DOM**, **React Icons**, **Socket.IO Client**, **Cloudinary**, **bcryptjs**, and **Stripe.js**.

### Features
 
**Landing & Navigation**
- Modular landing page with Header, Hero, Features, Languages showcase, Banner, and Footer sections
- Responsive navigation with smooth React Router DOM links to Features, About, Login, and Signup
- Language showcase section highlighting supported programming languages and tech stacks
**Posts**
- Create, edit, delete, and report posts with a rich post editor
- Image uploads per post handled via Cloudinary (up to 3 images per free-tier user)
- Free users are limited to 3 posts and 3 images total — UI enforces limits with upgrade prompts
- Report post functionality with confirmation flow for community moderation
**User Profile**
- Edit profile details including display name, bio, avatar, and preferred languages
- Avatar upload integrated with Cloudinary via Multer on the backend
- View personal post history, subscription status, and usage stats
**Real-Time Messaging**
- Live one-to-one messaging powered by Socket.IO client
- Online presence indicators and read receipts
- Message thread UI with real-time delivery and auto-scroll
**Subscription & Billing**
- Stripe-powered subscription flow — free and paid tiers
- Free tier: 3 posts and 3 images per user, upgrade prompt on limit reached
- Paid subscribers unlock unlimited posts, images, and premium features
- Billing history and plan management page
**Admin Dashboard**
- View all registered users with filtering and search
- Remove or suspend users directly from the admin panel
- Billing overview across all subscribers
- Analytics charts showing user growth, post activity, and subscription conversion
