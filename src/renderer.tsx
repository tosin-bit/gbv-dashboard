import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Enhanced GBV Dashboard - Sierra Leone & Beyond</title>
        
        {/* Tailwind CSS */}
        <script src="https://cdn.tailwindcss.com"></script>
        
        {/* Font Awesome Icons */}
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        
        {/* Chart.js for data visualization */}
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        
        {/* Axios for HTTP requests */}
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        
        {/* Custom CSS */}
        <link href="/static/style.css" rel="stylesheet" />
        
        {/* Meta tags */}
        <meta name="description" content="Enhanced GBV Dashboard for monitoring and managing gender-based violence cases across Sierra Leone and beyond" />
        <meta name="author" content="Insyt FamilyCare Healthcare Technology" />
        <meta name="robots" content="noindex, nofollow" />
        
        {/* Favicon */}
        <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
})
