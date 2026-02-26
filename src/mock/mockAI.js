const templates = {
  recipe: {
    text: "Here's a recipe builder app! It has a search bar, category filters, featured recipe cards, and a clean visual layout. Try browsing the categories or checking out the featured recipes.",
    html: `<!DOCTYPE html>
<html>
<head><style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, sans-serif; background: #faf9f6; color: #1a1a1a; }
  .header { background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); color: white; padding: 40px 24px 80px; position: relative; }
  .header h1 { font-size: 28px; font-weight: 800; margin-bottom: 4px; letter-spacing: -0.5px; }
  .header p { color: #a3a3a3; font-size: 14px; margin-bottom: 20px; }
  .search { display: flex; gap: 8px; max-width: 480px; }
  .search input { flex: 1; padding: 12px 16px; border-radius: 12px; border: none; font-size: 14px; background: rgba(255,255,255,0.12); color: white; backdrop-filter: blur(10px); }
  .search input::placeholder { color: rgba(255,255,255,0.5); }
  .search button { padding: 12px 20px; border-radius: 12px; border: none; background: #e85d40; color: white; font-weight: 600; font-size: 14px; cursor: pointer; white-space: nowrap; }
  .content { max-width: 560px; margin: 0 auto; padding: 0 24px; margin-top: -48px; position: relative; z-index: 1; }
  .categories { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 20px; -webkit-overflow-scrolling: touch; }
  .categories::-webkit-scrollbar { display: none; }
  .cat { padding: 10px 18px; border-radius: 50px; font-size: 13px; font-weight: 600; white-space: nowrap; cursor: pointer; border: none; transition: all 0.2s; }
  .cat-active { background: #1a1a1a; color: white; }
  .cat-inactive { background: white; color: #666; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
  h2 { font-size: 18px; font-weight: 700; margin-bottom: 14px; }
  .featured { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 28px; }
  .recipe-card { border-radius: 16px; overflow: hidden; background: white; box-shadow: 0 2px 8px rgba(0,0,0,0.06); cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; }
  .recipe-card:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.1); }
  .recipe-img { height: 130px; position: relative; }
  .recipe-img .time { position: absolute; bottom: 8px; left: 8px; background: rgba(0,0,0,0.6); color: white; padding: 3px 8px; border-radius: 6px; font-size: 11px; font-weight: 600; backdrop-filter: blur(4px); }
  .recipe-info { padding: 12px; }
  .recipe-info h3 { font-size: 14px; font-weight: 600; margin-bottom: 4px; line-height: 1.3; }
  .recipe-meta { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #888; }
  .recipe-meta .dot { width: 3px; height: 3px; border-radius: 50%; background: #ccc; }
  .wide-card { grid-column: 1 / -1; display: flex; border-radius: 16px; overflow: hidden; background: white; box-shadow: 0 2px 8px rgba(0,0,0,0.06); cursor: pointer; transition: transform 0.2s; }
  .wide-card:hover { transform: translateY(-2px); }
  .wide-card .wide-img { width: 140px; flex-shrink: 0; }
  .wide-card .wide-info { padding: 16px; display: flex; flex-direction: column; justify-content: center; }
  .wide-card .wide-info h3 { font-size: 15px; font-weight: 600; margin-bottom: 4px; }
  .wide-card .wide-info p { font-size: 12px; color: #888; line-height: 1.4; margin-bottom: 8px; }
  .tag-row { display: flex; gap: 4px; flex-wrap: wrap; }
  .tag { padding: 3px 8px; border-radius: 4px; font-size: 10px; font-weight: 600; }
  .tag-orange { background: #fff3e0; color: #e65100; }
  .tag-green { background: #e8f5e9; color: #2e7d32; }
  .tag-blue { background: #e3f2fd; color: #1565c0; }
  .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
  .section-header a { font-size: 13px; color: #e85d40; font-weight: 600; text-decoration: none; }
  .popular-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 28px; }
  .popular-item { display: flex; align-items: center; gap: 12px; background: white; border-radius: 14px; padding: 10px; box-shadow: 0 1px 4px rgba(0,0,0,0.05); cursor: pointer; }
  .popular-item .rank { width: 28px; height: 28px; border-radius: 8px; background: #f5f5f5; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: #888; flex-shrink: 0; }
  .popular-item .pop-img { width: 48px; height: 48px; border-radius: 10px; flex-shrink: 0; }
  .popular-item .pop-info { flex: 1; min-width: 0; }
  .popular-item .pop-info h4 { font-size: 13px; font-weight: 600; margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .popular-item .pop-info span { font-size: 11px; color: #888; }
  .popular-item .pop-rating { font-size: 12px; font-weight: 600; color: #f59e0b; flex-shrink: 0; }
</style></head>
<body>
  <div class="header">
    <h1>Recipe Builder</h1>
    <p>Discover, create, and share your favorite recipes</p>
    <div class="search">
      <input placeholder="Search recipes, ingredients..." />
      <button>Search</button>
    </div>
  </div>
  <div class="content">
    <div class="categories">
      <button class="cat cat-active">All</button>
      <button class="cat cat-inactive">Breakfast</button>
      <button class="cat cat-inactive">Lunch</button>
      <button class="cat cat-inactive">Dinner</button>
      <button class="cat cat-inactive">Desserts</button>
      <button class="cat cat-inactive">Vegetarian</button>
      <button class="cat cat-inactive">Quick & Easy</button>
    </div>

    <div class="section-header"><h2>Featured</h2><a href="#">See all</a></div>
    <div class="featured">
      <div class="recipe-card">
        <div class="recipe-img" style="background: linear-gradient(135deg, #ff9a56, #ff6f3c);">
          <span class="time">30 min</span>
        </div>
        <div class="recipe-info">
          <h3>Spicy Thai Basil Noodles</h3>
          <div class="recipe-meta"><span>Thai</span><span class="dot"></span><span>Medium</span></div>
        </div>
      </div>
      <div class="recipe-card">
        <div class="recipe-img" style="background: linear-gradient(135deg, #a8e063, #56ab2f);">
          <span class="time">15 min</span>
        </div>
        <div class="recipe-info">
          <h3>Avocado Toast Board</h3>
          <div class="recipe-meta"><span>Brunch</span><span class="dot"></span><span>Easy</span></div>
        </div>
      </div>
      <div class="wide-card">
        <div class="wide-img" style="background: linear-gradient(135deg, #f093fb, #f5576c);"></div>
        <div class="wide-info">
          <h3>Berry Cheesecake Bites</h3>
          <p>No-bake cheesecake bites with fresh berries and graham cracker crust</p>
          <div class="tag-row">
            <span class="tag tag-orange">Dessert</span>
            <span class="tag tag-green">No-Bake</span>
            <span class="tag tag-blue">20 min</span>
          </div>
        </div>
      </div>
    </div>

    <div class="section-header"><h2>Popular This Week</h2><a href="#">See all</a></div>
    <div class="popular-list">
      <div class="popular-item">
        <div class="rank">1</div>
        <div class="pop-img" style="background: linear-gradient(135deg, #fbc2eb, #a6c1ee); border-radius: 10px;"></div>
        <div class="pop-info"><h4>Creamy Garlic Tuscan Salmon</h4><span>25 min &middot; 4 servings</span></div>
        <div class="pop-rating">4.9</div>
      </div>
      <div class="popular-item">
        <div class="rank">2</div>
        <div class="pop-img" style="background: linear-gradient(135deg, #ffecd2, #fcb69f); border-radius: 10px;"></div>
        <div class="pop-info"><h4>Homemade Pasta Carbonara</h4><span>35 min &middot; 2 servings</span></div>
        <div class="pop-rating">4.8</div>
      </div>
      <div class="popular-item">
        <div class="rank">3</div>
        <div class="pop-img" style="background: linear-gradient(135deg, #c3cfe2, #a1c4fd); border-radius: 10px;"></div>
        <div class="pop-info"><h4>Korean Bibimbap Bowl</h4><span>40 min &middot; 2 servings</span></div>
        <div class="pop-rating">4.7</div>
      </div>
    </div>
  </div>
</body>
</html>`
  },

  portfolio: {
    text: "Here's a modern portfolio site! It features a hero section, skills grid, and project showcase.",
    html: `<!DOCTYPE html>
<html>
<head><style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, sans-serif; background: #0f172a; color: white; }
  .hero { padding: 60px 24px; text-align: center; background: linear-gradient(135deg, #1e293b, #0f172a); }
  .hero h1 { font-size: 36px; margin-bottom: 8px; }
  .hero p { color: #94a3b8; font-size: 16px; margin-bottom: 24px; }
  .btn { display: inline-block; background: #3b82f6; color: white; padding: 10px 24px; border-radius: 8px; font-weight: 600; text-decoration: none; }
  .section { padding: 40px 24px; max-width: 640px; margin: 0 auto; }
  .section h2 { font-size: 20px; margin-bottom: 16px; color: #e2e8f0; }
  .skills { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
  .skill { background: #1e293b; padding: 16px; border-radius: 12px; text-align: center; font-size: 13px; }
  .skill .ico { display: block; width: 32px; height: 32px; margin: 0 auto 6px; border-radius: 8px; }
  .projects { display: grid; gap: 16px; }
  .project { background: #1e293b; border-radius: 12px; padding: 20px; }
  .project h3 { font-size: 16px; margin-bottom: 4px; }
  .project p { color: #94a3b8; font-size: 13px; }
  .tag { display: inline-block; background: #334155; padding: 2px 8px; border-radius: 4px; font-size: 11px; margin-top: 8px; margin-right: 4px; color: #93c5fd; }
</style></head>
<body>
  <div class="hero">
    <h1>Alex Chen</h1>
    <p>Full-stack developer & designer</p>
    <a class="btn" href="#">View My Work</a>
  </div>
  <div class="section">
    <h2>Skills</h2>
    <div class="skills">
      <div class="skill"><span class="ico" style="background: linear-gradient(135deg, #61dafb, #2196f3);"></span>React</div>
      <div class="skill"><span class="ico" style="background: linear-gradient(135deg, #68d391, #38a169);"></span>Node.js</div>
      <div class="skill"><span class="ico" style="background: linear-gradient(135deg, #f687b3, #ed64a6);"></span>Design</div>
      <div class="skill"><span class="ico" style="background: linear-gradient(135deg, #fbb6ce, #f56565);"></span>Mobile</div>
      <div class="skill"><span class="ico" style="background: linear-gradient(135deg, #90cdf4, #4299e1);"></span>Cloud</div>
      <div class="skill"><span class="ico" style="background: linear-gradient(135deg, #c4b5fd, #8b5cf6);"></span>Databases</div>
    </div>
  </div>
  <div class="section">
    <h2>Projects</h2>
    <div class="projects">
      <div class="project">
        <h3>E-Commerce Platform</h3>
        <p>Full-stack shopping experience with real-time inventory.</p>
        <span class="tag">React</span><span class="tag">Node</span><span class="tag">PostgreSQL</span>
      </div>
      <div class="project">
        <h3>Weather Dashboard</h3>
        <p>Beautiful weather visualization with 7-day forecasts.</p>
        <span class="tag">Vue</span><span class="tag">D3.js</span><span class="tag">API</span>
      </div>
    </div>
  </div>
</body>
</html>`
  },

  todo: {
    text: "Here's a clean to-do list app with categories and priority levels!",
    html: `<!DOCTYPE html>
<html>
<head><style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, sans-serif; background: #f8fafc; padding: 24px; }
  .app { max-width: 420px; margin: 0 auto; }
  h1 { font-size: 24px; margin-bottom: 4px; }
  .subtitle { color: #64748b; margin-bottom: 20px; font-size: 14px; }
  .input-row { display: flex; gap: 8px; margin-bottom: 24px; }
  .input-row input { flex: 1; padding: 10px 14px; border: 1px solid #e2e8f0; border-radius: 10px; font-size: 14px; background: white; }
  .input-row button { background: #1a1a1a; color: white; padding: 10px 16px; border-radius: 10px; font-weight: 600; font-size: 14px; white-space: nowrap; border: none; cursor: pointer; }
  .category { margin-bottom: 20px; }
  .category-title { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8; margin-bottom: 8px; }
  .task { display: flex; align-items: center; gap: 10px; background: white; padding: 12px 14px; border-radius: 10px; margin-bottom: 6px; box-shadow: 0 1px 2px rgba(0,0,0,0.04); }
  .checkbox { width: 20px; height: 20px; border: 2px solid #d1d5db; border-radius: 6px; flex-shrink: 0; }
  .checkbox.done { background: #1a1a1a; border-color: #1a1a1a; }
  .task-text { flex: 1; font-size: 14px; }
  .task-text.done { text-decoration: line-through; color: #94a3b8; }
  .priority { font-size: 10px; font-weight: 600; padding: 2px 6px; border-radius: 4px; }
  .priority.high { background: #fef2f2; color: #dc2626; }
  .priority.med { background: #fffbeb; color: #d97706; }
  .priority.low { background: #f0fdf4; color: #16a34a; }
</style></head>
<body>
  <div class="app">
    <h1>My Tasks</h1>
    <p class="subtitle">3 of 5 completed</p>
    <div class="input-row">
      <input placeholder="Add a new task..." />
      <button>Add</button>
    </div>
    <div class="category">
      <div class="category-title">To Do</div>
      <div class="task"><div class="checkbox"></div><span class="task-text">Design new landing page</span><span class="priority high">High</span></div>
      <div class="task"><div class="checkbox"></div><span class="task-text">Write API documentation</span><span class="priority med">Med</span></div>
    </div>
    <div class="category">
      <div class="category-title">Completed</div>
      <div class="task"><div class="checkbox done"></div><span class="task-text done">Set up project repo</span><span class="priority low">Low</span></div>
      <div class="task"><div class="checkbox done"></div><span class="task-text done">Create wireframes</span><span class="priority med">Med</span></div>
      <div class="task"><div class="checkbox done"></div><span class="task-text done">User research interviews</span><span class="priority high">High</span></div>
    </div>
  </div>
</body>
</html>`
  },

  landing: {
    text: "Here's a modern landing page with a hero, features section, and call-to-action!",
    html: `<!DOCTYPE html>
<html>
<head><style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, sans-serif; color: #1e293b; }
  .hero { padding: 64px 24px; text-align: center; background: linear-gradient(135deg, #f8fafc, #e2e8f0); }
  .hero h1 { font-size: 36px; font-weight: 800; margin-bottom: 12px; line-height: 1.1; }
  .hero p { color: #64748b; font-size: 16px; margin-bottom: 28px; max-width: 400px; margin-left: auto; margin-right: auto; }
  .btn-group { display: flex; gap: 12px; justify-content: center; }
  .btn { padding: 12px 24px; border-radius: 10px; font-weight: 600; font-size: 14px; text-decoration: none; }
  .btn-primary { background: #1a1a1a; color: white; }
  .btn-secondary { background: white; color: #1e293b; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
  .features { padding: 48px 24px; max-width: 640px; margin: 0 auto; }
  .features h2 { text-align: center; font-size: 22px; margin-bottom: 32px; }
  .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
  .feature { padding: 20px; border-radius: 12px; background: #f8fafc; }
  .feature .icon { width: 36px; height: 36px; border-radius: 10px; margin-bottom: 10px; }
  .feature h3 { font-size: 15px; margin-bottom: 4px; }
  .feature p { font-size: 13px; color: #64748b; line-height: 1.5; }
  .cta { text-align: center; padding: 48px 24px; background: #1a1a1a; color: white; }
  .cta h2 { font-size: 22px; margin-bottom: 8px; }
  .cta p { color: #94a3b8; margin-bottom: 20px; }
  .cta .btn-primary { display: inline-block; background: white; color: #1a1a1a; }
</style></head>
<body>
  <div class="hero">
    <h1>Build Anything<br/>In Seconds</h1>
    <p>Describe what you want. Watch it come to life. Ship it instantly.</p>
    <div class="btn-group">
      <a class="btn btn-primary" href="#">Get Started</a>
      <a class="btn btn-secondary" href="#">See Examples</a>
    </div>
  </div>
  <div class="features">
    <h2>Why you'll love it</h2>
    <div class="grid">
      <div class="feature"><div class="icon" style="background: linear-gradient(135deg, #fbbf24, #f59e0b);"></div><h3>Instant Preview</h3><p>See changes in real time as you describe your vision.</p></div>
      <div class="feature"><div class="icon" style="background: linear-gradient(135deg, #a78bfa, #7c3aed);"></div><h3>Beautiful Design</h3><p>AI generates polished, responsive layouts automatically.</p></div>
      <div class="feature"><div class="icon" style="background: linear-gradient(135deg, #34d399, #059669);"></div><h3>Mobile Ready</h3><p>Every app works perfectly on any screen size.</p></div>
      <div class="feature"><div class="icon" style="background: linear-gradient(135deg, #f472b6, #ec4899);"></div><h3>One-Click Deploy</h3><p>Ship your creation to the web with a single click.</p></div>
    </div>
  </div>
  <div class="cta">
    <h2>Ready to build?</h2>
    <p>Join thousands of creators building with AI.</p>
    <a class="btn btn-primary" href="#">Start for Free</a>
  </div>
</body>
</html>`
  },

  default: {
    text: "I've created a starter template for your app! It has a clean header, main content area, and footer. Tell me more about what you'd like to build and I'll customize it.",
    html: `<!DOCTYPE html>
<html>
<head><style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, sans-serif; background: #f9fafb; min-height: 100vh; display: flex; flex-direction: column; }
  header { background: white; padding: 16px 24px; border-bottom: 1px solid #e5e7eb; display: flex; align-items: center; justify-content: space-between; }
  header h1 { font-size: 18px; }
  nav a { color: #6b7280; font-size: 14px; margin-left: 16px; text-decoration: none; }
  main { flex: 1; padding: 32px 24px; max-width: 600px; margin: 0 auto; width: 100%; }
  .hero { text-align: center; padding: 40px 0; }
  .hero h2 { font-size: 28px; margin-bottom: 8px; }
  .hero p { color: #6b7280; margin-bottom: 24px; }
  .btn { background: #1a1a1a; color: white; padding: 10px 20px; border-radius: 8px; font-weight: 600; font-size: 14px; display: inline-block; text-decoration: none; }
  .cards { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 32px; }
  .card { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
  .card h3 { font-size: 15px; margin-bottom: 4px; }
  .card p { font-size: 13px; color: #6b7280; }
  footer { text-align: center; padding: 16px; color: #9ca3af; font-size: 12px; border-top: 1px solid #e5e7eb; }
</style></head>
<body>
  <header>
    <h1>My App</h1>
    <nav><a href="#">Home</a><a href="#">About</a><a href="#">Contact</a></nav>
  </header>
  <main>
    <div class="hero">
      <h2>Welcome!</h2>
      <p>This is your starting template. Describe what you want to build!</p>
      <a class="btn" href="#">Get Started</a>
    </div>
    <div class="cards">
      <div class="card"><h3>Feature 1</h3><p>Describe your first feature here.</p></div>
      <div class="card"><h3>Feature 2</h3><p>Describe your second feature here.</p></div>
      <div class="card"><h3>Feature 3</h3><p>Describe your third feature here.</p></div>
      <div class="card"><h3>Feature 4</h3><p>Describe your fourth feature here.</p></div>
    </div>
  </main>
  <footer>Built with Build Anything</footer>
</body>
</html>`
  }
}

const keywords = [
  { match: ['recipe', 'cook', 'food', 'meal', 'kitchen'], key: 'recipe' },
  { match: ['portfolio', 'resume', 'cv', 'about me', 'personal site'], key: 'portfolio' },
  { match: ['todo', 'task', 'checklist', 'to-do', 'to do'], key: 'todo' },
  { match: ['landing', 'homepage', 'marketing', 'launch', 'startup'], key: 'landing' },
]

function detectTemplate(message) {
  const lower = message.toLowerCase()
  for (const { match, key } of keywords) {
    if (match.some(word => lower.includes(word))) {
      return key
    }
  }
  return 'default'
}

export function getMockAIResponse(message) {
  const key = detectTemplate(message)
  const template = templates[key]

  const delay = 1000 + Math.random() * 1000

  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        text: template.text,
        html: template.html,
      })
    }, delay)
  })
}
