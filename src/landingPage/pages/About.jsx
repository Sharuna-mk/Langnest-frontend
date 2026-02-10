import React from 'react'
import hero from '../../assets/Hero.png'
import about from '../../assets/about1.png'
import { Link } from 'react-router-dom'

function About() {
  return (
    <>


      <section className="w-full text-white bg-[#010336]">

     
        <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-10 items-center">

          <div>
            <h1 className="appear text-4xl md:text-5xl font-bold leading-tight">
              Building the Future of Development
            </h1>
            <p className="appear text-gray-300 mt-4 text-lg">
              Langnest is a modular, collaborative platform designed for developers to explore, learn, and build using their favorite programming languages and tech stacks.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="relative w-75 h-75  
                          rounded-xl  ">
                            <img src="https://tse3.mm.bing.net/th/id/OIP.EH-jOtgy6S7Bhy4OpResHwAAAA?w=360&h=360&rs=1&pid=ImgDetMain&o=7&rm=3" alt="" className='rounded-full absolute pt-10' />
            </div>
          </div>

        </div>

        {/* WHAT IS LANGNEST */}
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12">

          <div>
            <h2 className=" anim text-3xl font-semibold">What is Langnest?</h2>
            <p className="anim text-gray-300 mt-4 text-lg leading-relaxed">
              Langnest is a modern developer hub built to simplify learning, building, and collaborating across multiple tech stacks.
              <br />
              <p className='anim'>It brings curated resources, smart tools, and community-driven insights into one unified platform.</p>
              <br />
        <p className='anim'>Whether you're a beginner or an expert, Langnest helps you grow faster with structured guidance and practical workflows.</p>
              <br />
            </p>

            <div className="anim mt-6 grid grid-cols-2 gap-4">
              <div className="anim p-4 bg-white/5 border border-white/10 rounded-lg text-center">
               🔍 Intelligent Stack Finder
              </div>
              <div className="anim p-4 bg-white/5 border border-white/10 rounded-lg text-center">
                👥 Collaborative Developer Hub
              </div>
              <div className="anim p-4 bg-white/5 border border-white/10 rounded-lg text-center">
                🎯 Adaptive Skill Pathways

              </div>
              <div className="anim p-4 bg-white/5 border border-white/10 rounded-lg text-center">
🛡️ Trusted & Safe Infrastructure
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <div className="anim w-full h-64 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 
                          rounded-xl border border-white/10 backdrop-blur">
                            <img src="https://tse3.mm.bing.net/th/id/OIP.sNpXAny-MysN6Qsw91NIeQHaGa?w=626&h=542&rs=1&pid=ImgDetMain&o=7&rm=3" alt="" />
            </div>
          </div>

        </div>

        <div className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="anim block text-3xl font-semibold text-center">
            Why Developers Choose Langnest
          </h2>

          <div className="anim block mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="p-6 bg-white/5 border border-white/10 rounded-xl 
                          hover:bg-white/10 transition">
              <h3 className="font-semibold text-lg">Developer Resource Hub</h3>
              <p className="text-gray-300 mt-2">Access cheatsheets, examples, and best practices in one place.</p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-xl 
                          hover:bg-white/10 transition">
              <h3 className="font-semibold text-lg">Language-Centric Workspace</h3>
              <p className="text-gray-300 mt-2">
                Organized, structured, and easy to explore.
              </p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-xl 
                          hover:bg-white/10 transition">
              <h3 className="font-semibold text-lg">Collaborative Language Notes</h3>
              <p className="text-gray-300 mt-2">
               Share notes, tips, and shortcuts for each language.
              </p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-xl 
                          hover:bg-white/10 transition">
              <h3 className="font-semibold text-lg">Team Collaboration</h3>
              <p className="text-gray-300 mt-2">
                Join or create micro-groups to learn a language together.
              </p>
            </div>

          </div>
        </div>

        {/* HOW LANGNEST WORKS */}
        <div className="anim block max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-semibold text-center">How Langnest Works</h2>

          <div className="mt-12 grid md:grid-cols-5 gap-6 text-center">

            <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
              <h4 className="font-semibold">1. Choose Your Language</h4>
              <p className="text-gray-300 text-sm mt-2">Start by picking any programming language.</p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
              <h4 className="font-semibold">2. Access Curated Resources</h4>
              <p className="text-gray-300 text-sm mt-2">Explore quick guides, examples, and community tips.</p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
              <h4 className="font-semibold">3. Collaborate & Share</h4>
              <p className="text-gray-300 text-sm mt-2">Discuss snippets, share insights, and learn together.</p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
              <h4 className="font-semibold">4. Build Your Knowledge</h4>
              <p className="text-gray-300 text-sm mt-2">Follow learning paths and improve through  practice.</p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
              <h4 className="font-semibold">5. Grow With the Community</h4>
              <p className="text-gray-300 text-sm mt-2">Contribute to language hubs.</p>
            </div>

          </div>
        </div>

        {/* WHO IS IT FOR */}
        <div className="anim block max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-semibold text-center">Who Is Langnest For?</h2>

          <div className="mt-12 grid md:grid-cols-3 gap-6">

            <div className="p-6 bg-white/5 border border-white/10 rounded-xl text-center">
              👩‍💻 Frontend Devs
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-xl text-center">
              🧑‍💻 MERN Stack Devs
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-xl text-center">
              🚀 Startup Teams
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-xl text-center">
              🎓 Students
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-xl text-center">
              🧠 Hackathon Builders
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-xl text-center">
              🤝 Collaborating Teams
            </div>

          </div>
        </div>

        {/* MISSION */}
        <div className=" block max-w-5xl mx-auto px-6 py-20 text-center">
          <h2 className="anim text-3xl font-semibold">Our Mission</h2>
          <p className="anim text-gray-300 mt-4 leading-relaxed text-lg">
            To empower developers worldwide by providing a collaborative, language-driven platform that simplifies learning, accelerates project-building, and fosters community growth.
          </p>
        </div>

        <div className="py-20 bg-gradient-to-r from-blue-600/10 to-purple-600/10 text-center">
          <h2 className="text-3xl font-bold">We’re Redefining How Developers Learn and Build</h2>
          <p className="text-gray-300 mt-2">
            From choosing a language to mastering it, collaborating, and creating projects, everything happens inside Langnest.
          </p>
          <div className="mt-5">
          <Link to={'/login'} className="mt-6 px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold">
            Get Started  
          </Link>
          </div>
        </div>

      </section>


    </>
  )
}

export default About
