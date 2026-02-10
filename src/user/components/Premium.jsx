import { useEffect, useState } from "react";
import premium from "../../assets/premium.png";
import { createCheckoutSessionAPI } from "../../services/allAPI";
import { loadStripe } from '@stripe/stripe-js';

function Premium() {
  const [token, setToken] = useState('')

  const handleUpgrade = async () => {

    const stripe = await loadStripe('pk_test_51SprxqLkpHaMMlZoEgLQXNbTMxG9HWqDcVA7jMmt1spaLewbxQ6ogT6PgzlHSPkEttFSzQJImqbrKwjalF7Opvwu00nwexmxgj');
    console.log(stripe);
    const reqHeader = {
      Authorization: `Bearer ${token}`
    }
    try {
      const response = await createCheckoutSessionAPI(reqHeader);
      console.log(response);
      console.log(response.data.session.url);
      const sesssionUrl = response.data.session.url
      if (response.status === 200) {
        window.location.href = sesssionUrl;
      }


    } catch (error) {
      console.log('error');

    }
  }

  useEffect(() => {
    setToken(sessionStorage.getItem("token"))
  }, [])
  return (
    <div className="w-250 text-black dark:text-white -ms-20 overflow-x-hidden">
      <div className="text-center mb-14">
        <img
          src={premium}
          alt="premium"
          className="w-16 h-16 mx-auto mb-4"
        />
        <h1 className="text-4xl font-bold">Upgrade to Premium</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-xl mx-auto">
          Get more control, visibility, and freedom with premium-only features
          designed for power users.
        </p>
      </div>


      <div className="grid md:grid-cols-3  gap-5 mb-20">
        {[
          {
            title: "Unlimited Uploads",
            desc: "Post as many images and content as you want without daily or monthly limits."
          },
          {
            title: "Premium Badge",
            desc: "Stand out in the community with a verified premium badge on your profile."
          },
          {
            title: "Priority Features",
            desc: "Get early access to upcoming features and improvements before others."
          },
          {
            title: "Faster Performance",
            desc: "Optimized uploads and faster content handling for premium users."
          },
          {
            title: "Enhanced Visibility",
            desc: "Your posts get better visibility and reach within the platform."
          },
          {
            title: "Future Benefits",
            desc: "More premium-only tools and customization options coming soon."
          }
        ].map((item, index) => (
          <div
            key={index}
            className="rounded-2xl p-6 bg-white dark:bg-cardPrimary-dark shadow-md hover:shadow-xl transition"
          >
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {item.desc}
            </p>
          </div>
        ))}
      </div>


      <div className="mb-20">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Why Go Premium?
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="p-6 rounded-2xl bg-gray-100 dark:bg-[#111928BF]">
            <h4 className="font-semibold mb-2">Built for serious users</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Premium is designed for users who want more flexibility,
              visibility, and power from the platform.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gray-100 dark:bg-[#111928BF]">
            <h4 className="font-semibold mb-2">Simple & transparent</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              One plan, one price. No hidden charges, no complicated tiers.
              Cancel anytime.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl p-[1px] bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500">
        <div className="rounded-3xl bg-white dark:bg-[#0f172a] p-10 text-center">
          <h2 className="text-3xl font-bold">₹199 / month</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Full access • Cancel anytime
          </p>

          <button
            onClick={handleUpgrade}
            className="mt-8 px-10 py-3 rounded-xl font-semibold text-white
            bg-gradient-to-r from-yellow-400 to-orange-500
            shadow-lg hover:scale-105 transition"
          >
            Upgrade Now
          </button>


          <p className="mt-4 text-xs text-gray-500">
            Secure payments • Powered by Stripe
          </p>
        </div>
      </div>

    </div>
  );
}

export default Premium;
