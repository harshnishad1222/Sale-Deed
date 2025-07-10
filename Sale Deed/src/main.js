import './style.css'

document.querySelector('#app').innerHTML = `
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
    <div class="max-w-2xl mx-auto">
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Sale Deed Generator</h1>
          <p class="text-gray-600">Generate professional sale deed documents</p>
        </div>
        
        <form id="deedForm" class="space-y-6">
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input type="text" id="name" required 
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Father's Name</label>
              <input type="text" id="father_name" required 
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
            </div>
          </div>
          
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Property Size (sq.ft.)</label>
              <input type="number" id="property_size" required 
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Sale Amount (₹)</label>
              <input type="number" id="sale_amount" required 
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input type="date" id="date" required 
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
          </div>
          
          <button type="submit" 
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105">
            Generate Sale Deed
          </button>
        </form>
        
        <div id="output" class="hidden mt-8 p-6 bg-gray-50 rounded-lg border">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Generated Sale Deed</h3>
          <div id="deed-text" class="text-gray-700 leading-relaxed bg-white p-4 rounded border-l-4 border-blue-500"></div>
          <div class="mt-4 flex gap-4">
            <button id="downloadPdf" class="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
              Download PDF
            </button>
            <button id="newDeed" class="text-blue-600 hover:text-blue-800 font-medium">
              Create New Deed
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
`

document.getElementById('deedForm').addEventListener('submit', (e) => {
  e.preventDefault()
  
  const template = "This Sale Deed is made on {{date}} between {{name}}, S/o {{father_name}}, for a property of {{property_size}} sq.ft., sold for ₹{{sale_amount}}."
  
  const result = template
    .replace('{{name}}', document.getElementById('name').value)
    .replace('{{father_name}}', document.getElementById('father_name').value)
    .replace('{{property_size}}', document.getElementById('property_size').value)
    .replace('{{sale_amount}}', document.getElementById('sale_amount').value)
    .replace('{{date}}', document.getElementById('date').value)
  
  currentDeedText = result
  document.getElementById('deed-text').textContent = result
  document.getElementById('output').classList.remove('hidden')
  document.getElementById('deedForm').classList.add('hidden')
})

let currentDeedText = ''

document.addEventListener('click', (e) => {
  if (e.target.id === 'newDeed') {
    document.getElementById('output').classList.add('hidden')
    document.getElementById('deedForm').classList.remove('hidden')
    document.getElementById('deedForm').reset()
  }
  
  if (e.target.id === 'downloadPdf') {
    const { jsPDF } = window.jspdf
    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text('SALE DEED', 105, 30, { align: 'center' })
    doc.setFontSize(12)
    
    const lines = doc.splitTextToSize(currentDeedText, 170)
    doc.text(lines, 20, 60)
    
    doc.save('sale-deed.pdf')
  }
})