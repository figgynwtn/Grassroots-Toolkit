'use client'

import { useState } from 'react'
import { Download, Eye, Settings, Palette, Type, Building, MousePointer, Copy, Mail } from 'lucide-react'

export default function EmailBuilder() {
  const [template, setTemplate] = useState({
    layout: 'single-column',
    primaryColor: '#22c55e',
    font: 'sans-serif',
    organizationName: 'Our Organization',
    ctaText: 'Take Action Now',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  })

  const [showExportOptions, setShowExportOptions] = useState(false)

  const handleChange = (field, value) => {
    setTemplate(prev => ({ ...prev, [field]: value }))
  }

  const handleExport = (format) => {
    const emailHTML = generateEmailHTML()
    
    switch(format) {
      case 'download':
        downloadHTML(emailHTML, 'email-template.html')
        break
      case 'copy':
        copyToClipboard(emailHTML)
        break
      case 'email':
        shareViaEmail(emailHTML)
        break
      default:
        break
    }
    setShowExportOptions(false)
  }

  const generateEmailHTML = () => {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${template.organizationName}</title>
  <style>
    body { font-family: ${template.font}, sans-serif; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; }
    .header { text-align: center; color: ${template.primaryColor}; padding: 20px 0; }
    .content { padding: 20px; line-height: 1.6; color: #333; }
    .button { background-color: ${template.primaryColor}; color: white; padding: 12px 24px; 
              text-decoration: none; border-radius: 8px; display: inline-block; }
    .footer { padding: 20px; text-align: center; color: #666; font-size: 14px; border-top: 1px solid #eee; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${template.organizationName}</h1>
    </div>
    <div class="content">
      <p>${template.content}</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="#" class="button">${template.ctaText}</a>
      </div>
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} ${template.organizationName}. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`
  }

  const downloadHTML = (html, filename) => {
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      alert('HTML copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy: ', err)
      const textArea = document.createElement('textarea')
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      alert('HTML copied to clipboard!')
    }
  }

  const shareViaEmail = (html) => {
    const subject = `Email Template: ${template.organizationName}`
    const body = `Here's the HTML email template:\n\n${html}`
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const controlGroups = [
    {
      title: 'Layout & Design',
      icon: Settings,
      controls: [
        {
          label: 'Layout',
          type: 'select',
          value: template.layout,
          onChange: (value) => handleChange('layout', value),
          options: [
            { value: 'single-column', label: 'Single Column' },
            { value: 'header-footer', label: 'Header/Footer' },
            { value: 'two-column', label: 'Two Column' },
          ]
        },
        {
          label: 'Primary Color',
          type: 'color',
          value: template.primaryColor,
          onChange: (value) => handleChange('primaryColor', value),
        },
        {
          label: 'Font',
          type: 'select',
          value: template.font,
          onChange: (value) => handleChange('font', value),
          options: [
            { value: 'sans-serif', label: 'Sans-serif' },
            { value: 'serif', label: 'Serif' },
            { value: 'monospace', label: 'Monospace' },
          ]
        },
      ]
    },
    {
      title: 'Content',
      icon: Type,
      controls: [
        {
          label: 'Organization Name',
          type: 'text',
          value: template.organizationName,
          onChange: (value) => handleChange('organizationName', value),
        },
        {
          label: 'CTA Button Text',
          type: 'text',
          value: template.ctaText,
          onChange: (value) => handleChange('ctaText', value),
        },
        {
          label: 'Content',
          type: 'textarea',
          value: template.content,
          onChange: (value) => handleChange('content', value),
        },
      ]
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Email Template Builder</h1>
        <p className="mt-2 text-lg text-gray-600">Create beautiful, effective email templates for your campaigns</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 justify-center">
        {/* Controls */}
        <div className="w-full lg:w-1/3 bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
            <Settings className="h-5 w-5 mr-2 text-primary-600" />
            Template Settings
          </h2>
          
          <div className="space-y-6">
            {controlGroups.map((group, groupIndex) => {
              const Icon = group.icon
              return (
                <div key={groupIndex} className="border border-gray-200 rounded-xl p-4">
                  <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                    <Icon className="h-4 w-4 mr-2 text-primary-500" />
                    {group.title}
                  </h3>
                  <div className="space-y-4">
                    {group.controls.map((control, controlIndex) => (
                      <div key={controlIndex}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{control.label}</label>
                        {control.type === 'select' ? (
                          <select
                            value={control.value}
                            onChange={(e) => control.onChange(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                          >
                            {control.options.map(option => (
                              <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                          </select>
                        ) : control.type === 'color' ? (
                          <div className="flex items-center space-x-3">
                            <input
                              type="color"
                              value={control.value}
                              onChange={(e) => control.onChange(e.target.value)}
                              className="w-10 h-10 p-1 border border-gray-300 rounded-lg cursor-pointer"
                            />
                            <span className="text-sm text-gray-500">{control.value}</span>
                          </div>
                        ) : control.type === 'textarea' ? (
                          <textarea
                            rows={4}
                            value={control.value}
                            onChange={(e) => control.onChange(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                          />
                        ) : (
                          <input
                            type={control.type}
                            value={control.value}
                            onChange={(e) => control.onChange(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
          
          {/* Export Button with Options */}
          <div className="relative mt-6">
            <button
              onClick={() => setShowExportOptions(!showExportOptions)}
              className="w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 transition-all duration-200"
            >
              <Download className="h-5 w-5 mr-2" />
              Export Template
            </button>
            
            {showExportOptions && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10 p-2">
                <button
                  onClick={() => handleExport('download')}
                  className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download HTML
                </button>
                <button
                  onClick={() => handleExport('copy')}
                  className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy HTML
                </button>
                <button
                  onClick={() => handleExport('email')}
                  className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Share via Email
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Preview */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
              <Eye className="h-5 w-5 mr-2 text-primary-600" />
              Live Preview
            </h2>
            
            <div className="border border-gray-200 rounded-xl p-6 bg-gray-50">
              <div 
                className="bg-white mx-auto max-w-2xl p-8 rounded-lg shadow-sm border border-gray-200"
                style={{ fontFamily: template.font }}
              >
                {/* Header */}
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold" style={{ color: template.primaryColor }}>
                    {template.organizationName}
                  </h1>
                </div>
                
                {/* Content based on layout */}
                {template.layout === 'single-column' && (
                  <div>
                    <div className="mb-8 text-gray-700 leading-relaxed">
                      <p>{template.content}</p>
                    </div>
                    <div className="text-center">
                      <button 
                        className="px-6 py-3 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-shadow"
                        style={{ backgroundColor: template.primaryColor }}
                      >
                        {template.ctaText}
                      </button>
                    </div>
                  </div>
                )}
                
                {template.layout === 'header-footer' && (
                  <div>
                    <div className="border-b border-gray-200 pb-6 mb-8">
                      <h2 className="text-xl font-semibold text-gray-900">Important Update</h2>
                    </div>
                    <div className="mb-8 text-gray-700 leading-relaxed">
                      <p>{template.content}</p>
                    </div>
                    <div className="text-center">
                      <button 
                        className="px-6 py-3 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-shadow"
                        style={{ backgroundColor: template.primaryColor }}
                      >
                        {template.ctaText}
                      </button>
                    </div>
                    <div className="border-t border-gray-200 mt-8 pt-8 text-sm text-gray-600">
                      <p>You're receiving this email because you signed up for updates from {template.organizationName}.</p>
                    </div>
                  </div>
                )}
                
                {template.layout === 'two-column' && (
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-2/3 text-gray-700 leading-relaxed">
                      <p>{template.content}</p>
                    </div>
                    <div className="md:w-1/3">
                      <div className="bg-gray-100 p-6 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-3">Sidebar Content</h3>
                        <p className="text-sm text-gray-600 mb-4">Additional information or resources can go here in the sidebar.</p>
                        <button 
                          className="w-full px-4 py-2 rounded-lg text-white text-sm font-medium shadow-sm hover:shadow transition-shadow"
                          style={{ backgroundColor: template.primaryColor }}
                        >
                          {template.ctaText}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}