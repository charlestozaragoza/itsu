// Minimal Web Browser Implementation
// This script creates a simple web browser UI with an input for URLs and an iframe to display pages.


// Add viewport meta tag for mobile scaling (if not already present)
if (!document.querySelector('meta[name="viewport"]')) {
  const meta = document.createElement('meta');
// Minimal Web Browser Implementation (CLEAN RESTORE)
// This script creates a simple web browser UI with navigation, Home, About, and Gemini AI features.

// Add viewport meta tag for mobile scaling (if not already present)
if (!document.querySelector('meta[name="viewport"]')) {
  const meta = document.createElement('meta');
  meta.name = 'viewport';
  meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
  document.head.appendChild(meta);
}

const container = document.createElement('div');
container.style.display = 'flex';
container.style.flexDirection = 'column';
container.style.alignItems = 'center';

// Navigation bar
const navBar = document.createElement('div');
navBar.style.display = 'flex';
navBar.style.justifyContent = 'center';
navBar.style.gap = '18px';


            <a href="https://www.max.com/" target="_blank" style="color:#6e45e2;font-weight:bold;margin:0 10px;">Max</a>
            <a href="https://www.peacocktv.com/" target="_blank" style="color:#ffc107;font-weight:bold;margin:0 10px;">Peacock</a>
            <a href="https://www.paramountplus.com/" target="_blank" style="color:#0061ff;font-weight:bold;margin:0 10px;">Paramount+</a>
          </div>
          <div style="margin-top:8px;font-size:0.98em;color:#e74c3c;">Tip: Movie night is a great way to bond and discuss what you learned together.</div>
        </div>
      </section>

      <!-- STEM & Coding -->
      <section class="catbox catbox-stem">
        <div class="catbox-icon">💻</div>
        <h2>STEM & Coding</h2>
        <div class="catbox-desc">
          <a href="https://code.org/" target="_blank" style="color:#0a6d5d;">Code.org</a> | 
          <a href="https://www.khanacademy.org/computing/computer-programming" target="_blank" style="color:#0a6d5d;">Khan Academy Programming</a> | 
          <a href="https://scratch.mit.edu/" target="_blank" style="color:#0a6d5d;">Scratch</a><br>
          <span style="color:#7d3cff;font-size:0.98em;">Fun Fact: The first computer programmer was Ada Lovelace—in the 1800s!</span>
        </div>
      </section>

      <!-- Music & Podcasts -->
      <section class="catbox catbox-music">
        <div class="catbox-icon">🎧</div>
        <h2>Music & Podcasts</h2>
        <div class="catbox-desc">
          <a href="https://www.npr.org/sections/music/" target="_blank" style="color:#0a6d5d;">NPR Music</a> | 
          <a href="https://www.brainson.org/" target="_blank" style="color:#0a6d5d;">Brains On! Science Podcast</a> | 
          <a href="https://www.spotify.com/us/" target="_blank" style="color:#0a6d5d;">Spotify</a><br>
          <span style="color:#e67e22;font-size:0.98em;">Music can boost your mood and help you focus!</span>
        </div>
      </section>

      <!-- Book Club -->
      <section class="catbox catbox-books">
        <div class="catbox-icon">📚</div>
        <h2>Book Club</h2>
        <div class="catbox-desc">
          <a href="https://www.goodreads.com/list/show/276.Teens" target="_blank" style="color:#0a6d5d;">Top Teen Books</a> | 
          <a href="https://www.commonsensemedia.org/lists/book-reviews" target="_blank" style="color:#0a6d5d;">Common Sense Media: Book Reviews</a><br>
          <span style="color:#0a6d5d;font-size:0.98em;">Reading expands your imagination and vocabulary.</span>
        </div>
      </section>



      <!-- Sports & Fitness -->
      <section class="catbox catbox-sports">
        <div class="catbox-icon">🏀</div>
        <h2>Sports & Fitness</h2>
        <div class="catbox-desc">
          <a href="https://www.youtube.com/user/PEwithJoe" target="_blank" style="color:#0a6d5d;">PE with Joe (YouTube)</a> | 
          <a href="https://www.kidshealth.org/en/teens/fitness-exercise.html" target="_blank" style="color:#0a6d5d;">Teens Fitness Guide</a> | 
          <a href="https://www.active.com/fitness" target="_blank" style="color:#0a6d5d;">Active.com Fitness</a><br>
          <span style="color:#e74c3c;font-size:0.98em;">Exercise helps your body and mind stay healthy!</span>
        </div>
      </section>

      <!-- DIY & Life Hacks -->
      <section class="catbox catbox-diy">
        <div class="catbox-icon">🛠️</div>
        <h2>DIY & Life Hacks</h2>
        <div class="catbox-desc">
          <a href="https://www.instructables.com/" target="_blank" style="color:#0a6d5d;">Instructables</a> | 
          <a href="https://www.lifehack.org/articles/lifestyle/100-life-hacks-that-make-life-easier.html" target="_blank" style="color:#0a6d5d;">Life Hacks</a> | 
          <a href="https://www.youtube.com/c/5MinuteCrafts" target="_blank" style="color:#0a6d5d;">5-Minute Crafts</a><br>
          <span style="color:#7d3cff;font-size:0.98em;">DIY builds confidence and problem-solving skills.</span>
        </div>
      </section>

      <!-- Polls & Quizzes -->
      <section class="catbox catbox-quiz">
        <div class="catbox-icon">❓</div>
        <h2>Polls & Quizzes</h2>
        <div class="catbox-desc">
          <a href="https://www.natgeokids.com/uk/category/discover/quiz/" target="_blank" style="color:#0a6d5d;">Nat Geo Kids Quizzes</a> | 
          <a href="https://www.buzzfeed.com/quizzes" target="_blank" style="color:#0a6d5d;">BuzzFeed Quizzes</a> | 
          <a href="https://www.sporcle.com/" target="_blank" style="color:#0a6d5d;">Sporcle</a><br>
          <span style="color:#e67e22;font-size:0.98em;">Quizzes are a fun way to learn about yourself and the world!</span>
        </div>
      </section>

      <!-- Safe Social Spaces -->
      <section class="catbox catbox-social">
        <div class="catbox-icon">🌐</div>
        <h2>Safe Social Spaces</h2>
        <div class="catbox-desc">
          <a href="https://www.reddit.com/r/teens/" target="_blank" style="color:#0a6d5d;">Reddit Teens</a> | 
          <a href="https://www.dosomething.org/us" target="_blank" style="color:#0a6d5d;">DoSomething.org</a> | 
          <a href="https://www.tolerance.org/classroom-resources/student-tasks/lets-talk" target="_blank" style="color:#0a6d5d;">Let's Talk (Tolerance.org)</a><br>
          <span style="color:#0a6d5d;font-size:0.98em;">Always be kind and stay safe online!</span>
        </div>
      </section>

      <!-- Career Inspiration -->
      <section class="catbox catbox-career">
        <div class="catbox-icon">🚀</div>
        <h2>Career Inspiration</h2>
        <div class="catbox-desc">
          <a href="https://www.careeronestop.org/Videos/careervideos/career-videos.aspx" target="_blank" style="color:#0a6d5d;">CareerOneStop Videos</a> | 
          <a href="https://www.volunteermatch.org/" target="_blank" style="color:#0a6d5d;">VolunteerMatch</a> | 
          <a href="https://www.bls.gov/k12/students.htm" target="_blank" style="color:#0a6d5d;">BLS Career Exploration</a><br>
          <span style="color:#e74c3c;font-size:0.98em;">Dream big—your future is full of possibilities!</span>
        </div>
      </section>

      <!-- Travel & Booking -->
      <section class="catbox catbox-travel">
        <div class="catbox-icon">🌍</div>
        <h2>Travel & Booking</h2>
        <div class="catbox-desc">
          <a href="https://www.booking.com/" target="_blank" style="color:#0a6d5d;">Book a Hotel</a> |
          <a href="https://www.kayak.com/cars" target="_blank" style="color:#e67e22;">Rent a Car</a> |
          <a href="https://www.google.com/flights" target="_blank" style="color:#7d3cff;">Find Flights</a><br>
          <span style="color:#0a6d5d;font-size:0.98em;">Plan your next adventure with just a click!</span>
        </div>
      </section>

      <!-- Churches Near You -->
      <section class="catbox catbox-churches">
        <div class="catbox-icon">⛪</div>
        <h2>Churches Near You</h2>
        <div class="catbox-desc">
          <a href="https://www.google.com/maps/search/church+near+me/" target="_blank" style="color:#7d3cff;">Find Churches on Google Maps</a><br>
          <span style="color:#0a6d5d;font-size:0.98em;">Looking for a place to worship or connect? Click above to find churches close to you.</span>
        </div>
      </section>
    </div>
    <style>
      .catbox.catbox-teen h2 { color: #e67e22; }
      .catbox {
        background: linear-gradient(135deg, #fff 60%, #e0fcff 100%);
        border-radius: 22px;
        box-shadow: 0 4px 32px #0002, 0 1.5px 0 #b2f7ef;
        padding: 36px 28px 28px 28px;
        margin-bottom: 36px;
        transition: transform 0.18s, box-shadow 0.18s;
        position: relative;
        overflow: hidden;
        animation: catbox-fadein 0.8s cubic-bezier(.4,1.6,.6,1) both;
      }
      .catbox:hover {
        transform: translateY(-7px) scale(1.025) rotate(-1deg);
        box-shadow: 0 8px 40px #0ff6, 0 2px 0 #b2f7ef;
        z-index: 2;
      }
      .catbox-icon {
        font-size: 2.5em;
        text-align: center;
        margin-bottom: 0.2em;
        filter: drop-shadow(0 2px 8px #0ff6);
        animation: catbox-icon-pop 1.1s cubic-bezier(.4,1.6,.6,1) both;
      }
      .catbox h2 {
        text-align: center;
        font-size: 1.6em;
        margin-bottom: 0.7em;
        color: #0a6d5d;
        letter-spacing: 1px;
        text-shadow: 0 2px 12px #b2f7ef44;
      }
      .catbox.catbox-art h2 { color: #7d3cff; }
      .catbox.catbox-events h2 { color: #e67e22; }
      .catbox.catbox-news h2 { color: #0a6d5d; }
      .catbox.catbox-movies h2 { color: #e74c3c; }
      .catbox-desc {
        font-size: 1.08em;
        color: #555;
        margin-top: 10px;
        text-align: center;
      }
      @keyframes catbox-fadein {
        0% { opacity: 0; transform: translateY(40px) scale(0.98); }
        100% { opacity: 1; transform: none; }
      }
      @keyframes catbox-icon-pop {
        0% { transform: scale(0.7) rotate(-10deg); opacity: 0; }
        60% { transform: scale(1.2) rotate(3deg); opacity: 1; }
        100% { transform: scale(1) rotate(0); }
      }
    
    <script>
      // Gemini AI Assistant Demo Logic
      (function() {
        var geminiBtn = null, geminiModal = null, closeGemini = null, geminiForm = null, geminiInput = null, geminiChat = null;
        function readyGemini() {
          geminiBtn = document.getElementById('geminiBtn');
          geminiModal = document.getElementById('geminiModal');
          closeGemini = document.getElementById('closeGemini');
          geminiForm = document.getElementById('geminiForm');
          geminiInput = document.getElementById('geminiInput');
          geminiChat = document.getElementById('geminiChat');
          if (!geminiBtn || !geminiModal) return;
          geminiBtn.onclick = function() { geminiModal.style.display = 'block'; geminiInput.focus(); };
          closeGemini.onclick = function() { geminiModal.style.display = 'none'; };
          geminiForm.onsubmit = function(e) {
            e.preventDefault();
            var q = geminiInput.value.trim();
            if (!q) return;
            var userMsg = document.createElement('div');
            userMsg.style.color = '#7d3cff';
            userMsg.style.margin = '6px 0 0 0';
            userMsg.innerHTML = '<b>You:</b> ' + q;
            geminiChat.appendChild(userMsg);
            geminiInput.value = '';
            geminiChat.scrollTop = geminiChat.scrollHeight;
            // Demo responses
            setTimeout(function() {
              var aiMsg = document.createElement('div');
              aiMsg.style.color = '#0a6d5d';
              aiMsg.style.margin = '4px 0 0 0';
              aiMsg.innerHTML = '<b>Gemini:</b> ' + getGeminiDemoResponse(q);
              geminiChat.appendChild(aiMsg);
              geminiChat.scrollTop = geminiChat.scrollHeight;
            }, 700);
          };
        }
        function getGeminiDemoResponse(q) {
          q = q.toLowerCase();
          if (q.includes('hello') || q.includes('hi')) return 'Hello! How can I help you today?';
          if (q.includes('space')) return 'Space is vast! Did you know the Milky Way has over 100 billion stars?';
          if (q.includes('game')) return 'Check out the Games section for fun and learning!';
          if (q.includes('art')) return 'Art is a wonderful way to express yourself. Try Tate Kids Art!';
          if (q.includes('book')) return 'Reading is awesome! See the Book Club for suggestions.';
          if (q.includes('music')) return 'Music can boost your mood. Try NPR Music or Brains On!';
          if (q.includes('quiz')) return 'Quizzes are a fun way to learn. Try Nat Geo Kids Quizzes!';
          if (q.includes('career')) return 'Explore cool jobs in the Career Inspiration section!';
          if (q.includes('help')) return 'I can help you find resources or answer fun questions!';
          if (q.includes('ai')) return 'I am a demo AI. For real AI, try Gemini by Google!';
          return 'Sorry, I am just a demo and can answer basic questions about this site.';
        }
        if (document.readyState === 'complete' || document.readyState === 'interactive') setTimeout(readyGemini, 1);
        else document.addEventListener('DOMContentLoaded', readyGemini);
      })();
      // Starfield animation
      (function() {
        var canvas = document.getElementById('starfield');
        if (!canvas) return;
        var ctx = canvas.getContext('2d');
        function resizeStarfield() {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        }
        resizeStarfield();
        var w = canvas.width, h = canvas.height;
        var cx = w/2, cy = h/2;
        var stars = Array.from({length: 120}, function() {
          return {
            x: Math.random() * w - cx,
            y: Math.random() * h - cy,
            z: Math.random() * w,
            o: 0.5 + Math.random() * 0.5
          };
        });
        function draw() {
          w = canvas.width; h = canvas.height;
          cx = w/2; cy = h/2;
          ctx.clearRect(0,0,w,h);
          for (var i=0; i<stars.length; i++) {
            var s = stars[i];
            var k = 128.0 / s.z;
            var px = s.x * k + cx;
            var py = s.y * k + cy;
            if (px >= 0 && px < w && py >= 0 && py < h) {
              ctx.beginPath();
              ctx.arc(px, py, 1.2, 0, 2 * Math.PI);
              ctx.fillStyle = 'rgba(255,255,255,' + s.o + ')';
              ctx.fill();
            }
            s.z -= 2;
            if (s.z < 1) {
              s.x = Math.random() * w - cx;
              s.y = Math.random() * h - cy;
              s.z = w;
              s.o = 0.5 + Math.random() * 0.5;
            }
          }
          requestAnimationFrame(draw);
        }
        draw();
        window.addEventListener('resize', function() {
          resizeStarfield();
        });
      })();
    </script>
  </div>
`;

const aboutHTML = `
  <div style="font-family:'Segoe UI',Arial,sans-serif;position:relative;overflow:hidden;min-height:100vh;max-width:1100px;margin:40px auto 0 auto;padding:48px 32px 40px 32px;border-radius:22px;box-shadow:0 6px 40px #0003;background:radial-gradient(ellipse at 60% 20%,#e0fcff 0%,#b2f7ef 60%,#f7d9ff 100%);">
    <div style="position:absolute;top:-60px;left:-60px;width:300px;height:300px;background:radial-gradient(circle,#b2f7ef 0%,transparent 70%);filter:blur(30px);opacity:0.18;z-index:0;"></div>
    <div style="position:absolute;bottom:-80px;right:-80px;width:350px;height:350px;background:radial-gradient(circle,#f7d9ff 0%,transparent 70%);filter:blur(40px);opacity:0.13;z-index:0;"></div>
    <div style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;">
      <svg width="100%" height="100%" style="position:absolute;top:0;left:0;" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="futuristicStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#b2f7ef"/>
            <stop offset="100%" stop-color="#f7d9ff"/>
          </linearGradient>
        </defs>
        <rect x="10" y="10" width="98%" height="98%" rx="30" fill="none" stroke="url(#futuristicStroke)" stroke-width="4" stroke-dasharray="20 10"/>
      </svg>
    </div>
    <div style="display:flex;flex-direction:row;gap:40px;align-items:flex-start;z-index:2;position:relative;">
      <div style="flex:2;min-width:320px;">
        <h2 style="text-align:center;font-size:2.7em;margin-bottom:0.2em;letter-spacing:2px;color:#222;text-shadow:0 2px 16px #fff,0 1px 0 #b2f7ef;">About Charleston Zaragoza</h2>
        <p style="font-size:1.2em;line-height:1.7;margin-bottom:1.2em;display:flex;align-items:center;gap:18px;">
          <span><b>Charleston Zaragoza</b> (formerly known as <b>Michael Angelo Acelon</b>) was born on July 22, 1995. As an infant, he was abandoned and left in the care of St. Rita Orphanage in Manila, Philippines. For six months, the orphanage was unable to locate his mother, and he remained in their care until he was adopted. Charleston grew up surrounded by the kindness of the nuns and other children at the orphanage, which became his first family and home.</span>
          <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80" alt="Children in orphanage" style="width:110px;height:80px;object-fit:cover;border-radius:10px;box-shadow:0 2px 8px #0002;flex-shrink:0;">
        </p>
        <p style="font-size:1.2em;line-height:1.7;margin-bottom:1.2em;display:flex;align-items:center;gap:18px;">
          <img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=300&q=80" alt="Children with nuns" style="width:110px;height:80px;object-fit:cover;border-radius:10px;box-shadow:0 2px 8px #0002;flex-shrink:0;">
          <span>After his adoption, Charleston continued his journey through life, carrying with him the resilience and hope he learned during his early years. He now resides in Gainesville, TX and is currently not working, but his story is a testament to perseverance and the impact of compassion from those who cared for him in his earliest days.</span>
        </p>
        <p style="font-size:1.2em;line-height:1.7;margin-bottom:1.2em;display:flex;align-items:center;gap:18px;">
          <span>Throughout his childhood and adolescence, Charleston faced many challenges, but he always remembered the lessons of empathy and gratitude instilled in him by the caregivers at St. Rita Orphanage. He developed a deep appreciation for the value of community and the importance of helping others, often volunteering his time to support local causes and those in need.</span>
          <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80" alt="Orphanage group" style="width:110px;height:80px;object-fit:cover;border-radius:10px;box-shadow:0 2px 8px #0002;flex-shrink:0;">
        </p>
        <p style="font-size:1.2em;line-height:1.7;margin-bottom:1.2em;display:flex;align-items:center;gap:18px;">
          <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=300&q=80" alt="Hopeful child" style="width:110px;height:80px;object-fit:cover;border-radius:10px;box-shadow:0 2px 8px #0002;flex-shrink:0;">
          <span>Education became a cornerstone of Charleston's life. He worked hard in school, motivated by a desire to make the most of the opportunities given to him. His experiences taught him that knowledge and kindness could open doors and change lives, and he aspired to be a positive influence on everyone he met.</span>
        </p>
        <p style="font-size:1.2em;line-height:1.7;margin-bottom:1.2em;">
          As an adult, Charleston has continued to seek meaning and purpose. He enjoys reading, learning new skills, and connecting with people from all walks of life. His journey has not always been easy, but he remains optimistic and determined to build a future defined by hope, integrity, and service to others.
        </p>
        <p style="font-size:1.2em;line-height:1.7;margin-bottom:2em;">
          Charleston's story is a reminder that even in the face of adversity, the human spirit can endure and thrive. He is grateful for the love and support he received from the orphanage and his adoptive family, and he looks forward to the next chapter of his life with courage and faith.
        </p>
        <div style="text-align:center;margin-top:32px;font-size:1.3em;">🌟 Stay strong, stay kind, and keep moving forward! 🌟</div>
      </div>
      <div style="flex:1;min-width:270px;max-width:340px;display:flex;align-items:center;">
        <div style="background:rgba(255,255,255,0.92);border-radius:16px;padding:24px 18px 18px 18px;box-shadow:0 2px 12px #0001;width:100%;margin:0 auto;align-self:center;">
          <h3 style="text-align:center;color:#0a6d5d;margin-bottom:0.5em;">💚 Helpful Resources</h3>
          <ul style="font-size:1.1em;line-height:1.8;margin:0 0 1em 0;padding:0 0 0 1.2em;">
            <li><b>Suicide & Crisis Lifeline (USA):</b> <a href="tel:988" style="color:#0a6d5d;text-decoration:underline;">988</a> or <a href="https://988lifeline.org" target="_blank" style="color:#0a6d5d;">988lifeline.org</a></li>
            <li><b>National Alliance on Mental Illness (NAMI):</b> <a href="https://nami.org/Home" target="_blank" style="color:#0a6d5d;">nami.org</a></li>
            <li><b>International Suicide Hotlines:</b> <a href="https://www.opencounseling.com/suicide-hotlines" target="_blank" style="color:#0a6d5d;">opencounseling.com/suicide-hotlines</a></li>
            <li><b>Philippines Hopeline:</b> <a href="tel:+63288044673" style="color:#0a6d5d;text-decoration:underline;">(02) 8804-4673</a> or <a href="https://www.facebook.com/HopelinePH/" target="_blank" style="color:#0a6d5d;">HopelinePH Facebook</a></li>
            <li><b>Text/Chat Support (Philippines):</b> <a href="https://www.facebook.com/NCMHcrisishotline/" target="_blank" style="color:#0a6d5d;">NCMH Crisis Hotline</a></li>
            <li><b>General Help:</b> <a href="https://www.befrienders.org/" target="_blank" style="color:#0a6d5d;">befrienders.org</a></li>
          </ul>
          <div style="text-align:center;font-size:1em;color:#555;">You are not alone. If you or someone you know is struggling, please reach out. There is always hope and help available. 💛</div>
        </div>
      </div>
    </div>
  </div>
`;





document.body.style.margin = '0';
document.body.style.background = '#222';
if (!document.body.contains(container)) {
  document.body.appendChild(container);
}


homeButton.onclick = function() {
  frame.src = '';
  frame.srcdoc = homeHTML;
};


function injectTeenZoneCSS() {
  if (!document.getElementById('teen-zone-css')) {
    var style = document.createElement('style');
    style.id = 'teen-zone-css';
    style.textContent =
      '@keyframes float1 { 0%{transform:translateY(0);} 100%{transform:translateY(30px) scale(1.1);} }\n' +
      '@keyframes float2 { 0%{transform:translateY(0);} 100%{transform:translateY(-25px) scale(1.08);} }\n' +
      '@keyframes float3 { 0%{transform:translateY(0);} 100%{transform:translateY(20px) scale(1.12);} }\n' +
      '@keyframes float4 { 0%{transform:translateY(0);} 100%{transform:translateY(-18px) scale(1.09);} }\n' +
      '@keyframes float5 { 0%{transform:translateY(0);} 100%{transform:translateY(22px) scale(1.13);} }\n' +
      '.catbox { background: linear-gradient(135deg, #23234a 60%, #e0fcff 100%); border-radius: 22px; box-shadow: 0 4px 32px #0006, 0 1.5px 0 #b2f7ef; padding: 36px 28px 28px 28px; margin-bottom: 36px; transition: transform 0.18s, box-shadow 0.18s; position: relative; overflow: hidden; animation: catbox-fadein 0.8s cubic-bezier(.4,1.6,.6,1) both; }\n' +
      '.catbox:hover { transform: translateY(-7px) scale(1.025) rotate(-1deg); box-shadow: 0 8px 40px #0ff6, 0 2px 0 #b2f7ef; z-index: 2; }\n' +
      '.catbox-icon { font-size: 2.5em; text-align: center; margin-bottom: 0.2em; filter: drop-shadow(0 2px 8px #0ff6); animation: catbox-icon-pop 1.1s cubic-bezier(.4,1.6,.6,1) both; }\n' +
      '.catbox h2 { text-align: center; font-size: 1.6em; margin-bottom: 0.7em; color: #e67e22; letter-spacing: 1px; text-shadow: 0 2px 12px #b2f7ef44; }\n' +
      '.catbox-desc { font-size: 1.08em; color: #fff; margin-top: 10px; text-align: center; }\n' +
      '@keyframes catbox-fadein { 0% { opacity: 0; transform: translateY(40px) scale(0.98); } 100% { opacity: 1; transform: none; } }\n' +
      '@keyframes catbox-icon-pop { 0% { transform: scale(0.7) rotate(-10deg); opacity: 0; } 60% { transform: scale(1.2) rotate(3deg); opacity: 1; } 100% { transform: scale(1) rotate(0); } }';
    document.head.appendChild(style);
  }
}

function showTeenZone() {
  injectTeenZoneCSS();
  frame.src = '';
  frame.srcdoc = teenZoneHTML;
}

teenButton.onclick = showTeenZone;

aboutButton.onclick = function() {
  frame.src = '';
  frame.srcdoc = aboutHTML;
};

// Load Home page on startup
frame.srcdoc = homeHTML;


const navBar = document.createElement('div');
navBar.style.display = 'flex';
navBar.style.justifyContent = 'center';
navBar.appendChild(homeButton);
navBar.appendChild(aboutButton);

container.appendChild(navBar);
container.appendChild(frame);

//# sourceMappingURL=script.js.map// Python HTTP server command (for local testing, not part of the browser code)


// To use this, run the following command in your terminal:
// python -m http.server 8000

