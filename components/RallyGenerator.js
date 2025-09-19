'use client'

import { useState } from 'react'
import { Upload, Type, Image, MousePointer, Divide, Globe, Trash2, GripVertical, Download, Mail, FileText, Share2 } from 'lucide-react'

export default function RallyGenerator() {
  const [showExportOptions, setShowExportOptions] = useState(false)
  const [components, setComponents] = useState([])
  const [activeComponent, setActiveComponent] = useState(null)
  const [draggingOverTrash, setDraggingOverTrash] = useState(false)
  const [dragOverIndex, setDragOverIndex] = useState(null)

  const componentTypes = [
    { type: 'header', label: 'Header', icon: Type, default: { text: 'Page Header', size: 'xl' } },
    { type: 'text', label: 'Text Block', icon: Type, default: { content: 'Add your text here...' } },
    { type: 'image', label: 'Image', icon: Image, default: { src: '', alt: 'Image placeholder' } },
    { type: 'form', label: 'Form', icon: MousePointer, default: { fields: [] } },
    { type: 'divider', label: 'Divider', icon: Divide, default: {} },
  ]

  const handleDragStart = (e, type) => {
    e.dataTransfer.setData('componentType', type)
  }

  const handleCanvasDrop = (e) => {
    e.preventDefault()
    const type = e.dataTransfer.getData('componentType')
    const newComponent = {
      id: Date.now(),
      type,
      ...componentTypes.find(c => c.type === type).default
    }
    setComponents([...components, newComponent])
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleTrashDrop = (e) => {
    e.preventDefault()
    const componentId = e.dataTransfer.getData('componentId')
    if (componentId) {
      setComponents(components.filter(comp => comp.id !== parseInt(componentId)))
    }
    setDraggingOverTrash(false)
  }

  const handleTrashDragOver = (e) => {
    e.preventDefault()
    setDraggingOverTrash(true)
  }

  const handleTrashDragLeave = (e) => {
    e.preventDefault()
    setDraggingOverTrash(false)
  }

  const handleComponentDragStart = (e, id) => {
    e.dataTransfer.setData('componentId', id)
  }

  const handleComponentDragOver = (e, index) => {
    e.preventDefault()
    setDragOverIndex(index)
  }

  const handleComponentDrop = (e, dropIndex) => {
    e.preventDefault()
    const componentId = e.dataTransfer.getData('componentId')
    if (componentId) {
      const draggedComponent = components.find(comp => comp.id === parseInt(componentId))
      const filteredComponents = components.filter(comp => comp.id !== parseInt(componentId))
      
      // Insert the dragged component at the new position
      const newComponents = [
        ...filteredComponents.slice(0, dropIndex),
        draggedComponent,
        ...filteredComponents.slice(dropIndex)
      ]
      
      setComponents(newComponents)
    }
    setDragOverIndex(null)
  }

  const updateComponent = (id, updates) => {
    setComponents(components.map(comp => 
      comp.id === id ? { ...comp, ...updates } : comp
    ))
  }

  const handleExport = (format) => {
    switch(format) {
      case 'pdf':
        exportAsPDF()
        break
      case 'html':
        exportAsHTML()
        break
      case 'email':
        shareViaEmail()
        break
      default:
        break
    }
    setShowExportOptions(false)
  }

  const exportAsPDF = () => {
    // This would use a library like jsPDF in a real implementation
    alert('PDF export would be implemented here. In a real app, this would generate a PDF version of your rally page.')
  }

  const exportAsHTML = () => {
    const rallyHTML = generateRallyHTML()
    downloadHTML(rallyHTML, 'rally-page.html')
  }

  const generateRallyHTML = () => {
    // Generate HTML based on the components
    return `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Rally Page</title>
    <style>
      body { font-family: sans-serif; margin: 0; padding: 0; line-height: 1.6; }
      .container { max-width: 800px; margin: 0 auto; padding: 20px; }
      .header { text-align: center; padding: 40px 0; }
      .content { margin: 20px 0; }
      .image-placeholder { background: #f3f4f6; padding: 60px; text-align: center; color: #6b7280; }
      .form { background: #f9fafb; padding: 30px; border-radius: 8px; }
      .button { background: #22c55e; color: white; padding: 12px 24px; border: none; border-radius: 6px; cursor: pointer; }
    </style>
  </head>
  <body>
    <div class="container">
      ${components.map(comp => {
        if (comp.type === 'header') return `<div class="header"><h1>${comp.text}</h1></div>`
        if (comp.type === 'text') return `<div class="content"><p>${comp.content}</p></div>`
        if (comp.type === 'image') return `<div class="image-placeholder">Image Placeholder</div>`
        if (comp.type === 'form') return `<div class="form"><h3>Sign Up Form</h3><input type="email" placeholder="Email address"><button class="button">Subscribe</button></div>`
        if (comp.type === 'divider') return `<hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">`
        return ''
      }).join('')}
    </div>
  </body>
  </html>`
  }

  const shareViaEmail = () => {
    const subject = 'Check out my rally page'
    const body = 'I created a rally page using the Grassroots Toolkit!'
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  // Add the downloadHTML function (same as in EmailBuilder)
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

  const renderComponent = (comp, index) => {
    if (comp.type === 'header') {
      return (
        <div 
          key={comp.id}
          draggable
          onDragStart={(e) => handleComponentDragStart(e, comp.id)}
          onDragOver={(e) => handleComponentDragOver(e, index)}
          onDrop={(e) => handleComponentDrop(e, index)}
          className={`p-4 border border-gray-200 rounded bg-white cursor-move hover:border-primary-300 relative group ${
            dragOverIndex === index ? 'border-2 border-primary-500' : ''
          }`}
          onClick={() => setActiveComponent(comp.id)}
        >
          <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <GripVertical className="h-4 w-4 text-gray-400" />
          </div>
          <h1 className={`text-${comp.size || 'xl'} font-bold`}>{comp.text}</h1>
          {activeComponent === comp.id && (
            <div className="mt-2 p-2 bg-gray-100 rounded">
              <input
                type="text"
                value={comp.text}
                onChange={(e) => updateComponent(comp.id, { text: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <select
                value={comp.size}
                onChange={(e) => updateComponent(comp.id, { size: e.target.value })}
                className="mt-2 w-full p-2 border border-gray-300 rounded"
              >
                <option value="xl">Large</option>
                <option value="2xl">Extra Large</option>
                <option value="3xl">XXL</option>
              </select>
            </div>
          )}
        </div>
      )
    }
    
    if (comp.type === 'text') {
      return (
        <div 
          key={comp.id}
          draggable
          onDragStart={(e) => handleComponentDragStart(e, comp.id)}
          onDragOver={(e) => handleComponentDragOver(e, index)}
          onDrop={(e) => handleComponentDrop(e, index)}
          className={`p-4 border border-gray-200 rounded bg-white cursor-move hover:border-primary-300 relative group ${
            dragOverIndex === index ? 'border-2 border-primary-500' : ''
          }`}
          onClick={() => setActiveComponent(comp.id)}
        >
          <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <GripVertical className="h-4 w-4 text-gray-400" />
          </div>
          <p>{comp.content}</p>
          {activeComponent === comp.id && (
            <div className="mt-2 p-2 bg-gray-100 rounded">
              <textarea
                value={comp.content}
                onChange={(e) => updateComponent(comp.id, { content: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                rows="4"
              />
            </div>
          )}
        </div>
      )
    }
    
    if (comp.type === 'image') {
      return (
        <div 
          key={comp.id}
          draggable
          onDragStart={(e) => handleComponentDragStart(e, comp.id)}
          onDragOver={(e) => handleComponentDragOver(e, index)}
          onDrop={(e) => handleComponentDrop(e, index)}
          className={`p-4 border border-gray-200 rounded bg-white cursor-move hover:border-primary-300 relative group ${
            dragOverIndex === index ? 'border-2 border-primary-500' : ''
          }`}
          onClick={() => setActiveComponent(comp.id)}
        >
          <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <GripVertical className="h-4 w-4 text-gray-400" />
          </div>
          <div className="flex justify-center items-center h-40 bg-gray-100 rounded">
            <Image className="h-12 w-12 text-gray-400" />
            <span className="ml-2 text-gray-500">Image Placeholder</span>
          </div>
          {activeComponent === comp.id && (
            <div className="mt-2 p-2 bg-gray-100 rounded">
              <input
                type="file"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          )}
        </div>
      )
    }
    
    if (comp.type === 'form') {
      return (
        <div 
          key={comp.id}
          draggable
          onDragStart={(e) => handleComponentDragStart(e, comp.id)}
          onDragOver={(e) => handleComponentDragOver(e, index)}
          onDrop={(e) => handleComponentDrop(e, index)}
          className={`p-4 border border-gray-200 rounded bg-white cursor-move hover:border-primary-300 relative group ${
            dragOverIndex === index ? 'border-2 border-primary-500' : ''
          }`}
          onClick={() => setActiveComponent(comp.id)}
        >
          <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <GripVertical className="h-4 w-4 text-gray-400" />
          </div>
          <div className="space-y-4">
            <h3 className="font-medium">Sign Up Form</h3>
            <input 
              type="email" 
              placeholder="Email address" 
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button className="px-4 py-2 bg-primary-600 text-white rounded">
              Subscribe
            </button>
          </div>
        </div>
      )
    }
    
    if (comp.type === 'divider') {
      return (
        <div 
          key={comp.id}
          draggable
          onDragStart={(e) => handleComponentDragStart(e, comp.id)}
          onDragOver={(e) => handleComponentDragOver(e, index)}
          onDrop={(e) => handleComponentDrop(e, index)}
          className={`p-4 border border-gray-200 rounded bg-white cursor-move hover:border-primary-300 relative group ${
            dragOverIndex === index ? 'border-2 border-primary-500' : ''
          }`}
          onClick={() => setActiveComponent(comp.id)}
        >
          <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <GripVertical className="h-4 w-4 text-gray-400" />
          </div>
          <hr className="border-t border-gray-300" />
        </div>
      )
    }
    
    return null
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8 justify-center">
        {/* Components Palette */}
        <div className="w-full lg:w-1/4 bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Components</h2>
          <p className="text-sm text-gray-500 mb-4">Drag and drop components to build your page</p>
          
          <div className="space-y-2">
            {componentTypes.map((comp) => {
              const Icon = comp.icon
              return (
                <div
                  key={comp.type}
                  draggable
                  onDragStart={(e) => handleDragStart(e, comp.type)}
                  className="flex items-center p-3 border border-gray-200 rounded cursor-move hover:bg-gray-50"
                >
                  <Icon className="h-5 w-5 mr-2 text-gray-500" />
                  <span>{comp.label}</span>
                </div>
              )
            })}
          </div>
        </div>
        
        {/* Canvas */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white p-6 rounded-lg shadow mb-4">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Page Canvas</h2>
            
            <div
              onDrop={handleCanvasDrop}
              onDragOver={handleDragOver}
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 min-h-[500px] bg-gray-50"
            >
              {components.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Upload className="h-12 w-12 mx-auto mb-4" />
                  <p>Drag components here to build your page</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {components.map((comp, index) => renderComponent(comp, index))}
                </div>
              )}
            </div>
          </div>
          
          {/* Trash Bin */}
          <div
            onDrop={handleTrashDrop}
            onDragOver={handleTrashDragOver}
            onDragLeave={handleTrashDragLeave}
            className={`p-4 border-2 border-dashed rounded-lg mb-4 text-center ${
              draggingOverTrash 
                ? 'border-red-500 bg-red-50' 
                : 'border-gray-300 bg-gray-50'
            }`}
          >
            <Trash2 className={`h-8 w-8 mx-auto mb-2 ${
              draggingOverTrash ? 'text-red-500' : 'text-gray-400'
            }`} />
            <p className="text-sm text-gray-500">
              Drag components here to delete
            </p>
          </div>
          
          <div className="relative">
            <button
              onClick={() => setShowExportOptions(!showExportOptions)}
              className="w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
            >
              <Share2 className="h-5 w-5 mr-2" />
              Export Page
            </button>
            
            {showExportOptions && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10 p-2">
                <button
                  onClick={() => handleExport('pdf')}
                  className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Export as PDF
                </button>
                <button
                  onClick={() => handleExport('html')}
                  className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download HTML
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
      </div>
    </div>
  )
}