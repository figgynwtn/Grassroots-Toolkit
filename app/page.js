import Link from 'next/link'
import { Mail, Calendar, ArrowRight, Star, Zap, Users, Sparkles, Smartphone } from 'lucide-react'

export default function Home() {
  const tools = [
    {
      name: 'Email Builder',
      description: 'Create beautiful, effective email templates for your campaigns with our intuitive drag-and-drop interface',
      href: '/email-builder',
      icon: Mail,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      hoverColor: 'hover:border-blue-300',
    },
    {
      name: 'Rally Generator',
      description: 'Build engaging rally pages with drag-and-drop components that convert visitors into supporters',
      href: '/rally-generator',
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      hoverColor: 'hover:border-green-300',
    },
  ]

  const features = [
    {
      name: 'Easy to Use',
      description: 'Intuitive interface that requires no technical skills',
      icon: Star,
    },
    {
      name: 'Fast Results',
      description: 'Create professional content in minutes, not hours',
      icon: Zap,
    },
    {
      name: 'Community Focused',
      description: 'Designed specifically for grassroots organizations',
      icon: Users,
    },
    {
      name: 'Mobile Friendly',
      description: 'All templates work perfectly on phones and tablets',
      icon: Smartphone,
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl mb-6">
              <span className="block">Grassroots Digital</span>
              <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Organizing Toolkit
              </span>
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Powerful tools designed to help nonprofits and community organizations amplify their message, 
              engage supporters, and drive meaningful change.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/email-builder"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-lg text-white bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 transform hover:-translate-y-0.5"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/rally-generator"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 shadow-sm"
              >
                Explore Tools
              </Link>
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Our Tools</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"> {/* Changed to 4 columns */}
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <div key={feature.name} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600 mb-4">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.name}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p> {/* Added text-sm for better fit */}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Tools Grid - Centered with 2 columns */}
          <div className="flex justify-center">
            <div className="grid gap-8 md:grid-cols-2 max-w-4xl">
              {tools.map((tool) => {
                const Icon = tool.icon
                return (
                  <div key={tool.name} className={`flex flex-col overflow-hidden rounded-2xl shadow-lg border ${tool.borderColor} ${tool.hoverColor} transition-all duration-200 hover:shadow-xl transform hover:-translate-y-1`}>
                    <div className={`flex-shrink-0 ${tool.bgColor} p-8 flex justify-center`}>
                      <div className="bg-white p-4 rounded-full shadow-inner">
                        <Icon className={`h-12 w-12 ${tool.color}`} aria-hidden="true" />
                      </div>
                    </div>
                    <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                      <div className="flex-1">
                        <Link href={tool.href} className="block mt-2">
                          <p className="text-xl font-semibold text-gray-900 text-center mb-3">{tool.name}</p>
                          <p className="mt-3 text-base text-gray-600 text-center leading-relaxed">{tool.description}</p>
                        </Link>
                      </div>
                      <div className="mt-6 text-center">
                        <Link
                          href={tool.href}
                          className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500 group"
                        >
                          Start building
                          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Footer - positioned at bottom */}
      <footer className="mt-auto border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-1.5 rounded-md">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-semibold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Grassroots Toolkit
              </span>
            </div>
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Grassroots Digital Organizing Toolkit. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}