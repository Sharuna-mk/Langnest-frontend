import React from 'react'



function Footer() {
  return (
    <>
  <footer class="bg-gray-950 text-gray-300 py-12">
  <div class="max-w-7xl mx-auto px-6">

    <div class="grid grid-cols-1 md:grid-cols-5 gap-8">

      <div class="md:col-span-2">
        <h2 class="text-white text-2xl font-semibold">Langnest</h2>
        <p class="mt-3 text-sm text-gray-400 leading-relaxed">
        A collaborative developer platform that helps you to
        work together, learn together, and grow as a developer.
      </p>
      </div>

      <div>
        <h3 class="text-white font-semibold mb-3">Product</h3>
        <ul class="space-y-2 text-sm">
          <li><a class="hover:text-white">Features</a></li>
          <li><a class="hover:text-white">Security</a></li>
          <li><a class="hover:text-white">Integrations</a></li>
        </ul>
      </div>

      <div>
        <h3 class="text-white font-semibold mb-3">Developers</h3>
        <ul class="space-y-2 text-sm">
          <li><a class="hover:text-white">Docs</a></li>
          <li><a class="hover:text-white">API</a></li>
          <li><a class="hover:text-white">Changelog</a></li>
        </ul>
      </div>

      <div>
        <h3 class="text-white font-semibold mb-3">Support</h3>
        <ul class="space-y-2 text-sm">
          <li><a class="hover:text-white">Help Center</a></li>
          <li><a class="hover:text-white">Contact</a></li>
          <li><a class="hover:text-white">Feedback</a></li>
        </ul>
      </div>

    </div>

    <div class="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between text-sm text-gray-500">
      <p>© 2025 Langnest. All rights reserved.</p>
      <div class="flex gap-6 mt-4 md:mt-0">
        <a class="hover:text-white">Privacy Policy</a>
        <a class="hover:text-white">Terms</a>
      </div>
    </div>

  </div>
</footer>



    </>
  )
}

export default Footer
